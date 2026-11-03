// Prerender (SSG): convierte la app en HTML estático, una página por ruta e idioma.
// Se ejecuta con `npm run build` después de compilar el cliente y el servidor:
//   1. vite build                 → dist/ (JS, CSS, imágenes y la plantilla index.html)
//   2. vite build --ssr ...       → dist-ssr/entry-server.js (función render)
//   3. node scripts/prerender.mjs → escribe dist/<ruta>/index.html, 404.html, sitemap.xml y robots.txt
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
const SITE_URL = 'https://leunamzerep.github.io/AC4GROUP/'

const { render, ROUTES } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const template = await readFile(join(dist, 'index.html'), 'utf8')

// Precarga de las fuentes latinas (las que se usan en el primer pantallazo).
const assets = await readdir(join(dist, 'assets'))
const fontPreloads = assets
  .filter((f) => /^(Oswald|Manrope)-Variable-latin-(?!ext-)[\w-]+\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/AC4GROUP/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ')

function page(lang, route) {
  const { html, head, htmlLang } = render(lang, route)
  return template
    .replace('<html lang="es-CO">', `<html lang="${htmlLang}">`)
    .replace('<!--app-head-->', `${fontPreloads}\n    ${head}`)
    .replace('<div id="root"></div>', `<div id="root" data-lang="${lang}" data-route="${route}">${html}</div>`)
}

for (const { page: route, lang, path } of ROUTES) {
  const out = join(dist, path, 'index.html')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, page(lang, route))
  console.log(`  ✓ /AC4GROUP/${path}`)
}
await writeFile(join(dist, '404.html'), page('es', 'notFound'))
console.log('  ✓ 404.html')

// Sitemap: solo páginas indexables (la landing ES y EN). Las legales llevan noindex.
const home = { es: SITE_URL, en: `${SITE_URL}en/` }
const alt = `
    <xhtml:link rel="alternate" hreflang="es-CO" href="${home.es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${home.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${home.es}"/>`
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${home.es}</loc>${alt}
  </url>
  <url>
    <loc>${home.en}</loc>${alt}
  </url>
</urlset>
`,
)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`)
console.log('  ✓ sitemap.xml, robots.txt')

await rm(ssrDir, { recursive: true, force: true })
