# Our World: founder story

## Design plan
Palette: petal #FDC3E9, bright pink #FF65C3, blush #FFF0F7, porcelain #FFFCFA, aubergine #482338. Preserve shared tokens and original white logo.
Type: existing Bodoni Moda 500 for the story headline/pull quote, DM Sans for readable 16–18px prose and 14px captions. No additional fonts.
Layout: left-aligned editorial cover with a smiling portrait opposite a large headline; a narrow reading column beside a beauty/jewellery still life; one large statement about accessible style; a personal founder note and two shopping paths. Mobile becomes a deliberate single reading sequence.

[ large founder headline | portrait + small still-life ]
[ beauty/jewellery photo | origin story, left aligned  ]
[        accessible-style statement on pink           ]
[ founder's note         | beauty / jewellery links   ]

Principles: tell a personal teenage-founder story through getting-ready rituals, sharing discoveries and keeping style accessible; avoid corporate milestones, metrics, invented endorsements or a row of generic value cards. All narrative and photography explicitly marked as demonstration placeholders, with no actual founder name/age/date assumed.

## Plan critique
A corporate About page with three values and a timeline would be interchangeable with any retailer. Revised to a personal note and dressing-table imagery. Affordability is presented as the supplied founding ambition, not an unsupported guarantee about all current prices. Existing photography is temporary and is not represented as the real founder. Story content lives separately from the page component for replacement.

## Implementation scope
Create /our-world, replace all Our world header/mobile/footer anchor links, and connect the homepage introduction to the full story. Reuse existing shell, typography and assets. Keep styling scoped to founder-* classes in a CSS module.

## Visual verification
Reviewed live desktop and mobile screenshots at 1440, 1280, 768, 390 and 320px. Removed a secondary overlapping caption panel after mobile review so the jewellery photograph caption remains unobstructed. Direct route/refresh, header/footer/mobile navigation, story anchor, image loads and shopping links pass; browser console has no errors. TypeScript and production build pass. Placeholder images are existing reference assets, not photographs of the actual founder.
