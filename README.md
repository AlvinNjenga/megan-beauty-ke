# Megan Beauty

A React and TypeScript portfolio storefront based on the [design prototype](prototype/README.md). The catalogue, photography and founder story are sample content. Search, Saved, the bag and newsletter feedback are browser-only demonstrations. The bag and Saved reset on refresh.

## Develop locally

Use Node.js 24 or later.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, including the `/megan-beauty-ke/` prefix.

The root `index.html` is Vite's source entry point. Opening it from File Explorer uses `file://`, which blocks browser module loading. Use the Vite URL for development and the preview URL below for the production build.

## Build and verify

```sh
npm run typecheck
npm run build
npm run preview
```

Open [http://localhost:4173/megan-beauty-ke/](http://localhost:4173/megan-beauty-ke/) or the URL Vite prints if it selects a different port. The generated `dist/index.html` also needs to be served over HTTP or HTTPS.

The build renders the homepage, Our World, eight collections, eight products and a custom 404 to HTML in `dist/`. React hydrates those pages and handles in-site navigation. A product or collection can be opened or refreshed directly on a static host.

To run the production browser checks and capture screenshots in `verification/react/`:

```sh
npx playwright install chromium
npm run verify
```

Set `PLAYWRIGHT_CHANNEL=chrome` to use an existing Chrome installation. The verifier serves `dist/` at the repository subpath and compares screenshots if matching captures exist in `verification/baseline/`.

## Deploy to GitHub Pages

Set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The [Pages workflow](.github/workflows/pages.yml) builds and deploys on pushes to `main` or when run manually. The expected project URL is [alvinnjenga.github.io/megan-beauty-ke](https://alvinnjenga.github.io/megan-beauty-ke/). If the repository slug or hosting path changes, update `base` in `vite.config.ts`.
