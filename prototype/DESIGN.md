# Megan Beauty design prototype

## Impeccable refinement, 8 November 2026

Approved scope: all five critique priorities plus a bolder expression of the existing identity. Preserve the original white-background logo, pink/porcelain/aubergine palette, Bodoni Moda and DM Sans, React + TypeScript prototype boundaries and genuine-content requirements.

Typography now uses Bodoni 500 for display, DM Sans 600 for navigation/actions/prices, 16px body and product text, and a 14px secondary-UI floor. Hero display caps at 96px. Role tokens live in globals.css; heading tracking is no tighter than -0.035em. Controls are at least 44px in the relevant shopping paths; inputs use 16px text.

The bolder move is a concise, large “Beauty. Sparkle. All you.” campaign and a confident pink, directly shoppable pairing edit. No new palette or typeface is introduced. Repetitive moodboard and long brand-story sections are replaced by the pairing edit and a concise introduction. New-arrival and bestseller names now match their destinations; collection navigation separates departments from merchandising edits.

Multi-option products expose an inline, explicit option picker and require a selection before adding to the demonstration bag. Saved products have a header/mobile-menu/footer entry and an in-memory Saved edit drawer, with useful empty state and an honest refresh limitation. Applied type/price filters remain visible as removable chips when the filter form is collapsed. No commerce backend or authentication has been added.

## Plan and review

- [x] Inspect repository, supplied logo and reference. Existing tracked Next.js files are deleted; preserve those deletions and isolate work in prototype/.
- [x] Establish and critique visual direction before implementation.
- [x] Build homepage, collection and product routes.
- [x] Implement shopping, search, navigation and newsletter demonstrations.
- [x] Compile, run and inspect desktop/mobile; verify interactions.

## Tokens

Petal #FDC3E9; electric pink #FF65C3; pale blush #FFF0F7; porcelain #FFFCFA; aubergine #482338; champagne #C5A476. Aubergine carries text and primary button contrast; bright pink is a recognisable accent.
Typography: Bodoni Moda for editorial headings, DM Sans for interface/body. The supplied logo is used as an image, cropped only to remove its large empty margins.
Spacing: 8px base, 24px card gaps, 64–88px section rhythm, approximately 48px desktop page gutters, 20px mobile. Outer content max 1600px; editorial max 1472px. Product photography 4:5; editorial photos vary intentionally.

## Component conventions

Shared CSS tokens live in `app/globals.css` under `:root`. Page compositions use shared ProductCard and ProductRail components. Heading hierarchy uses Bodoni Moda; interface content uses DM Sans. Product images use a 4:5 crop, category images use a wider desktop crop and square mobile crop. Primary buttons use aubergine for contrast, outlined buttons indicate a parallel shopping path. Small pill badges identify new arrivals; heart buttons expose pressed state. Drawers use native modal dialogs for focus containment and Escape. Avoid additional decorative colour swatches until real product shade data is supplied.

## Final verification

Next.js 16.4.5 production build passed and generated 19 pages, including all eight collection and eight product examples. TypeScript passed. Dependency audit: zero vulnerabilities. Browser checks passed at 1440, 1280, 768, 390 and 320px, with screenshots inspected for desktop and mobile. Checks cover direct routes, loaded images, mega-menu, filtering, sorting, gallery, variants, bag quantities/subtotals, checkout boundary, search, newsletter and mobile navigation. The single console 404 in `verification/results.json` is the deliberately requested missing product used to verify the 404 page.

Screenshot critique corrected intrinsic image sizing, hero clipping, original-logo cropping and mobile headline wrapping. Removed decorative swatches that did not correspond to genuine catalogue variants. Dev and production outputs use separate folders so builds do not interrupt the preview.

## Layout exploration

A: Full-screen campaign photo with overlaid headline. Rejected: hides the connection between categories and depends on unavailable campaign assets.
B (selected): Left-aligned blush editorial panel, tall beauty portrait, smaller jewellery inset; the styling story joins both categories.

```
[announcement                    ]
[search       original logo   bag]
[        category navigation     ]
[ editorial words | portrait     ]
[ two shop buttons|   [jewellery]]
[      discovery category strip  ]
[       new arrivals / rail      ]
[ jewellery edit | beauty edit   ]
[       most loved / grid        ]
[ story / community moodboard    ]
[ newsletter and useful footer   ]
```

Mobile: editorial words above photo composition; horizontal category and product rails; full-width drawer navigation; two-column collection grid; gallery before product details.

## Brief review / originality pass

An initial all-pink card treatment would feel like any cosmetics theme. Revised to mostly porcelain merchandising space and a single bold split campaign composition. Avoid fake social metrics, star ratings, claims, delivery offers and stock urgency. Reference studied at https://bijouxdemimi.com/: collection-first merchandising, visual colour discovery, narrative and community sections. No reference photography or copy reused.
Demo products use descriptive category names rather than invented brands; all prices, variants and catalogue content are explicitly sample data. Temporary Unsplash imagery is art-direction reference only and must be replaced with licensed catalogue/campaign photography. No backend, payment or authentication.
