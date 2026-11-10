import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { paths, render } from "../.prerender/prerender.js";

const template = await readFile("dist/index.html", "utf8");

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

for (const path of [...paths, "/404.html"]) {
  const { markup, title, description } = render(path);
  const html = template
    .replace(/<title>.*?<\/title>/, () => `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, (_, start) =>
      `${start}${escapeHtml(description)}"`,
    )
    .replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`);
  const file = path === "/404.html"
    ? "dist/404.html"
    : join("dist", path.slice(1), "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
