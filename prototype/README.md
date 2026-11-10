# Megan Beauty design prototype

An isolated React 19 + TypeScript storefront using Next.js App Router and plain CSS. The pre-existing deleted files at the repository root have been left untouched. No commerce, payment, authentication or data integrations are included.

## Run locally

From `prototype/`:

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. Production verification: `npm run build`; type checking: `npm run typecheck`. If the machine's Node version manager reports no active version, select the installed Node version first (`nvm use 26.12.0`), or use its absolute executable path.

## Pages

- `/`: full storefront, editorial edits, categories, product rails, moodboard and newsletter.
- `/collections/beauty`, `/collections/jewellery`, `/collections/new-in`, `/collections/bestsellers`, `/collections/skincare`, `/collections/earrings`, `/collections/necklaces` and `/collections/accessories`.
- `/products/pink-lip-gloss`, `/products/gold-tone-hoops`, `/products/everyday-face-oil`, `/products/pendant-necklace` and the other slugs in `data/catalogue.ts`.
- Unrecognised products and collections have a proper 404 page. Collection and product URLs work on direct navigation and refresh.

## Code map

- `app/`: layouts, page routes, local fonts and shared CSS design tokens.
- `components/store.tsx`: shared React context, header, desktop and mobile navigation, search, product cards/rails, bag, information panels, footer and newsletter.
- `components/pages.tsx`: homepage composition, collection filtering/sorting, product gallery/options/quantity and related products.
- `data/catalogue.ts`: typed, replaceable sample products and collections; UK currency formatting.
- `public/images/`: original supplied logo and temporary image references.
- `DESIGN.md`: visual concept, tokens, brief review and progress.
- `verify.cjs`: browser integration and responsive checks using Playwright and local Chrome. Run `node verify.cjs` while the development server is running. Results and screenshots are written to `verification/`.

## Working demonstrations

Desktop mega-menu, mobile drawer, search and result links, product rail controls, collection navigation, type/price filters, sorting, gallery thumbnails, variant choice, quantity, quick add, favourites, bag quantities/subtotal and newsletter feedback. Native modal dialogs support Escape and trap keyboard focus. Bag and favourites last for the current browser session in React memory and reset on refresh. Checkout and account show clear prototype boundaries. The newsletter validates the email format but collects nothing.

## Content awaiting the business

All catalogue names, options and GBP prices are illustrative. Generic descriptions are layout examples, with no claims about ingredients, materials, efficacy or stock. Photography may depict different items and is labelled reference content. Replace with confirmed product photography before launch. Accessories intentionally has an honest empty state because no inventory has been supplied. There are no fake reviews, ratings or customer endorsements. Delivery, returns, contact details, social handles and legal text remain explicit placeholders. An offers section should be added only when a genuine promotion is supplied.

## Imagery and typography

The supplied `mb-logo.jpg` is preserved and shown with a CSS crop of its empty margins; it is not recreated. Fonts are locally hosted Bodoni Moda (Google Fonts, SIL OFL) and DM Sans (Google Fonts, SIL OFL).

Temporary Unsplash reference images (no Bijoux De Mimi assets used):

| Local file    | Source photo                                                 |
| ------------- | ------------------------------------------------------------ |
| beauty.jpg    | https://images.unsplash.com/photo-1524504388940-b1c1722653e1 |
| portrait.jpg  | https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43 |
| jewellery.jpg | https://images.unsplash.com/photo-1617038220319-276d3cfab638 |
| earrings.jpg  | https://images.unsplash.com/photo-1535632066927-ab7c9ab60908 |
| lips.jpg      | https://images.unsplash.com/photo-1586495777744-4413f21062fa |
| skincare.jpg  | https://images.unsplash.com/photo-1608571423902-eed4a5ad8108 |
| necklace.jpg  | https://images.unsplash.com/photo-1599643477877-530eb83abc8e |
| makeup.jpg    | https://images.unsplash.com/photo-1596462502278-27bfdc403348 |

Visual reference researched: https://bijouxdemimi.com/. Used for merchandising principles and discovery structure; no branding, written copy or photographs copied.
