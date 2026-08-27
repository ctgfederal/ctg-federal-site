# CTG Federal — Website

Static site for [www.ctgfederal.com](https://www.ctgfederal.com), built with [Astro](https://astro.build) and deployed on Netlify from this GitHub repository.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the built site
```

## Structure

| Path | Purpose |
|---|---|
| `src/pages/` | One `.astro` file per URL (`about.astro` → `/about/`) |
| `src/layouts/BaseLayout.astro` | Head, header, footer, SEO |
| `src/components/` | Shared sections (hero, stats bar, logo grids, forms, etc.) |
| `src/data/` | Site content that repeats across pages: nav, stats, services, partners, customers, testimonials, quick facts |
| `src/styles/global.css` | Brand tokens and base styles (CTG Federal Brand Standard v2.0 — see `BRAND-RESTYLE.md`) |
| `public/images/` | Logos, icons, badges, photos |
| `public/downloads/` | PDFs (capabilities statement, line card, contracts, etc.) |

## Editing content

- Text on a single page: edit that page in `src/pages/`.
- Stats, partner logos, customer logos, testimonials, quick facts, nav: edit the matching file in `src/data/`.
- New PDF: drop it in `public/downloads/` and update the link.
- New accolade badge: add the image to `public/images/site/` and update `src/components/Footer.astro`.

## Forms

Contact, Become a Customer, Tech Support, When to Engage, and Order Status forms use [Netlify Forms](https://docs.netlify.com/forms/setup/). Submissions appear under **Forms** in the Netlify dashboard; set up email notifications there.

## Deploy

Netlify builds on every push to `main` (`netlify.toml` holds the build settings). Pull requests get a preview URL.
