# Story, feature tiles and facial-oil spotlight

## Page composition

After FeaturedProducts, the page now renders ImageTextSection, FeatureStrip, then CategorySpotlight. Section content lives in lib/storefront/story-content.ts. The spotlight receives the existing facial-oils collection; it does not duplicate prices or product records.

ImageTextSection uses a two-column grid on desktop, with a 3:2 image, vertical caption/divider, copy and dark CTA. The watermark is decorative and hidden on mobile. Mobile stacks image, horizontal caption and copy. FeatureStrip uses four desktop columns and two mobile columns. These mobile arrangements follow the design-system proposals because no corresponding screenshots were supplied.

The story CTA jumps to the local facial-oil spotlight. The spotlight CTA and product destinations still use the reference store, consistent with the earlier sections.

## Reuse and frontend reasoning

ProductCard now accepts boxed (the default) and bare variants. Boxed remains the featured-products treatment. Bare removes the outer panel and puts the existing product-preview trigger into a white rounded corner cutout. Both variants reuse ProductPrice, discount calculation and ProductPreview, so future changes cannot silently diverge between sections.

ProductPreview accepts a compact trigger option while retaining the same shadcn Dialog. ActionLink now has light/dark tones rather than repeating dark-button styling inside a page section.

The spotlight uses a full-width photographic panel and a narrower, overlapping rail. The rail stays in normal flow with a negative margin, so subsequent content clears the cards. It reuses ScrollRail; four cards fit on desktop, while mobile exposes one card and a preview of the next. Its original seven products remain reachable.

All new sections remain Server Components. Browser interaction is still isolated in the existing ScrollRail and shadcn primitives. Image dimensions/aspect ratios reserve space before loading.

## Reference assets and content

Source: https://flux-demo-6.myshopify.com/ (retrieved during this implementation).
Images are stored locally under public/images/olivelle:

- story.webp: hero-2.webp
- story-watermark.webp: logo-shape-2_0ae5870d-7631-4e0b-ae33-71b4d5b36a2f.webp
- feature-botanical.webp: card-1.webp
- feature-tools.webp: card-2_e6f7fc4e-6d95-4877-959b-8900186013ee.webp
- feature-ritual.webp: card-3_0f2becd7-0817-4f47-ade1-31618f1daf98.webp
- feature-conscious.webp: card-4.webp
- facial-oils-banner.webp: collection-facial-ils.webp

Feature headings were recovered from the reference storefront because the supplied screenshot only shows the upper portion of those tiles. They are static editorial tiles here; no unseen expandable articles were added. Demo skincare/vegan language and imagery remain reference content to replace or validate with the final business catalogue.

## Manual review

Review the stacked story and two-column tiles at 360px/450px, and the desktop split layout at wider widths. Check the local story CTA, spotlight text wrapping/contrast, card overlap, rail arrows/swiping, and compact preview opening/closing. Confirm the previous boxed cards still look the same.

Validation for this slice is limited to TypeScript and targeted lint checks, as requested; no browser suite or production build is planned.
