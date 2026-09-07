export const skincareStory = {
  id: "glow-from-within",
  label: "New Collection",
  eyebrow: "Discover natural skincare essentials",
  title: "Glow From Within",
  description:
    "Transform your skincare routine with nourishing botanical oils designed to hydrate, balance, and enhance your natural radiance. Crafted with carefully selected ingredients, our formulas help support healthy, glowing skin while turning your daily routine into a relaxing self-care ritual.",
  image: "/images/olivelle/story.webp",
  imageAlt: "Three women demonstrating facial oil, a gua sha stone, and a facial roller.",
  watermark: "/images/olivelle/story-watermark.webp",
  cta: { label: "Shop Facial Oils", href: "#facial-oils" },
};

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  image: string;
};

// Reference-demo headings; review these claims with final shop content.
export const skincareFeatures: Feature[] = [
  {
    id: "botanical",
    eyebrow: "Clean Beauty",
    title: "Natural. Gentle. Skin-Loving.",
    image: "/images/olivelle/feature-botanical.webp",
  },
  {
    id: "tools",
    eyebrow: "Skin Care Tools",
    title: "Advanced Beauty Tools",
    image: "/images/olivelle/feature-tools.webp",
  },
  {
    id: "ritual",
    eyebrow: "Self-Care Ritual",
    title: "Relax. Restore. Glow.",
    image: "/images/olivelle/feature-ritual.webp",
  },
  {
    id: "conscious",
    eyebrow: "Vegan Beauty",
    title: "Kind to Skin & Planet",
    image: "/images/olivelle/feature-conscious.webp",
  },
];

export const facialOilSpotlight = {
  id: "facial-oils",
  title: "The Art of",
  accent: "Facial Oils",
  description:
    "Lightweight facial oils enriched with natural ingredients to hydrate, smooth, and enhance your skin’s natural radiance.",
  image: "/images/olivelle/facial-oils-banner.webp",
  cta: {
    label: "Shop Face Oils",
    href: "https://flux-demo-6.myshopify.com/collections/facial-oils",
  },
};
