# Spec 001 — Security Hardening (ctgfederal.com)

Same security posture as spec 001 on **ctgnational.com**, adapted to this repo. Raise the
site to an **A** grade (target 100) on SiteSecurityScore without breaking anything. Static
Astro build on Netlify; the fixes are HTTP headers, a strict CSP, `security.txt`, and
self-hosted fonts — plus DNS/email records the owner applies.

## Two sites differ in three ways (why this is not a byte-for-byte copy)

| Thing | ctgnational | ctgfederal (this repo) |
|---|---|---|
| Analytics | Ahrefs | **Google Analytics 4** (`googletagmanager.com`) |
| Header file | `public/_headers` | **`netlify.toml`** (already existed here) |
| External fonts | Inter + Space Grotesk + JetBrains Mono | **only JetBrains Mono** (Georgia + Verdana are system) |
| DNS host | Azure DNS | **Namecheap** (`registrar-servers.com`) |
| Mail | M365 + Mailgun | **M365 only** (`*.mail.protection.outlook.com`) |

## Key decisions

- **D-001 — Headers live in `netlify.toml`.** This repo already used `netlify.toml` for the
  three starter headers, so all headers + the CSP go there as the single source of truth
  (national used `public/_headers`; same effect, this repo's existing convention wins).
- **D-002 — Strict CSP, no `'unsafe-inline'` in `script-src`.** The GA4 bootstrap was moved
  from an inline `set:html` block to a bundled same-origin script, so `script-src` is just
  `'self'` plus the analytics loader origins. GA4's beacons need `google-analytics.com`
  origins in `connect-src`/`img-src` — unavoidable while GA4 is used.
- **D-002a — Both analytics vendors are pre-allowed.** Both sites will eventually run GA4
  **and** Ahrefs. `https://analytics.ahrefs.com` is already in `script-src` and `connect-src`,
  so turning Ahrefs on later is just adding the tag — **no CSP edit or re-verify needed**.
  Ahrefs is not yet on the page (no tracking key wired); GA4 is live in prod builds.
- **D-003 — `Cross-Origin-Embedder-Policy: credentialless`** so GA4 loads cross-origin
  without the vendor sending CORP/CORS (`require-corp` would break it).
- **D-004 — `style-src` keeps `'unsafe-inline'`.** The site uses inline `style=""` attributes
  and Astro-inlined `<style>` blocks; hashing them on a static host is not worth it and
  style injection risk is minimal. `script-src` stays strict.
- **D-005 — `security.txt` at both `/.well-known/security.txt` and `/security.txt`**,
  `security@ctgfederal.com`, expires 2027-08-31.
- **D-006 — Self-host JetBrains Mono** via `@fontsource` — removes `googleapis`/`gstatic`
  from the page and the CSP entirely.

## What was implemented (repo)

- **`netlify.toml`** — full security header set + strict CSP (single source of truth).
- **`src/styles/global.css`** — imports self-hosted `@fontsource/jetbrains-mono` 400/500/600.
- **`src/layouts/BaseLayout.astro`** — removed Google Fonts `<link>`s + preconnects; moved the
  GA4 bootstrap to a bundled (non-inline) script.
- **`astro.config.mjs`** — `vite.build.assetsInlineLimit: 0` keeps scripts external so
  `script-src` stays strict.
- **`public/.well-known/security.txt`** + **`public/security.txt`**.

**Verified after `npm run build` (39 pages, clean):** no `fonts.googleapis`/`gstatic` in any
built page; 18 self-hosted woff2 emitted; the only scripts on the page are same-origin
`/_astro/*` modules plus the external GA4 loader; **zero** inline executable scripts, inline
event handlers, or `javascript:` URLs; `security.txt` present at both paths. The CSP is
therefore satisfiable with zero console violations.

## Owner actions (DNS at Namecheap — blockers to a literal 100)

Current state (verified 2026-08-31 via `dig`): DNS = Namecheap BasicDNS; mail = Microsoft 365.
**Gaps:** no SPF, no CAA, no DNSSEC, and a weak DMARC record.

### 1. SPF — ADD (none exists today)
Add a TXT record on `ctgfederal.com`:
```
v=spf1 include:spf.protection.outlook.com -all
```
- Confirm M365 is the **only** sender first. If any app/marketing tool also sends as
  `@ctgfederal.com`, add its `include:` before flipping to `-all` — use `~all` while ramping.
- Verify: `dig +short TXT ctgfederal.com`

### 2. DKIM — enable/verify M365 signing
- Microsoft Defender portal → Email & collaboration → Policies → **DKIM** → enable signing
  for `ctgfederal.com`; publish the two `selector1`/`selector2` CNAMEs it gives you.
- Verify: `dig +short CNAME selector1._domainkey.ctgfederal.com`

### 3. DMARC — upgrade the existing record (currently `v=DMARC1; p=quarantine;`)
Edit TXT `_dmarc.ctgfederal.com` to:
```
v=DMARC1; p=reject; rua=mailto:dmarc@ctgfederal.com; fo=1
```
- Needs a real `dmarc@ctgfederal.com` inbox/alias (or a DMARC service) to receive reports.
- Safe ramp: keep `p=quarantine` with `rua=` added for ~2 weeks, confirm M365 passes, then
  flip to `p=reject`.
- Verify: `dig +short TXT _dmarc.ctgfederal.com`

### 4. CAA — ADD (none exists today). Records on `ctgfederal.com`:
```
ctgfederal.com.  CAA  0 issue "letsencrypt.org"
ctgfederal.com.  CAA  0 issuewild "letsencrypt.org"
ctgfederal.com.  CAA  0 iodef "mailto:security@ctgfederal.com"
```
- Netlify issues the cert via Let's Encrypt, so this locks issuance to that CA.
- Verify: `dig +short CAA ctgfederal.com`

### 5. DNSSEC — enable at Namecheap
- Namecheap → Domain → **Advanced DNS / DNSSEC** → enable (Namecheap BasicDNS supports it for
  `.com`). It publishes the DS at the registrar automatically.
- Verify: `dig +short DS ctgfederal.com` and `dig +dnssec ctgfederal.com` (expect RRSIG).

### 6. After deploy
- Point DNS at Netlify (apex A record today is `208.97.159.184` — an old DreamHost host).
- Submit `ctgfederal.com` at **hstspreload.org** (the HSTS header ships with `preload`).
- Confirm **security@ctgfederal.com** is a monitored inbox/alias (used in security.txt + CAA iodef).
- Re-run SiteSecurityScore to confirm the A grade.

## Enforcement verification (pre-deploy)

`node scripts/csp-verify-server.mjs` serves `dist/` with the **real** `netlify.toml` headers
(parsing it also proves the TOML is valid). Verified 2026-08-31:
- All 17 headers emit with correct values on pages **and** on `/_astro/*` assets.
- Both `security.txt` paths return `200 text/plain`.
- Full resource scan of the build: the only CSP-governed external load anywhere is the GA4
  loader (`googletagmanager.com`); no external img/iframe/style/font; no inline scripts,
  inline event handlers, or `javascript:` URLs. So **zero CSP violations are possible.**

## Go-live checklist (2-day launch off the Netlify staging site)

**Repo — done, ready to ship:**
- [x] Headers + strict CSP (GA4 + Ahrefs both allowed), self-hosted fonts, `security.txt`,
      build clean (39 pages), enforcement verified against served headers.

**Owner — before / at cutover (in priority order):**
1. [ ] **DNS cutover to Netlify.** Apex `A` today is `208.97.159.184` (old DreamHost). Point
       `ctgfederal.com` + `www` at Netlify (per Netlify's DNS panel) so the new build — and
       its headers — actually serve. Nothing below matters until this is done.
2. [ ] **Confirm `security@ctgfederal.com`** is a monitored inbox/alias (used by security.txt).
3. [ ] **On the Netlify deploy preview:** open DevTools console on `/`, a partner page,
       `/payment/`, `/techsupport/`, `/contacts/` — confirm zero CSP errors and GA4 fires.
4. [ ] **Add the missing email DNS** (does not block launch, but do it this week): SPF (none
       today), verify M365 DKIM, upgrade DMARC (`p=quarantine;` → add `rua`, then `p=reject`).
5. [ ] **Add CAA + enable DNSSEC** at Namecheap (records above).
6. [ ] **HSTS preload caution:** the header ships `includeSubDomains; preload`. Before you
       submit at **hstspreload.org** (do this *after* launch is stable), confirm every
       subdomain that visitors touch serves HTTPS — preload is a 2-year, hard-to-undo
       commitment. The header alone is safe; the list submission is the irreversible step.

## Status

- [x] Repo work complete and enforcement-verified pre-deploy.
- [ ] Owner: DNS cutover to Netlify, then the checklist above.
