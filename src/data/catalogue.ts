export type Category = "Beauty" | "Jewellery" | "Accessories";
export interface Product {
  slug: string;
  name: string;
  category: Category;
  type: string;
  price: number;
  image: string;
  alternate: string;
  variants: string[];
  isNew: boolean;
  favourite: boolean;
}
export const products: Product[] = [
  {
    slug: "pink-lip-gloss",
    name: "Pink lip gloss",
    category: "Beauty",
    type: "Makeup",
    price: 12,
    image: "lips",
    alternate: "makeup",
    variants: ["Soft pink", "Rose", "Clear"],
    isNew: true,
    favourite: true,
  },
  {
    slug: "gold-tone-hoops",
    name: "Gold-tone hoop earrings",
    category: "Jewellery",
    type: "Earrings",
    price: 18,
    image: "earrings",
    alternate: "jewellery",
    variants: ["Gold tone", "Silver tone"],
    isNew: true,
    favourite: true,
  },
  {
    slug: "everyday-face-oil",
    name: "Face oil",
    category: "Beauty",
    type: "Skincare",
    price: 16,
    image: "skincare",
    alternate: "makeup",
    variants: ["30 ml", "50 ml"],
    isNew: true,
    favourite: false,
  },
  {
    slug: "pendant-necklace",
    name: "Pendant necklace",
    category: "Jewellery",
    type: "Necklaces",
    price: 22,
    image: "necklace",
    alternate: "jewellery",
    variants: ["Gold tone", "Silver tone"],
    isNew: true,
    favourite: true,
  },
  {
    slug: "makeup-edit",
    name: "Makeup selection",
    category: "Beauty",
    type: "Makeup",
    price: 28,
    image: "makeup",
    alternate: "lips",
    variants: ["Pink edit", "Neutral edit"],
    isNew: false,
    favourite: true,
  },
  {
    slug: "jewellery-edit",
    name: "Jewellery selection",
    category: "Jewellery",
    type: "Bracelets",
    price: 26,
    image: "jewellery",
    alternate: "earrings",
    variants: ["Gold tone", "Silver tone"],
    isNew: false,
    favourite: true,
  },
  {
    slug: "lip-colour",
    name: "Lip colour",
    category: "Beauty",
    type: "Makeup",
    price: 10,
    image: "lips",
    alternate: "makeup",
    variants: ["Rose", "Berry", "Peach"],
    isNew: false,
    favourite: false,
  },
  {
    slug: "skincare-edit",
    name: "Skincare selection",
    category: "Beauty",
    type: "Skincare",
    price: 24,
    image: "skincare",
    alternate: "makeup",
    variants: ["Small", "Large"],
    isNew: false,
    favourite: true,
  },
];
export const collections = [
  {
    slug: "beauty",
    name: "Beauty",
    image: "makeup",
    description:
      "A little colour. A moment for yourself. Find the beauty pieces to make your routine your own.",
  },
  {
    slug: "jewellery",
    name: "Jewellery",
    image: "jewellery",
    description:
      "The finishing touches that feel like you. Explore earrings, necklaces and pieces to wear together.",
  },
  {
    slug: "new-in",
    name: "New in",
    image: "lips",
    description:
      "Fresh finds for your beauty shelf and jewellery box. Meet your next little obsession.",
  },
  {
    slug: "bestsellers",
    name: "Bestsellers",
    image: "earrings",
    description:
      "Explore our demonstration of the most-loved edit, from beauty staples to finishing touches.",
  },
  {
    slug: "skincare",
    name: "Skincare",
    image: "skincare",
    description: "Make a little room for your everyday ritual.",
  },
  {
    slug: "earrings",
    name: "Earrings",
    image: "earrings",
    description: "Find your finishing touch.",
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    image: "necklace",
    description: "Layer up, dress up, make it yours.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    image: "jewellery",
    description:
      "Our accessories edit is coming together. Browse beauty and jewellery while we curate it.",
  },
];
export function collectionProducts(slug: string) {
  return products.filter((p) =>
    slug === "new-in"
      ? p.isNew
      : slug === "bestsellers"
        ? p.favourite
        : slug === "beauty" || slug === "jewellery"
          ? p.category.toLowerCase() === slug
          : slug === "accessories"
            ? false
            : ["earrings", "necklaces", "skincare"].includes(slug)
              ? p.type.toLowerCase() === slug
              : true,
  );
}
export const money = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    value,
  );
export const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}.jpg`;
