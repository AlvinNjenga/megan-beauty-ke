import snapshot from "./featured-products.json";

export type Product = {
  slug: string;
  title: string;
  image: string;
  href: string;
  price: number;
  compareAt: number | null;
  currency: string;
  fromPrice: boolean;
  isNew: boolean;
};

const products: Record<string, Product> = snapshot.products;

export const featuredCollections = snapshot.groups.map((group) => ({
  slug: group.slug,
  title: group.title,
  products: group.productIds.map((id) => products[id]),
}));

export function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(amount / 100);
}

export function discountPercent(product: Product) {
  return product.compareAt && product.compareAt > product.price
    ? Math.floor((1 - product.price / product.compareAt) * 100)
    : null;
}
