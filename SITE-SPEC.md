# CTG Federal Site Rebuild — Build Spec

Rebuild of www.ctgfederal.com (Divi/WordPress) as a static Astro site, deployed via GitHub → Netlify.
Goal: same site, page for page and (nearly) word for word, restyled to the CTG Federal brand system and
gently modernized. This is a landing spot for an in-person, relationship-driven federal VAR. Calm, credible,
professional. Not a growth-hacking marketing site.

## Source material (read these, do not guess)

| What | Where |
|---|---|
| Scraped page text (all content, in order) | `SCRATCH/scrape/text/<slug>.txt` |
| Full-page screenshots of live pages (layout reference) | `SCRATCH/shots/<slug>.png` |
| Raw HTML if you need structure | `SCRATCH/scrape/html/<slug>.html` |
| Site images (logos, icons, photos from live site) | `public/images/site/` (date prefix stripped from WP filenames) |
| PDFs linked from the site | `public/downloads/` |
| Brand logos | `public/images/brand/logo-horizontal-color.png` (header), `public/images/site/CTG-Federal-logo-footer.png` (white, footer), `emblem-*.png` |
| Brand hex motif | `public/images/brand/Hexagons-gradient-CTG_Federal.png`, `Hexagons-gradient-White.png` |
| Brand line graphics | `public/images/brand/Line-*.png` |
| Solution icons (black SVG) | `public/images/icons/` |
| Accolade badges | `public/images/site/` (2026 GPTW badge, Fortune, ISO 9001, CRN Tech Elite 250 2026, CRN SP500 2026) + `public/images/accolades/` |
| Stock photos | `public/images/photos/` |
| AI-generated brand photos | `public/images/generated/` (hero.png, service-*.png, about-team.png, culture.png, warehouse.png, customers.png, contracts.png) |
| Headshots | `public/images/site/Brian-Reynolds-profile.jpg`, `Dennis-Yoon-profile.jpg`, `Brad-Baker-profile.jpg`, `Clay-Goldberg_BW_sq.png` |
| Global CSS tokens (already written) | `src/styles/global.css` |
| Brand rules | Georgia display, Roboto body, Oswald eyebrows. Navy #002550, Yale #003B82, Royal #0055BC, Azure #0073FE accent. No emoji, no exclamation marks, no purple, no illustrations/blobs. Restrained motion. Crisp radii (6px buttons, 10px cards). |

`SCRATCH` = `/private/tmp/claude-501/-Users-joshschultz-Projects-ctg-federal-site/066db006-a66f-4996-a4af-3ba6d0f7e713/scratchpad`

Slug mapping: URL path with `/` replaced by `__`. Home is `home`. e.g. `partners/netapp` → `partners__netapp.txt`.

## Content rules

1. Keep the live site's copy. Every heading, paragraph, list item, stat, quote, address, ID, and link on a page must appear on the rebuilt page, in the same order.
2. Light professional polish only: fix typos (e.g. "Architechture" → "Architecture", "Goveernment"), remove exclamation marks ("Let's connect!" → "Let's connect."), fix obviously wrong alt text (many partner logos say "VMWare Partner Logo"; use the real name), fix `contact@ctgnational.com` → `contact@ctgfederal.com` on the Customers page, keep "Cohesive Technology Group company™".
3. Do not add marketing copy, new sections, or new CTAs that are not on the live page. Do not invent stats.
4. Internal links: root-relative with trailing slash (`/about/`). Nav item "Cloud & Infrastructure" points to `/hybrid-cloud/`, "Networking" to `/advanced-networking/`, "History" to `/timeline/`.
5. PDF links: point at `/downloads/<filename>` (files already in `public/downloads/`). If a PDF referenced on a page is missing from `public/downloads/`, link to the live URL on www.ctgfederal.com and note it in your report.
6. External links (LinkedIn, greatplacetowork.com, crn.com, orders.ctgfederal.com, ctgnational.com, maps) open in a new tab with `rel="noopener"`.

## Design direction (modernize, but stay the same site)

- Full-bleed hero on home (generated `hero.png`) with brand gradient overlay; H1 in Georgia white; one primary button.
- Interior pages: `PageHero` — navy/gradient band with hex motif at low opacity, eyebrow + H1 + intro paragraph. Optional right-side image.
- Section rhythm: white → subtle gray → navy accents. Generous whitespace. Max content width 1200px; prose capped at 72ch.
- Cards: white, 1px border, 10px radius, navy-tinted shadow on hover, 2px lift.
- Service cards: image top (4:3, object-fit cover), title "Transform with Modern Infrastructure" style, azure accent bar.
- Logo grids: grayscale logos at 70% opacity, full color on hover; consistent tile size; `object-fit: contain`.
- Stats bar: 6 stats on navy background; big number in Oswald, label in Roboto small caps.
- Testimonials: Georgia italic quote, attribution in Oswald eyebrow style.
- Forms: Netlify Forms (see below). Stacked labels, 6px radius inputs, azure focus ring, primary button.
- Nav: white header, logo left, 4 top-level items with dropdowns (hover on desktop, click on mobile), "Contact" as a navy button on the right. Thin utility bar above with "CTG Federal, a Cohesive Technology Group company™" and Contracts / Tech Support / Resources links. Sticky header with subtle shadow on scroll. Mobile: hamburger → full-height drawer.
- Footer: navy. Row 1: white logo + "a Cohesive Technology Group company®" + accolade badges. Row 2: DUNS/UEI/Cage/NAICS block, link columns, address/phone/email, LinkedIn. Row 3: Fortune license line + "CTG Federal © 2026 | Terms & Conditions | Privacy Policy".
- No JS frameworks. Vanilla JS in `<script>` tags only where needed (nav toggle, accordions, partner filter, tabs).

## Architecture

```
src/
  layouts/BaseLayout.astro        head/SEO, fonts, global.css, skip link, Header, Footer, JSON-LD Organization
  components/
    Header.astro                  utility bar + main nav + mobile drawer
    Footer.astro
    PageHero.astro                props: eyebrow?, title, intro?, image?, align?
    Section.astro                 props: tone ('white'|'subtle'|'muted'|'navy'|'yale'|'gradient'), tight?, hex?, id?
    StatsBar.astro                reads src/data/stats.ts
    ServicesGrid.astro            reads src/data/services.ts
    LogoGrid.astro                props: logos[], cols?, heading?, link?
    CustomerLogos.astro           reads src/data/customers.ts
    Testimonials.astro            reads src/data/testimonials.ts (props: eyebrow?)
    CtaBand.astro                 props: title, text?, primary {label, href}, secondary?
    QuickFacts.astro              facts + compliance list + resource download links (used on about, customers, resources)
    ContactForm.astro             Netlify form; props: name, heading?, departmentSelect?, fields?
    Accordion.astro               details/summary based
    Button.astro                  props: href, variant, size
    IconTile.astro                props: src, hex?
    Breadcrumb.astro              optional; used on partner sub-pages
  data/
    site.ts        name, tagline, address, phone, email, linkedin, duns, uei, cage, naics, tin
    nav.ts         main nav tree + utility links + footer columns
    stats.ts       6 stats
    services.ts    6 services: slug, navLabel, title, verb ("Transform with"), tagline, condensed, expanded, image, icon, capabilities[]
    partners.ts    strategic[] (23 logos), all[] (name, logo, solutions[]), featured pages
    customers.ts   7 agency logos
    testimonials.ts
    quickFacts.ts  facts, compliance[], downloads[]
  pages/
    index.astro                        home
    about.astro, culture.astro, timeline.astro, philanthropy.astro, careers.astro, warehouse.astro, conference.astro
    solutions.astro
    modern-infrastructure.astro, hpc-ai-ml-genai.astro, cybersecurity.astro, advanced-networking.astro,
    hybrid-cloud.astro, unified-communications-contact-center.astro
    partners/index.astro, partners/[commvault|cohesity|netapp|nvidia|dell|vmware-by-broadcom|cisco].astro
    customers.astro, when-to-engage.astro, online-status-tool.astro, procurement-options.astro, contacts.astro
    contracts.astro, ites-4h.astro, nasa-sewp-v.astro, resources.astro, techsupport.astro, payment.astro
    privacy-policy.astro, terms-and-conditions.astro
    thank-you.astro                    Netlify form success page
    404.astro
```

Astro config: `site: https://www.ctgfederal.com`, `trailingSlash: 'always'`, sitemap integration. Output static.

## Netlify Forms

```html
<form name="contact" method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <p class="visually-hidden"><label>Do not fill this out: <input name="bot-field" /></label></p>
  ...
</form>
```

Form names: `contact` (Contact page, with department select), `become-a-customer` (Customers page),
`tech-support` (Tech Support page), `when-to-engage-sales|ops|solutions|nurture` (When to Engage page, one per team),
`order-status-nurture` (Online Status Tool), `payment-inquiry` if the Payment page has a form.
Keep the exact field set from the live page (Name, Email, Telephone, department select options, Message).

## SEO per page

`BaseLayout` takes `title` and `description`. Use the live page `<title>` and meta description from the top of each `.txt` file. If the live page has no description, write one sentence in brand voice.

## Verification

Each page agent must: run `npm run build` (must exit 0), then `npx astro check` is optional. Then open the built HTML in `dist/<slug>/index.html` and confirm every heading and paragraph from the source `.txt` is present (a quick grep of 3–5 distinctive phrases is fine). Report what you polished and anything missing.
