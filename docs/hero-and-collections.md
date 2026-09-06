# Hero and collection rail

## What this slice implements

A responsive art-directed hero, overlapping collection rail, reusable collection cards, CTA and a minimal floating Megan Beauty header. The reference's search, account, cart, locale and social interfaces are separate future features. The hero is a single image composition, so it has no pretend slide controls.

Collection links currently open the matching reference demo collections in the same tab. Replace their destinations in lib/storefront/home-content.ts when local catalogue routes exist. The hero CTA and header shop link jump to the local rail.

## Why these boundaries?

- app/page.tsx only composes sections. Data lives in lib/storefront/home-content.ts so copy, images and destinations can later come from Payload without changing presentation.
- components/ui holds existing shadcn primitives. components/storefront holds the specific visual language of the shop. We do not add a generic design framework before there is a need for one.
- HeroBanner, CollectionRail and CollectionCard remain Server Components. ScrollRail is the small Client Component that owns browser scrolling and button state. Passing server-rendered cards as children avoids importing all card rendering into the client bundle.
- ActionLink uses shadcn buttonVariants but renders an anchor: navigation should retain browser link behaviour. Rail controls use the actual shadcn Button because they perform actions.
- Native scrolling plus scroll snap handles touch interaction. The controls scroll by one card and update at the ends and on resize. Keyboard users can tab through the real links, which the browser scrolls into view.
- The rail uses a negative margin but stays in document flow. It crosses the hero boundary while still reserving space for the next section. Absolute-positioning the entire rail would lose that space.
- Cards use aspect-square to reserve image height. Next Image sizes describe their real responsive widths, preventing a small mobile card from requesting a full desktop image.
- The hero uses picture with Next getImageProps so the browser selects its mobile or desktop artwork before downloading. It requests the hero eagerly with high fetch priority, while card images retain lazy loading.
- Tailwind owns component styling. Global CSS only adds shared theme tokens and a scrollbar utility. Reduced-motion preferences disable animated scrolling/hover movement.
- The small mobile navigation uses native details/summary. A full modal navigation should use a shadcn Sheet when its content and behaviour are specified.

## Reference assets and fonts

Source inspected September 6, 2026: https://flux-demo-6.myshopify.com/
Theme listing: https://themes.shopify.com/themes/flux/presets/olivelle

Images in public/images/olivelle are local reference/demo assets downloaded from that storefront's /cdn/shop/files and /cdn/shop/collections endpoints. Their filenames map to the hero and the five collection images. These are not newly created Megan Beauty product photographs; replace them with approved shop imagery for launch.

The demo declares Inter 400/700 and Fraunces 400 (with bold heading styling). Font files are kept locally and loaded with next/font/local, avoiding build-time Google Fonts requests. This supersedes the initial Libre Baskerville estimate in design-system.md.

## Validation

Check desktop at 1920px, tablet at 768px, and mobile at 360px and 450px. Look for a centred hero on mobile, left-aligned text on desktop, five desktop tiles, partial mobile tiles, working end-state controls, keyboard focus, and no page-level horizontal overflow.

This is the first homepage slice; it does not implement catalogue pages, checkout, hero slides or the rest of the design-system plan.

## Sticky header

StickyHeader observes the original header slot with IntersectionObserver. Once that slot leaves the viewport above the page, the same header becomes fixed, edge-to-edge, and slides down over 250ms. It returns to its inset placement when the original slot re-enters view. Reduced-motion users get an immediate transition.

Observing a separate, stationary slot prevents the fixed header from triggering its own visibility changes. Keeping a single header preserves menu state and avoids duplicate navigation landmarks. Only the wrapper is a Client Component; navigation remains server-rendered.
