import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { App, defaultDescription, getPage, pages } from "./app";

export const paths = Object.keys(pages);

export function render(path: string) {
  const base = import.meta.env.BASE_URL;
  const page = getPage(path);
  const markup = renderToString(
    <StaticRouter basename={base} location={base + path.slice(1)}>
      <App />
    </StaticRouter>,
  );
  return {
    markup,
    title: page.title,
    description: page.description ?? defaultDescription,
  };
}
