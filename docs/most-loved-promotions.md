# Most-loved promotions

MostLovedPromotions follows the facial-oil spotlight. Four square promotion cards fit on desktop; mobile uses the existing scroll-snap rail with the next card partially visible. A fifth Wellness Set card, present in the reference storefront, makes the desktop arrow controls useful.

PromotionCard is separate from ProductCard because it advertises a collection or offer instead of showing a purchasable item and price. A white bottom-left panel overlaps the image with a sale label, serif heading and text CTA. Each card uses one link, avoiding redundant focus stops or nested controls.

Content and destinations live in lib/storefront/promotions.ts. Reference sale labels are editorial demo copy, not calculated product discounts. Destinations still lead to the reference store until local catalogue pages exist.

Images were sourced from https://flux-demo-6.myshopify.com/:
- promotion-roller.webp: card-2_e6f7fc4e-6d95-4877-959b-8900186013ee.webp
- promotion-oils.webp: face-oil-1-a.webp
- promotion-gua-sha.webp: hero-a.webp
- promotion-globes.webp: self-care-2-a_e43e1090-abaa-48e6-8fae-5a9d7d32bad6.webp

The fifth card reuses the existing gift-set image. No additional client component or dependency was introduced: ScrollRail already supplies shadcn buttons, scrolling, reduced-motion support, and the positioning fix that contains off-screen content.

Manual review: check four desktop cards, the fifth via the next arrow, mobile swipe/partial-card layout, keyboard focus and the stepped white panels. The separate deal section beneath the reference promotions is outside this change.
