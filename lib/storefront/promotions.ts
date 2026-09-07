export type Promotion = {
  id: string;
  title: string;
  image: string;
  sale: string;
  cta: string;
  href: string;
};

// Editorial offers from the reference theme, not live catalogue discounts.
const store = "https://flux-demo-6.myshopify.com";
export const mostLovedPromotions: Promotion[] = [
  { id: "quartz-roller", title: "Quartz Roller", image: "/images/olivelle/promotion-roller.webp", sale: "30% sale", cta: "Order Now", href: `${store}/products/facial-roler` },
  { id: "radiant-oils", title: "Radiant Oils", image: "/images/olivelle/promotion-oils.webp", sale: "20% sale", cta: "Shop Here", href: `${store}/collections/facial-oils` },
  { id: "gua-sha", title: "Gua Sha", image: "/images/olivelle/promotion-gua-sha.webp", sale: "20% sale", cta: "Order Now", href: `${store}/products/gua-sha` },
  { id: "cooling-globes", title: "Cooling Globes", image: "/images/olivelle/promotion-globes.webp", sale: "15% sale", cta: "Shop Now", href: `${store}/products/facial-ice-globes` },
  { id: "wellness-set", title: "Wellness Set", image: "/images/olivelle/products/complete-self-care-beauty-gift-set.webp", sale: "10% sale", cta: "Shop Now", href: `${store}/collections/wellness-sets` },
];
