import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { chromium, expect } from "@playwright/test";
import { resolveConfig } from "vite";

const { base } = await resolveConfig({}, "build", "production");
const dist = resolve("dist");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ttf": "font/ttf",
};

// Serve only emitted files, with directory indexes and the custom 404.
const server = createServer(async (request, response) => {
  const { pathname, search } = new URL(request.url, "http://localhost");
  if (pathname.startsWith(base)) {
    const file = resolve(dist, pathname.slice(base.length));
    if (file === dist || file.startsWith(dist + sep)) {
      const extension = extname(file);
      try {
        const body = await readFile(extension ? file : resolve(file, "index.html"));
        if (!extension && !pathname.endsWith("/")) {
          response.writeHead(301, { Location: pathname + "/" + search }).end();
        } else {
          response.writeHead(200, { "Content-Type": types[extension || ".html"] }).end(body);
        }
        return;
      } catch (error) {
        if (error.code !== "ENOENT") {
          response.writeHead(500).end(String(error));
          return;
        }
      }
    }
  }
  response.writeHead(404, { "Content-Type": "text/html" }).end(await readFile("dist/404.html"));
});

await new Promise((listen) => server.listen(0, "127.0.0.1", listen));
const origin = `http://127.0.0.1:${server.address().port}${base}`;
const snapshots = {
  home: "",
  beauty: "collections/beauty",
  accessories: "collections/accessories",
  product: "products/pink-lip-gloss",
  story: "our-world",
};

let browser;
try {
  browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.setDefaultTimeout(7000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("status of 404")) {
      errors.push(message.text());
    }
  });

  for (const section of ["products", "collections"]) {
    const slugs = await readdir(`dist/${section}`);
    assert.equal(slugs.length, 8);
    for (const slug of slugs) {
      const response = await page.request.get(origin + `${section}/${slug}`);
      assert.equal(response.status(), 200);
      assert.match(await response.text(), /<h1[\s>]/);
    }
  }

  const visualDifferences = [];
  async function capture(file, target, options = {}) {
    const screenshot = await target.screenshot({ path: `verification/react/${file}`, ...options });
    const baseline = await readFile(`verification/baseline/${file}`).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
    if (baseline && !screenshot.equals(baseline)) visualDifferences.push(file);
  }

  for (const width of [1440, 1280, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [name, path] of Object.entries(snapshots)) {
      await page.goto(origin + path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name} overflows at ${width}px`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const image of document.images) image.loading = "eager";
        await Promise.all(Array.from(document.images, (image) => image.decode()));
      });
      await capture(`${name}-${width}.png`, page, { fullPage: true });
    }
  }

  const button = (name) => page.getByRole("button", { name, exact: true });
  const dialog = page.getByRole("dialog");
  await button("Open navigation").click();
  await expect(dialog.getByRole("heading")).toBeFocused();
  await capture("mobile-menu.png", page);
  await dialog.getByRole("link", { name: "Beauty", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Beauty", exact: true })).toBeVisible();
  await expect(dialog).toBeHidden();

  await page.setViewportSize({ width: 1440, height: 900 });
  await button("Filters").click();
  await page.getByLabel("Product type").selectOption("Makeup");
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.getByRole("combobox", { name: "Price", exact: true }).selectOption("under20");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByLabel("Sort products").selectOption("high");
  await expect(page.locator(".product-title").first()).toContainText("£12.00");
  await page.getByRole("button", { name: /^Filters/ }).click();
  await page.getByRole("button", { name: /Remove.*Makeup/i }).click();
  await expect(page.locator(".product-card")).toHaveCount(3);

  const lipGloss = page.locator(".product-card").filter({ has: page.getByRole("link", { name: "Pink lip gloss", exact: true }) });
  await lipGloss.getByRole("button", { name: "Choose options" }).click();
  await expect(lipGloss.getByRole("button", { name: "Add to demo bag" })).toBeDisabled();
  await lipGloss.getByRole("button", { name: "Rose", exact: true }).click();
  await lipGloss.getByRole("button", { name: "Add to demo bag" }).click();
  await expect(dialog.getByText("Rose · £12.00")).toBeVisible();
  await capture("bag-drawer.png", dialog);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await lipGloss.getByRole("button", { name: "Save Pink lip gloss" }).click();
  await lipGloss.getByRole("link", { name: "Pink lip gloss", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Pink lip gloss" })).toBeVisible();
  await button("View product image 2").click();
  await button("Rose").click();
  await button("Increase quantity").click();
  await page.getByRole("button", { name: /Add to demo bag/ }).click();
  await expect(dialog.getByText("£36.00", { exact: true }).first()).toBeVisible();
  await button("Increase Pink lip gloss quantity").click();
  await expect(dialog.getByText("£48.00", { exact: true }).first()).toBeVisible();
  await button("Preview checkout").click();
  await expect(dialog.getByText(/No order has been placed/)).toBeVisible();
  await button("Keep exploring").click();
  await button("Saved edit, 1 items").click();
  await expect(dialog.getByRole("link", { name: "Pink lip gloss", exact: true })).toBeVisible();
  await capture("saved-drawer.png", dialog);
  await dialog.getByRole("button", { name: "Unsave Pink lip gloss" }).click();
  await expect(dialog.getByText("Make room for your favourites.")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(button("Saved edit, 0 items")).toBeFocused();

  await button("Find your next favourite").click();
  const search = page.getByRole("textbox", { name: "Search products" });
  await expect(search).toBeFocused();
  await search.fill("necklace");
  await capture("search-drawer.png", dialog);
  await dialog.getByRole("link", { name: /Pendant necklace/ }).click();
  await expect(page.getByRole("heading", { name: "Pendant necklace" })).toBeVisible();
  await expect(button("Shopping bag, 4 items")).toBeVisible();
  await page.reload();
  await expect(button("Shopping bag, 0 items")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pendant necklace" })).toBeVisible();

  await button("Jewellery").click();
  await page.locator("#mega-menu").getByRole("link", { name: "Earrings", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Earrings", exact: true })).toBeVisible();
  await expect(page.locator("#mega-menu")).toBeHidden();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Our world" }).click();
  await expect(page).toHaveTitle(/Our World/);
  await page.getByRole("link", { name: "Read her story" }).click();
  await expect(page).toHaveURL(/#founder-story$/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "The Megan edit" }).click();
  await expect(page).toHaveURL(/#the-edit$/);
  await expect(page.locator("#the-edit")).toBeInViewport();
  assert.equal(await page.locator(".product-rail").first().evaluate((rail) => getComputedStyle(rail).scrollBehavior), "auto");
  await page.getByLabel("Your email address").fill("review@example.com");
  await button("Count me in").click();
  await expect(page.getByText(/Demo sign-up complete/)).toBeVisible();

  const missing = await page.goto(origin + "products/missing");
  assert.equal(missing.status(), 404);
  await expect(page.getByRole("heading", { name: "This page has slipped away." })).toBeVisible();
  await page.getByRole("link", { name: "Back to Megan Beauty" }).click();
  await expect(page).toHaveTitle(/A little beauty/);
  assert.deepEqual(errors, []);
  console.log("Production routes, interactions, and responsive checks passed.");
  console.log("Screenshots that differed from an available baseline:", visualDifferences);
} finally {
  await browser?.close();
  server.close();
}
