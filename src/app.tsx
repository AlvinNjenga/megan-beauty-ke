import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { Collection, Home, ProductDetail } from "./components/pages";
import { StoreProvider, StoreShell } from "./components/store";
import { collections, products } from "./data/catalogue";
import NotFound from "./pages/not-found";
import OurWorld, { ourWorldMetadata } from "./pages/our-world";

export const pages = {
  "/": {
    title: "Megan Beauty | A little beauty. A little sparkle.",
    content: <Home />,
  },
  "/our-world": { ...ourWorldMetadata, content: <OurWorld /> },
  ...Object.fromEntries(
    collections.map((collection) => [
      `/collections/${collection.slug}`,
      {
        title: `${collection.name} | Megan Beauty`,
        description: collection.description,
        content: <Collection key={collection.slug} slug={collection.slug} />,
      },
    ]),
  ),
  ...Object.fromEntries(
    products.map((product) => [
      `/products/${product.slug}`,
      {
        title: `${product.name} | Megan Beauty`,
        content: <ProductDetail key={product.slug} product={product} />,
      },
    ]),
  ),
} satisfies Record<string, Page>;

interface Page {
  title: string;
  description?: string;
  content: React.ReactNode;
}

const notFound: Page = {
  title: "Page not found | Megan Beauty",
  content: <NotFound />,
};

export function getPage(path: string): Page {
  const pathname = path.replace(/\/+$/, "") || "/";
  const catalogue: Record<string, Page> = pages;
  return Object.hasOwn(catalogue, pathname) ? catalogue[pathname] : notFound;
}

export const defaultDescription =
  "Explore the Megan Beauty design prototype. Beauty, jewellery and the little things that make a look yours.";

export function App() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const page = getPage(pathname);

  useEffect(() => {
    document.title = page.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", page.description ?? defaultDescription);
  }, [page]);

  useEffect(() => {
    // Let the drawer close and unlock body scrolling before jumping to a section.
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      } else if (navigationType !== "POP") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [key, hash, navigationType]);

  return (
    <StoreProvider>
      <StoreShell>{page.content}</StoreShell>
    </StoreProvider>
  );
}
