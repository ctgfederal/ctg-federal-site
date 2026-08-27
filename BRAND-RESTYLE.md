# Brand Restyle — align site to CTG Federal Brand Standard v2.0 (CTG/F-BS-001)

Source of truth: `/Users/joshschultz/Projects/ctg-skills/Design System/CTG-Federal-Brand-Standard.html` (read sections 10–19 in full: color, typography, spacing, icons, graphics, imagery). This document wins over SITE-SPEC.md and over the old Dropbox design system wherever they differ. The previous build used Roboto/Oswald, slate body text, azure buttons, navy-tinted shadows, a brand gradient, and a tiled hex PNG — all of that changes.

## 1. Typography (replace entirely)

| Role | Family | Digital spec |
|---|---|---|
| Display XL (home hero H1) | Georgia | 72px desktop (clamp down to 40px mobile), 700, LH 1.0, tracking −0.025em |
| Display L (interior page titles in PageHero) | Georgia | 48px, 400 (700 allowed), LH 1.05, tracking −0.02em |
| H1 (major section headings, e.g. "Enterprise IT Solutions & Expertise") | Georgia | 36px, 400, LH 1.1, tracking −0.015em |
| H2 (sub-section headings, card titles) | Georgia | 28px, 400, LH 1.15, tracking −0.01em |
| H3 (section labels) | Verdana | 14px, 700, ALL CAPS, LH 1.2, tracking 0.12em, Navy |
| Lead | Verdana | 18px, 400, LH 1.5 |
| Body | Verdana | 16px, 400, LH 1.55, color Ink |
| Small / UI (nav, buttons, form labels, footer links) | Verdana | 14px, 700, LH 1.45, tracking 0.005em |
| Caption | Verdana italic | 13px, 400, LH 1.4, Dark Gray |
| Mono / Token (DUNS, UEI, CAGE, NAICS, contract numbers, stat labels) | JetBrains Mono | 13px, 500, LH 1.4, tracking 0.04em |
| Tag / Mono caps (eyebrows like `01 // ABOUT`, "TESTIMONIALS", "PRE-SALES") | JetBrains Mono | 12px, 500, ALL CAPS, tracking 0.18em, Azure on light, Azure on navy |

- CSS stacks: display `Georgia, 'Times New Roman', Times, serif`; body `Verdana, Geneva, 'DejaVu Sans', sans-serif`; mono `'JetBrains Mono', Consolas, 'SF Mono', Menlo, monospace`.
- Load JetBrains Mono 400/500/600 from Google Fonts (`<link>` in BaseLayout with preconnect). Georgia and Verdana are system fonts — no @font-face.
- Delete the Roboto/Oswald `@font-face` rules and the `.ttf` files in `public/fonts/`. Remove the `/fonts/*` cache header from netlify.toml.
- Headings H1/H2 default to weight 400. Use 700 only for the home hero and where emphasis is needed.
- Semantic HTML mapping: keep real `<h1>` on every page for the page title, `<h2>` for section headings, `<h3>` for sub-headings; style them with classes (`.display-xl`, `.display-l`, `.h1`, `.h2`, `.label`) rather than relying on tag defaults, so document outline stays correct while visuals follow the ramp. Set sensible tag defaults too (h1→Display L, h2→H1 spec, h3→H2 spec, h4→H3 label spec).
- Spacing rules (digital): paragraph space-below 18px, lead 24px; before H2 40px, after 20px; before H3-label 40px, after 22px; list item gap 8px; max measure 70ch (never over 80). Bullet markers Azure (`::marker { color: var(--azure) }`).
- Tables: header row 2px Navy bottom border; 1px Light Gray row dividers; cell padding 10px 12px; numbers right-aligned with `font-variant-numeric: tabular-nums`; no zebra fills.
- Callouts / pull quotes: Georgia, 3px Azure left border, Bone background, 14–16px padding, 20px vertical margin. Testimonials use this treatment (on navy sections: transparent bg, 3px Azure left border, white Georgia italic).

## 2. Color tokens (replace `:root`)

```
--navy:#002550  --yale:#003B82  --medium:#0055BC  --azure:#0073FE
--ink:#0B1220   --charcoal:#54585C  --dark-gray:#7F7F7F
--white:#FFFFFF --bone:#F4F5F6  --light-gray:#E9EAEB  --orange:#F68D2E
Navy scale: 900 #001A38 · 700 #002550 · 500 #003B82 · 300 #3A6BA8 · 200 #7A9CC8 · 100 #C7D6E8 · 50 #EAF0F7
Azure scale: 900 #003E8A · 700 #0055BC · 500 #0073FE · 300 #5A9CFF · 200 #9CC2FF · 100 #D6E6FF · 50 #EEF4FF
Semantic: --color-primary navy · --color-primary-2 yale · --color-primary-3 medium · --color-accent azure
--color-text-on-light ink · --color-text-muted charcoal · --color-text-on-dark white
--color-bg-page white · --color-bg-subtle bone · --color-border light-gray · --color-warn orange
```

Usage rules:
- Body text on light = Ink. Secondary/captions = Charcoal or Dark Gray. Headings on light = Navy.
- Buttons and text links on light grounds = **Medium Blue** (#0055BC), hover = Navy 500 (#003B82), active = Azure 900. Azure is NOT a text color at body size (fails AA); Azure is the pointer: tags, eyebrows, bullets, accent rules, focus rings, active nav state, the 3px callout rule.
- On Navy/Yale grounds: text White (body may be rgba(255,255,255,.85)), links/labels Azure 300 (#5A9CFF) or White; buttons on dark = White fill with Navy text, or outline White.
- Never more than two of Navy/White/Azure as backgrounds on one surface. Never Medium on Yale. Never Azure on Light Gray.
- Section grounds: White (default), Bone (subtle alternation), Navy (authority bands: stats bar, testimonials, CTA), Yale (depth, e.g. PageHero). Remove `.section--gradient`.
- Orange: only for form validation errors / warnings. Never decorative.

## 3. Graphic elements

- **No drop shadows, bevels, glows, or gradients** anywhere. Remove all `box-shadow` (keep `--shadow-*` tokens deleted). Cards become flat: white or Bone background, 1px Light Gray border, 4px radius (2px on tags/buttons, 4px on cards; nothing larger). Hover on link-cards: border color → Azure, no lift.
- The only permitted gradient: cover radial, Azure → Navy at ≤25% opacity, on the home hero and PageHero navy grounds (`radial-gradient(circle at 80% 20%, rgba(0,115,254,.25), transparent 60%)` over Navy).
- **Hex micro-grid**: replace the tiled hexagon PNG (`.hex-bg` using Hexagons-gradient-White.png) with an inline SVG hexagon line pattern: 0.5px stroke, Azure, opacity 0.18–0.25, tile ≈ 32×27px. Apply as a **corner motif only** — top-right of heroes/covers (home hero, PageHero), bottom-left of navy section dividers (stats bar, CTA band). Roughly 320–420px square area fading out with a mask (`mask-image: radial-gradient(...)`). Never tile across a whole section. Put the pattern in a reusable `HexGrid.astro` component with a `corner` prop.
- **Registration marks**: small L-shaped corner marks, 14–18px long, 1px stroke, Azure, at all four corners of feature blocks (the stats bar, the CTA band, PageHero content frame, testimonial cards). Reusable `RegMarks.astro` component (absolutely positioned, 4 corners, never partial).
- **Mono tag line** above section headings: e.g. `01 // ABOUT`, `02 // SOLUTIONS`, `TESTIMONIALS`, `QUICK FACTS` in JetBrains Mono caps, Azure. Replace the current Oswald `.eyebrow` with this `.tag` style. Number the home-page sections in order; interior pages may use unnumbered tags.
- Photos with type over them: Navy 70% scrim (solid or gradient). Icons over photos only on scrims, Azure or White.
- Icons: line-only, 1.5px stroke, Navy on light / White on dark / Azure active. The existing solution SVGs in `public/images/icons/` are black line icons — recolor via CSS filter or inline them so they render Navy/White. No filled icon tiles with clipped hexagons; the IconTile becomes a plain 48px line icon (optionally inside a 1px Light Gray square with 4px radius).

## 4. Components to update (all in `src/`)

- `styles/global.css` — rewrite tokens, type, buttons, cards, forms, tables, lists, callouts, utilities per above. Keep the class names other files already use where practical (`.container`, `.section`, `.section--navy`, `.btn`, `.btn--primary`, `.card`, `.grid--*`, `.split`, `.form`, `.field`, `.eyebrow`→ alias to `.tag`, `.prose`, `.quote`, `.accent-bar`) so pages keep working, but restyle them. Add new: `.tag`, `.label`, `.display-xl`, `.display-l`, `.mono`, `.callout`, `.reg-frame`.
- `layouts/BaseLayout.astro` — Google Fonts link for JetBrains Mono; remove any Roboto link.
- `components/Header.astro` — nav in Verdana 14px 700 tracked 0.06em caps (matches the live site's caps nav); active/hover underline 2px Azure; Contact button = Medium Blue. Utility bar in mono 12px caps.
- `components/Footer.astro` — DUNS/UEI/CAGE/NAICS in JetBrains Mono; link columns in Verdana small/UI; keep badges.
- `components/PageHero.astro` — Navy ground (Yale allowed as alternate) + radial azure ≤25% + HexGrid top-right + RegMarks on the content frame; Display L title; lead paragraph; optional photo with 70% navy scrim.
- `components/StatsBar.astro` — Navy; numbers Georgia 48px 400; labels JetBrains Mono 12px caps tracked; RegMarks at the four corners; HexGrid bottom-left.
- `components/ServicesGrid.astro`, `components/LogoGrid.astro`, `components/CustomerLogos.astro` — flat cards, no shadows, borders Light Gray, hover border Azure.
- `components/Testimonials.astro` — callout treatment (3px Azure rule, Georgia italic), attribution in mono caps.
- `components/CtaBand.astro` — Navy ground, RegMarks, HexGrid bottom-left, buttons white/outline-white.
- `components/QuickFacts.astro` — facts as a definition table in mono; compliance list with Azure bullets.
- `components/ContactForm.astro` + all page-scoped forms — Verdana labels 14/700, inputs 1px Light Gray border, 2px radius, focus 2px Azure ring, submit Medium Blue.
- `components/Accordion.astro`, `Breadcrumb.astro`, `Button.astro`, `IconTile.astro`, `Section.astro`, `ServicePage.astro` — apply the same rules.
- `pages/**` — sweep every page-scoped `<style>` for: `Roboto`, `Oswald`, `--font-display-alt`, `--font-condensed`, `box-shadow`, `--shadow`, `gradient`, `hex-bg`, `Hexagons-gradient`, `#0073FE` used as text/button fill, `--ctg-slate` body text, radii > 4px. Replace per the rules. Keep all copy unchanged.
- `SITE-SPEC.md` — update the "Design direction" and "Brand rules" lines to point at this file.

## 5. Verification

1. `grep -rn "Roboto\|Oswald\|box-shadow\|linear-gradient\|Hexagons-gradient\|--shadow\|font-condensed\|display-alt" src/` returns nothing except the single permitted radial gradient and the HexGrid component.
2. `npm run build` exits 0.
3. Re-run `SCRATCH/shot-all-local.mjs` (preview server on :4321) and inspect home, about, a service page, partners, contacts, when-to-engage at 1440 and 390 widths. Check: Georgia headings, Verdana body, mono tags, no shadows, corner-only hex grid, buttons Medium Blue, body text Ink.
4. Contrast: no Azure text at body size on white; no white on light gray.
