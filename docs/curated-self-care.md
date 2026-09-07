# Curated self-care

This slice follows Most Loved Products and contains BeautyBenefits plus CuratedSelfCare.

The four benefit tiles stack on mobile. The first tile is retained: the mobile screenshot appears to start after it has scrolled out of view. Lucide icons approximate the reference line artwork. The copy, including organic/cruelty-free claims, is reference-theme content awaiting final business review.

GlowDealsCard is a custom image-led promotional card. Its desktop height follows the product cards in the shared flex rail; mobile gives it a taller portrait composition. It is not a ProductCard because it advertises a collection rather than a priced item.

ProductCard gains a set variant: muted background and a two-column white action bar. ProductPreview gains an eye-icon option; its existing shadcn dialog behaviour is unchanged. The plus is an accessible product-options link to the reference product page, not a pretend add-to-cart action. No cart is implemented.

ScrollRail is reused, including its positioning fix for off-screen accessibility labels. Four rail slots are visible on desktop (promotion plus three products); mobile exposes the next slot. Additional sets are accessible through the existing controls and touch scrolling.

The local wellness-products.json snapshot comes from https://flux-demo-6.myshopify.com/collections/wellness-sets/products.json. Existing images are reused; missing set images and hero-e.webp (saved as glow-deals.webp) were downloaded from the reference storefront. Product prices are stored in cents and formatted by ProductPrice. The snapshot is demo data, not a live Shopify integration.

Manual review: stacked benefits, mobile portrait crop, equal desktop card heights, sale/NEW badges, next/previous controls, preview dialogs and product-options links. TypeScript and targeted lint are the planned light checks.
