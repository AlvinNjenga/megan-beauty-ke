# Design system: Olivelle reference

## Scope and evidence

This is a screenshot-based design and component plan for recreating the supplied Olivelle Shopify theme by Flux using Tailwind CSS and shadcn/ui. It does not implement application code.

All 12 supplied screenshots are the visual reference. Desktop captures are approximately 1920px wide; mobile captures are approximately 360px and 450px wide. Measurements below are approximate screenshot pixels, not verified browser CSS values. Capture scale varies, so use proportions and the desktop/mobile relationship before exact numbers.

**Observed** describes visible appearance. **Proposed** describes implementation choices or behaviour that still needs validation. Exact fonts, colour values, breakpoints, hover states, transitions, carousel mechanics and drawer contents cannot be established from static images.

Reference copy, prices, flags, logos and contact details are sample content, not instructions or final Megan Beauty branding. The footer contains unrelated nutrition copy; preserve its layout, not that content. No live theme inspection was needed for this plan.

## 1. Visual direction

An airy skincare storefront with bold editorial serif headings, clean sans-serif supporting text, pastel studio photography and near-black controls. Most colour comes from imagery; the surrounding interface stays white or very pale grey. Lavender anchors the hero and small accents.

Key characteristics:

- Large, tightly spaced serif titles contrasted with small, widely tracked uppercase eyebrows.
- Broad horizontal sections and substantial breathing room.
- Square collection and product photography with gently rounded corners.
- White labels or panels overlapping images; deliberate stepped silhouettes.
- White or black rounded call-to-action buttons with a small circular chevron.
- Fine outlined utility icons, delicate borders and very little shadow.
- Repeated image crops, rounded decorative imagery and a pale oversized brand watermark.

Avoid turning every section into a bordered shadcn Card. The reference depends on open layouts and image/panel overlap.

## 2. Foundations and tokens

### Colour

Starting values are visual estimates; validate against the original image assets during implementation.

| Semantic token | Starting value | Use |
| --- | --- | --- |
| background | #FFFFFF | Page, header, overlapping panels |
| foreground | #20201E | Headlines, body emphasis, dark CTA |
| muted-foreground | #626262 | Supporting paragraphs, eyebrows |
| surface-muted | #F7F7F7 | Featured-products section, quiet badges |
| border | #EAEAEA | Tabs, form fields, dividers |
| brand-lavender | #C4B1D9 | Desktop hero field; match supplied asset |
| accent | #ECE0FC | HOT/NEW badges, alternating feature backgrounds |
| accent-soft | #F5EFFB | Decorative watermark |
| accent-control | #EAE3FB | Compact product action circle |
| primary / primary-foreground | #20201E / #FFFFFF | Dark CTA |
| secondary / secondary-foreground | #FFFFFF / #20201E | Light CTA |
| on-image | #FFFFFF | Hero/banner text |
| image-scrim | Black at roughly 15–35% | Proposed adjustable overlay where needed |

Blush, peach, cream and golden oil tones are primarily photographic colours. Do not tint all UI surfaces pink. Mobile hero appears darker than desktop; a stronger scrim is a plausible implementation, not a confirmed theme setting.

Proposed focus ring: a darker violet such as #75549C with a white offset. Pale lavender alone is insufficient for clear focus indication. Verify text contrast on actual crops, especially white text over the lavender hero.

### Typography

Observed: a substantial serif with bracketed serifs and rounded forms for headings, paired with a neutral sans-serif. Exact families cannot be identified reliably from screenshots.

Proposed starting font audition: **Libre Baskerville** for the serif and **Inter** for the sans-serif, with Georgia and system-ui as fallbacks. These are candidates, not identified theme fonts. Compare letterforms and line wrapping before committing to font files; typography will materially affect fidelity.

| Role | Desktop starting size / line height | Mobile starting size / line height | Weight and treatment |
| --- | --- | --- | --- |
| Hero display | 76–84 / 1.08 | 54–64 / 1.05 | Serif 700 |
| Category-banner title | 60–68 / 1.1 | 48–54 / 1.05 | Serif 700 |
| Editorial statement | 60–68 / 1.5–1.7 with inline media | 36–40 / 1.8–1.95 with inline media | Serif 400 |
| Large split-section heading | 60–68 / 1.12 | Proposed 34–40 / 1.15 | Serif 700 |
| Standard section heading | 44–48 / 1.15 | 28–32 / 1.15 | Serif 700 |
| Promotion title | 26–28 / 1.2 | 23–26 / 1.2 | Serif 700 |
| Product title | 20–22 / 1.25 | 17–18 / 1.25 | Serif 700 |
| Body, large | 20–22 / 1.75 | 18–20 / 1.7 | Sans 400; slight tracking |
| Navigation | 17–18 / 1.4 | Drawer unspecified | Sans 400 |
| Button | 16–18 / 1.25 | 15–18 / 1.25 | Sans 600–700 |
| Price | 14–16 / 1.4 | 13–14 / 1.4 | Sans 400 |
| Eyebrow | 11–13 / 1.4 | 9–10 / 1.4 | Uppercase, 0.22–0.3em tracking |
| Badge / tab | 10–12 / 1.2 | 9–10 / 1.15 | Sans, uppercase where shown |

Use fluid sizing between endpoints. Allow editorial copy to wrap naturally with controlled text width and inline-media alignment. Do not embed desktop-only line breaks throughout headings. The observed mobile “Most Loved Products” remains on one line around 360px; use it as a font-fit check.

### Spacing, geometry and depth

Use a 4px-based scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96.

| Token / pattern | Desktop | Mobile |
| --- | --- | --- |
| Wide section gutter | Approximately 56px at 1920px | 14–20px |
| Narrow container | Approximately 1536px maximum, centred | Available width minus gutters |
| Card gap | 24–28px | 10–14px |
| Section vertical padding | 64–96px | 40–60px |
| Image/card radius | 8–12px | 8–10px |
| CTA radius | 14–18px | 14–18px |
| Header height | Approximately 74–76px | Approximately 49–62px across captures |
| CTA height | 44–50px | 40–48px |
| Product media inset, boxed | 12–14px | 9–10px |

Circular controls use full rounding. Shadows belong mainly to raised CTAs: a restrained starting point is 0 4px 8px rgba(0,0,0,0.12). Product cards are largely shadowless. Use a 1px quiet border for inputs and tab pills.

## 3. Page composition

The likely sequence is hero with overlapping collection tiles, editorial statement, featured products, image/text storytelling, supporting feature tiles, category spotlight, most-loved promotions, partial deal section, image gallery and footer. Screenshots do not establish the exact order of every later section or show the whole page.

### Header and persistent controls

Observed desktop hero header: white rounded bar inset approximately 19px horizontally and 37px from the top. Navigation is left aligned, flame mark geometrically centred, and search, locale, account and bag controls are right aligned. A tiny lavender HOT badge sits above one navigation item.

Scrolled captures show a white edge-to-edge top header. A thin lavender line along its top changes length between captures and may be scroll progress; do not assume this behaviour without validation.

Mobile replaces navigation with a menu icon and retains the centred logo, search and bag. Desktop locale/account icons are absent. The hero header is inset; scrolled headers sit flush at the top.

Proposed: one responsive SiteHeader with floating and sticky states. Keep the logo centred independently of unequal side widths. Use a Sheet for mobile navigation/cart, NavigationMenu for desktop collection menus, and Dialog for search; menu structure and contents remain undefined.

A vertical white social rail sits at the desktop right edge, with Facebook, Instagram, YouTube, TikTok and WhatsApp. Mobile consistently shows a bottom white social bar. Treat persistent positioning as the working interpretation. Reserve bottom space and safe-area padding so it cannot cover content. Back-to-top is a small outlined circle at lower right, above the mobile bar.

### Hero and collection rail

Desktop: full-width lavender/image composition roughly 900px tall in the reference. Copy sits on the left near vertical centre; three models occupy the right. White serif “Pure Glow” includes a hand-drawn curved underline beneath “Glow.” Supporting copy and a white CTA sit below. Outlined circular slide arrows appear near the lower right.

Mobile: roughly 630px hero region including the header in the 450px-wide capture. Image fills the width with much tighter cropping. Copy overlays the models, centred; CTA follows below. Use separate focal-position settings for each breakpoint and optionally an art-directed mobile source. Do not shrink the whole desktop composition.

Five collection tiles overlap the bottom edge of the hero. Desktop tiles are near-square, approximately 343px wide, with white inset bottom labels. Mobile shows two approximately 190px tiles and a sliver of the next at 450px width. Implement a horizontal CollectionRail, not a stacked list. At 360px, initially target about 43–45vw per tile and tune against an equivalent capture.

Use normal-flow layout with a controlled negative top margin for overlap, reserving full tile height before the following section. Collection captions remain DOM text.

### Editorial statement

White background with a large centred serif sentence interrupted by three small visual accents: an organic rounded model/product image, a transparent heart-like oil smear, and a rounded bottle image.

Desktop statement spans two broad lines; decorative images are around 120px. Mobile type drops to roughly 38px, media to 54–64px, and the final bottle accent wraps onto its own centred line. Supporting paragraph is centred, around 900px maximum on desktop and padded about 24px on mobile. Preserve the generous paragraph line height and vertical spacing.

Represent copy and inline visual accents as structured segments. Use explicit groups where necessary to reproduce intentional wrapping without making the sentence inaccessible. Decorative images should have empty alt text.

### Featured products: “Glow Essentials”

Pale-grey full-width section with centred eyebrow, serif heading and three outlined category tabs with count bubbles. Active tab is darker/bolder; selection is not expressed by a heavy filled pill. Desktop arrows are right aligned above four visible cards.

Boxed product cards are white, gently rounded, with inset square photography. A white central action panel overlaps the lower image edge, followed by centred title and price. NEW badge is top left; discount badge top right. Compare-at price is smaller, grey and struck through.

Mobile shows one dominant card plus a preview of the next: roughly 306px card width at a 360px viewport, with approximately 287px media. Three compact tabs fit on one row and labels may wrap. Cards remain horizontally scrollable.

The three-line action icon is visible, but its behaviour is not. Call it ProductActionTrigger in the plan; quick view or variant selection are possibilities to confirm before implementation.

### Image with text and feature tiles

Desktop uses a broad two-column layout with approximately 56px outer gutters. Left image is around a 3:2 ratio. A narrow central divider carries vertical, widely tracked “NEW COLLECTION.” Right column contains eyebrow, large serif heading, long body paragraph and black CTA. A pale flame watermark sits behind the copy.

Proposed mobile behaviour, since no reference is supplied: stack image then text, turn the vertical label horizontal or omit it as redundant decoration, reduce padding and watermark size, and retain readable text alignment.

Below it, a partially visible four-column strip alternates pale lavender and warm off-white surfaces, with large circular images. Titles and descriptions are not visible. Plan a FeatureTile primitive, but do not invent claims or unseen text. Proposed mobile layout: two columns, falling back to one if copy requires it.

### Category spotlight: “The Art of Facial Oils”

Full-width photographic background with a muted dark overlay, centred white heading, accent underline, short description and white CTA. Four products overlap the lower background boundary inside a narrower centred container.

Reuse product data and media components, but use a **bare** ProductCard variant: no enclosing white box, title/price directly below, and a white rounded cutout at the media's bottom-right housing a lavender circular action trigger. This differs visibly from the centred panel on boxed cards.

Mobile title wraps to two lines; copy and CTA remain centred. Rail begins beneath the CTA while still overlapping the banner. At 360px, one approximately 306px image and part of the next are visible. The screenshot crops the lower card, so it does not prove that titles disappear on mobile.

### Most-loved promotions

White section with left-aligned serif heading and desktop arrows at the right. Four square editorial image cards, each with a bottom-left white panel containing a small sale badge, serif title and plain text CTA with chevron. Panel is narrower than the photo, leaving the image visible on its right. This is a PromotionCard, not a purchasable ProductCard.

Mobile preserves this overlap and a horizontal rail, showing one main card and the next sliver. The following image section begins about 40px later.

The subsequent “Lowest Priced Deal” content is only partly visible on desktop; mobile reveals an image with white circular markers. Reserve a provisional DealFeature / ShoppableImage section. Do not infer countdowns, marker popovers or purchase behaviour from these fragments.

### Gallery and footer

Gallery: edge-to-edge horizontal row of rounded square lifestyle/product images, with partial images at both outer edges. Repeated images may indicate a looping rail, but motion is unconfirmed. Start with a static scrollable gallery.

Desktop footer uses a narrower centred container with four unequal columns: brand/newsletter, shop/contact/policy links, quick links, and a wide image plus centred title/caption. Newsletter field is an outlined, rounded single-line input with a right-arrow submit control. Social links sit below it.

A thin divider separates the bottom row: copyright/policy text left, payment marks centre, and country/currency/language controls right.

No mobile footer screenshot exists. Proposed: stack newsletter and feature content; use Accordion groups for link columns if their length warrants it; wrap payment marks and locale controls into separate rows. Keep all content clear of the persistent social bar. Replace demo branding, policies, contact details and payment marks with actual business content.

## 4. Reusable component architecture

| Component | Responsibility / main variants | shadcn/ui relationship |
| --- | --- | --- |
| SectionShell | Wide or contained width, gutters, vertical spacing, surface | Custom layout |
| SectionHeading | Eyebrow, title, optional description; centred or left | Custom typography |
| SiteHeader | Floating/sticky, desktop/mobile arrangements | NavigationMenu, Sheet, Dialog |
| SocialLinks | Shared ordered links; rail, bottom bar, inline | Custom links and icon buttons |
| BackToTop | Scroll action, fixed placement | Button, icon variant |
| ActionButton | Light/dark CTA with optional circular chevron | Restyle Button |
| CarouselControls | Previous/next, overlay or plain style | Button |
| CollectionRail / CollectionTile | Category image links and inset labels | Carousel if controls required |
| HeroBanner | Image, focal points, copy, optional slides/underline | Custom composition |
| EditorialStatement | Text segments and inline decorative media | Custom composition |
| ProductCollection | Heading, tabs, rail and selected products | Tabs and Carousel |
| ProductCard | Boxed or bare rendering of same product | Custom composition |
| ProductMedia | Square image, badges and action placement | AspectRatio optional |
| ProductActionTrigger | Accessible trigger; behaviour pending | Button; Dialog only if confirmed |
| Price / StatusBadge | Currency, from-price, compare-at; new/sale | Badge with custom styling |
| CategorySpotlight | Background, scrim, heading and overlapping rail | Reuses ProductCard |
| PromotionCard | Editorial image and bottom-left CTA panel | Custom link composition |
| ImageTextSection | Image, copy, CTA, optional label/watermark | Custom responsive grid |
| FeatureTile / FeatureStrip | Circular imagery on alternating surfaces | Custom layout |
| ImageGallery | Consistent image crops and horizontal rail | Carousel optional |
| NewsletterForm | Labelled email input, submit, validation/status | Input, Button |
| SiteFooter | Newsletter, link groups, feature card, legal/locale | Accordion, Select as appropriate |

Use shadcn for accessible interaction primitives, then replace default spacing, radii, typography and colours with these tokens. Do not inherit default Card padding or default Tabs styling when they conflict with the reference. Avoid nested links/buttons inside an all-clickable product card: use a separate image/title link and sibling action button.

Proposed content models:

- Product: id, slug, title, image/alt, optional alternative image, price, compareAtPrice, currency, pricePrefix, badges and variants if required.
- Collection: id, title, image/alt, destination and optional count.
- Promotion: image/alt, title, badge text, CTA label and destination.
- Hero slide: desktop/mobile image, focal positions, title, accent phrase, description and CTA.
- Navigation/footer: labelled destinations and verified locale/social/business data.

Derive display prices and discounts consistently from data. Do not hard-code reference EUR values or German locale into shared components.

## 5. Responsive and interaction rules

Proposed breakpoints: base/mobile, sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px. These are implementation starting points, not measured theme breakpoints.

- Keep mobile navigation until desktop links, logo and utility controls fit without collision; likely switch around xl.
- Collections: approximately 2.1 tiles visible on mobile; five on wide desktop.
- Product/promotion rails: approximately 85–88% viewport-width cards on small mobile; two or three visible on tablet; four on wide desktop.
- Use a shared horizontal rail with configurable item basis, snap alignment and gap. Prefer native overflow and scroll snap for simple rails; use shadcn Carousel when button control and selected-slide state justify it.
- Keep previews of the next item intentional; prevent horizontal overflow of the page itself.
- Preserve semantic heading order: one hero h1, section h2s, card h3s as appropriate.
- All controls need visible keyboard focus and accessible names; icon hit areas should generally be at least 44px even where the visible icon is smaller.
- Tabs must support keyboard navigation and correctly associated panels. Announce meaningful changes without repeatedly announcing decorative slide movement.
- Proposed hover states: subtle image zoom or opacity change, CTA tonal change and text-link underline. These are not evidenced by screenshots.
- Start without autoplay. Honour reduced motion for any later carousel animation, smooth scrolling or image effects.
- Supply useful image alt text for meaningful imagery, hide decorative underlines/watermarks from assistive technology, and use real text for captions.
- Newsletter needs a persistent accessible label and clear success/error feedback; placeholder text alone is insufficient.

## 6. Tailwind and asset implementation plan

The project currently lists Tailwind CSS 4. shadcn/ui configuration was not found in the inspected root files. Installation and configuration remain future implementation work.

Define semantic colour/font tokens through Tailwind v4's CSS-first theme approach. Map shadcn background, foreground, primary, secondary, muted, accent, border and ring variables to the palette above. Add named display/body fonts, section spacing, content widths and component radii; retain explicit white/light and black/dark CTA variants.

Keep repeated geometry in shared components: square media, card overlaps, rail sizing and gutter rules. Use local positioning for panels and badges; avoid absolute positioning for entire sections.

Required assets:

- Hero artwork with desktop and mobile focal-point guidance.
- Five collection tile images.
- Individual product photography in consistent square crops.
- Three editorial inline accents, including transparent oil-heart artwork.
- Storytelling and category-banner photographs.
- Four promotion images and supporting circular feature images.
- Gallery/footer imagery, approved brand mark and subtle watermark.
- Consistent thin utility icons and accurate social/payment brand assets.

The screenshots are layout references, not production image assets. Obtain source photography and approved branding; recreating the imagery from screenshot crops would limit quality. Source images will matter as much as typography for matching the design.

Before any future Next.js code work, read the relevant installed guides in node_modules/next/dist/docs/ as required by AGENTS.md. No Next.js implementation is part of this document.

## 7. Implementation sequence and acceptance

1. Confirm brand assets and audition heading/body fonts against reference line breaks.
2. Establish theme tokens, SectionShell, typography and button/icon primitives.
3. Build responsive header, social placements and hero/collection overlap.
4. Implement shared rails and both ProductCard variants, then category tabs.
5. Assemble editorial, spotlight, promotion and image/text sections.
6. Add gallery/footer and agreed mobile fallbacks for unshown sections.
7. Validate at approximately 360px, 450px, 768px, 1024px and 1920px.

Acceptance checks:

- Desktop logo stays centred; mobile controls fit with sufficient hit areas.
- Hero crop preserves faces and products, with legible overlay text.
- Collection tiles cross the hero boundary without colliding with the statement.
- Serif weight, heading wrap and paragraph rhythm resemble the references.
- Mobile rails expose the next card, and desktop rails show the expected counts.
- Boxed and bare product cards retain their distinct panel/action placement.
- Promotion panels maintain the visible stepped image silhouette.
- Sticky controls never obscure actionable content or footer links.
- Typography and imagery load without disruptive layout shifts.
- Keyboard, touch, focus, contrast and reduced-motion behaviour are checked.
- Unshown mobile sections and unknown interactions are reviewed as proposed behaviour, rather than claimed screenshot matches.

Open fidelity questions: exact font families, original image assets, sticky-header transition, meaning of the top lavender line, product action behaviour, carousel looping/autoplay, gallery motion, mobile footer composition and the partially shown deal/feature sections.


## Implementation finding: hero and collection rail

The reference storefront was inspected during implementation on September 6, 2026. Its font declarations confirm Fraunces for headings and Inter for body text, superseding the font audition above. Original desktop/mobile hero imagery and the five collection assets are now local. See docs/hero-and-collections.md for component boundaries, asset provenance, temporary reference collection destinations and the deliberately limited header scope.

