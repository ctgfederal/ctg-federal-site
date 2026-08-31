// Dev-only: serve dist/ with the REAL headers from netlify.toml so the CSP can
// be verified before deploy. Parsing netlify.toml here also validates its TOML
// syntax (Netlify would silently ignore a malformed file).
//   node scripts/csp-verify-server.mjs        # then curl -I http://localhost:8787/
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { parse } from 'smol-toml';

const ROOT = new URL('../dist/', import.meta.url).pathname;
const PORT = process.env.PORT || 8787;

const toml = parse(await readFile(new URL('../netlify.toml', import.meta.url), 'utf8'));
const globalHeaders = (toml.headers ?? []).find((h) => h.for === '/*')?.values ?? {};
console.log('Parsed netlify.toml OK. /* headers:\n', globalHeaders);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

createServer(async (req, res) => {
  for (const [k, v] of Object.entries(globalHeaders)) res.setHeader(k, v);
  let p = normalize(decodeURIComponent(req.url.split('?')[0]));
  let file = join(ROOT, p);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  else if (!existsSync(file) && existsSync(file + '/index.html')) file = join(file, 'index.html');
  if (!existsSync(file)) { res.statusCode = 404; res.end('404'); return; }
  res.setHeader('Content-Type', TYPES[extname(file)] || 'application/octet-stream');
  res.end(await readFile(file));
}).listen(PORT, () => console.log(`Serving dist/ with netlify.toml headers on http://localhost:${PORT}`));
