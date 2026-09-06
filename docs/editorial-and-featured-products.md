# Editorial statement and featured products

## Components and data

EditorialStatement is a server-rendered text section with decorative inline images. The real heading remains readable by assistive technology; empty alt attributes avoid interrupting its sentence with decorative descriptions. Inline layout allows mobile wrapping instead of scaling a screenshot.

FeaturedProducts composes shadcn Tabs, the shared ScrollRail and ProductCard. Tabs own selection and keyboard interaction; server-rendered panels are passed as children. No additional application-level selection state is necessary.

ProductCard owns the boxed presentation; ProductPrice handles consistent formatting; ProductPreview composes shadcn Dialog with a labelled trigger, title, description and product link. Preview buttons and navigation links are siblings, avoiding invalid nested interactive elements.

ScrollRail now accepts optional layout classes and a control label. Collection and product rails share scrolling behaviour but retain their different card widths. Product rail controls are hidden on narrow screens, matching the supplied mobile screenshot; swipe and keyboard link navigation still work.

## Reference content

A local snapshot in lib/storefront/featured-products.json contains the three demo collections (7 facial oils, 5 new arrivals and 7 best sellers), sharing 12 products. Counts derive from the actual items. Prices are integer cents, formatted as EUR; the minimum-priced variant and its compare-at price are paired. Discount badges are calculated, not hard-coded. The Radiance Oil NEW badge matches the screenshot.

Sources: https://flux-demo-6.myshopify.com/ and its public /collections/{slug}/products.json endpoints, retrieved during implementation. Source image URLs are retained in the snapshot. No runtime Shopify requests are made.

Images are in public/images/olivelle/products plus editorial-skin.webp and editorial-heart.webp. These are reference assets, not final Megan Beauty catalogue content. Product links and preview CTAs use the reference demo until local product pages exist; previews do not imply a working cart.

## Styling choices

The product image reserves a square before loading. A narrower white action panel overlaps its lower edge. The entire card sits on white against the muted section surface. Desktop shows four cards; mobile exposes part of the next card.

The editorial statement uses the existing Fraunces font at a regular weight, larger rounded image accents on desktop, and a separate centred bottle accent on mobile. The paragraph has a readable maximum width and generous line height.

## Manual review

Check statement wrapping around 360px and 450px; all three tabs including arrow-key switching; product rail scrolling; and preview opening, Escape closing and focus returning to its trigger. Verify the overlapping action panel and four-column desktop proportions. This change uses lint and TypeScript checks without a full browser-test run.
