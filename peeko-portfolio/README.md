# Peeko — Design Portfolio 2025

Static multi-page website built from Isa Smith's design portfolio PDF. Uses the blueprint aesthetic (royal-blue grid, grunge texture, condensed display type) as the site chrome, with her original page compositions preserved inside an interactive gallery.

## Structure

```
site/
├── index.html       Landing page — hero + featured work grid
├── about.html       Bio, Peeko mascot, software toolkit with proficiency dots
├── work.html        Full portfolio with category filters + lightbox
├── contact.html     Contact details + mascot row
├── css/styles.css   All styling (single shared stylesheet)
├── js/main.js       Filters, lightbox, keyboard nav, scroll reveals
└── images/          Page renders extracted from the source PDF
```

## Running locally

No build step — it's plain HTML/CSS/JS. From the `site/` folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. You can also host it anywhere: Netlify, GitHub Pages, Cloudflare Pages, Vercel — just upload the folder.

## Design system

| Token | Value |
|---|---|
| Primary blue | `#3F4EA8` |
| Deep blue | `#2C3A85` |
| Peeko red (accents) | `#E7302A` |
| Grid size | 80px (48px on mobile) |
| Display font | Barlow Condensed 400–900 |
| Body font | Barlow |
| Technical font | JetBrains Mono |

All colours and sizing tokens are CSS variables on `:root` in `styles.css` — change them once and they cascade everywhere.

## Common tweaks

- **Swap portfolio images** — replace files in `images/`. Filenames referenced in `work.html` (`page_05.jpg`, `page_06.jpg`, etc.).
- **Add a project** — copy any `.gallery__item` block in `work.html`, change `data-cat` and `src`. The filter and lightbox pick it up automatically.
- **Change category filters** — edit the `<button class="filter-btn">` list in `work.html` and match the `data-cat` values on each gallery item.
- **Update contact links** — four `<a>` elements in `contact.html`, wired to `tel:`, `mailto:`, Behance, LinkedIn.
- **Change the accent colour** — edit `--peeko-red` in `styles.css`.

## Known caveats

1. **Peeko graffiti wordmark not extracted.** The bubble-letter logo appears as a vector layer in the PDF that couldn't be cleanly isolated. The nav uses a text-styled "PEEKO" wordmark. If Isa supplies a standalone SVG or transparent PNG, drop it into `images/` and add an `<img>` inside `.nav__brand`.
2. **Mascot PNGs** were colour-keyed (near-black pixels → transparent). Edges are clean against the royal-blue background but may show slight haloing on very different colours. Supply original transparent PNGs for perfect edges.
3. **Linkedin/Behance handles** in `contact.html` are placeholders — update the `href` if the real URLs differ.

---
Built from the Design Portfolio 2025 PDF · Cape Town
