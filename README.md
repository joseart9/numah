# numah

Landing page for Numah, specialty coffee in Monterrey, N.L.

Plain static site (HTML + CSS + vanilla JS) built on the Numah design system — no build step.

- `index.html`, `landing.css`, `landing.js` — the page
- `data.js` — menu items and store info (prices are examples)
- `styles.css`, `tokens/`, `fonts/`, `assets/` — design-system tokens, self-hosted fonts and brand assets

## Run locally

Serve the folder (CSS masks don't load from `file://`):

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Deploy

Vercel serves the repo root as-is; `vercel.json` sets the framework to "Other" with no install/build step.

## SEO

- Canonical domain: `https://numah.com/` (canonical, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`). Change it in all of those if the domain changes.
- Structured data: `CafeOrCoffeeShop` + `WebSite` + `WebPage` JSON-LD in `index.html`, including the menu (no prices yet). Add `openingHoursSpecification`, `telephone`, `geo` and `sameAs` (Instagram/TikTok) once they're confirmed.
- `og-image.png` (1200×630) is the share preview; `apple-touch-icon.png`, `icon-*.png`, `favicon-64.png` and `site.webmanifest` are the icons.
- Images are WebP. Decorative masks (doodle pattern, hero floaters) load after the intro so they don't delay first paint.

## Notes

- The "Club Numah" section is hidden (`hidden` attribute on the section and its two nav links in `index.html`).
- Social links and opening hours are placeholders.
