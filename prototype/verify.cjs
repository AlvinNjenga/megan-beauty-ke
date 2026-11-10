const { chromium } = require("@playwright/test");
const fs = require("fs");
(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  const base = "http://127.0.0.1:3000";
  fs.mkdirSync("verification", { recursive: true });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  for (
    let y = 0;
    y < (await page.evaluate(() => document.body.scrollHeight));
    y += 700
  ) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(100);
  }
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map((im) => im.decode().catch(() => {})),
    );
    window.scrollTo(0, 0);
  });
  await page.screenshot({
    path: "verification/home-desktop.png",
    fullPage: true,
  });
  const images = await page
    .locator("img")
    .evaluateAll((els) =>
      els.filter((e) => !e.complete || !e.naturalWidth).map((e) => e.src),
    );
  if (images.length) throw Error("Broken images " + images);
  await page.getByRole("button", { name: "Jewellery", exact: true }).click();
  await page
    .locator("#mega-menu")
    .getByRole("link", { name: "Earrings", exact: true })
    .click();
  await page.waitForURL("**/collections/earrings");
  await page.goto(base + "/collections/beauty", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  await page
    .getByRole("combobox", { name: "Product type", exact: true })
    .selectOption("Makeup");
  if ((await page.locator(".product-card").count()) !== 3)
    throw Error("Type filter");
  await page
    .getByRole("combobox", { name: "Price", exact: true })
    .selectOption("under20");
  if ((await page.locator(".product-card").count()) !== 2)
    throw Error("Price filter");
  await page.getByLabel("Sort products").selectOption("high");
  if (
    !(await page.locator(".product-title").first().innerText()).includes(
      "£12.00",
    )
  )
    throw Error("Sort");
  await page.screenshot({
    path: "verification/collection-desktop.png",
    fullPage: true,
  });
  await page.goto(base + "/products/pink-lip-gloss", {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: "View product image 2" }).click();
  await page.getByRole("button", { name: "Rose", exact: true }).click();
  await page
    .getByRole("button", { name: "Increase quantity", exact: true })
    .click();
  await page.screenshot({
    path: "verification/product-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: /Add to demo bag/ }).click();
  await page.getByRole("dialog").getByText("Rose · £12.00").waitFor();
  await page
    .getByRole("button", { name: "Increase Pink lip gloss quantity" })
    .click();
  await page
    .getByRole("dialog")
    .getByText("£36.00", { exact: true })
    .first()
    .waitFor();
  await page.getByRole("button", { name: "Preview checkout" }).click();
  await page.getByText("No order has been placed.", { exact: false }).waitFor();
  await page.getByRole("button", { name: "Keep exploring" }).click();
  await page.getByRole("button", { name: "Find your next favourite" }).click();
  await page.getByRole("textbox", { name: "Search products" }).fill("necklace");
  await page.locator(".search-results a").first().click();
  await page.waitForURL("**/products/pendant-necklace");
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByLabel("Your email address").fill("review@example.com");
  await page.getByRole("button", { name: "Count me in" }).click();
  await page.getByText("Demo sign-up complete.", { exact: false }).waitFor();
  for (const width of [1280, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base, { waitUntil: "networkidle" });
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw Error("Horizontal overflow " + width);
    await page.screenshot({
      path: `verification/home-${width}.png`,
      fullPage: true,
    });
  }
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Beauty", exact: true })
    .click();
  await page.waitForURL("**/collections/beauty");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "verification/collection-mobile.png",
    fullPage: true,
  });
  await page.goto(base + "/products/gold-tone-hoops", {
    waitUntil: "networkidle",
  });
  await page.screenshot({
    path: "verification/product-mobile.png",
    fullPage: true,
  });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw Error("Product overflow");
  await page.getByRole("button", { name: /Add to demo bag/ }).click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("Escape");
  await page.goto(base + "/products/missing", { waitUntil: "networkidle" });
  await page
    .getByRole("heading", { name: "This page has slipped away." })
    .waitFor();
  if (errors.filter((e) => !e.includes("404")).length)
    throw Error(errors.join("\n"));
  fs.writeFileSync(
    "verification/results.json",
    JSON.stringify(
      {
        passed: true,
        viewports: [1440, 1280, 768, 390, 320],
        checks: [
          "direct routes",
          "image loading",
          "navigation",
          "type and price filters",
          "sorting",
          "gallery",
          "variants",
          "basket quantity and subtotal",
          "checkout boundary",
          "search",
          "newsletter",
          "mobile navigation",
          "overflow",
          "404",
        ],
        errors,
      },
      null,
      2,
    ),
  );
  console.log("All browser checks passed.");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
