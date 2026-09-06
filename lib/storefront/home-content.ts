export type Collection = {
  slug: string;
  title: string;
  image: string;
  href: string;
};

// Reference destinations until the local catalogue is implemented.
const referenceStore = "https://flux-demo-6.myshopify.com";
export const collections: Collection[] = [
  { slug: "facial-oils", title: "Facial Oils", image: "/images/olivelle/facial-oils.webp" },
  { slug: "facial-tools", title: "Facial Tools", image: "/images/olivelle/facial-tools.webp" },
  { slug: "new-arrivals", title: "New Arrivals", image: "/images/olivelle/new-arrivals.webp" },
  { slug: "wellness-sets", title: "Wellness Sets", image: "/images/olivelle/wellness-sets.webp" },
  { slug: "best-sellers", title: "Best Sellers", image: "/images/olivelle/best-sellers.webp" },
].map((collection) => ({
  ...collection,
  href: `${referenceStore}/collections/${collection.slug}`,
}));

export const hero = {
  title: "Pure",
  accent: "Glow",
  description: "Hydrate, refresh, and reveal your skin.",
  cta: { label: "Get Yours", href: "#collections" },
  desktopImage: "/images/olivelle/hero-desktop.webp",
  mobileImage: "/images/olivelle/hero-mobile.webp",
};
