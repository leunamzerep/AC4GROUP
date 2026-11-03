import { SITE } from './content/site'
import { CONTENT, absoluteUrl, type Lang, type PageKey } from './i18n'

// Etiquetas del <head> de cada página prerenderizada: title, description, canonical,
// hreflang, Open Graph, Twitter Card y datos estructurados (JSON-LD).
// Los textos están en src/content/<idioma>.json → "seo".

export type RouteKey = PageKey | 'notFound'

const OG_IMAGE = { url: `${SITE.url}og-image-1200x630.jpg`, width: 1200, height: 630 }
const LOGO_URL = `${SITE.url}favicon.svg`

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function buildHead(lang: Lang, route: RouteKey): string {
  const t = CONTENT[lang]
  const seo = t.seo[route]
  const isHome = route === 'home'
  // Legales y 404 no se indexan (decisión de Manuel, fase 8).
  const index = isHome
  const tags: string[] = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}">`,
    `<meta name="robots" content="${index ? 'index, follow' : 'noindex, follow'}">`,
  ]

  if (route !== 'notFound') tags.push(`<link rel="canonical" href="${absoluteUrl(route, lang)}">`)
  // hreflang solo en páginas indexables (en las noindex no aporta y Google lo desaconseja).
  if (index) {
    tags.push(
      `<link rel="alternate" hreflang="es-CO" href="${absoluteUrl('home', 'es')}">`,
      `<link rel="alternate" hreflang="en" href="${absoluteUrl('home', 'en')}">`,
      `<link rel="alternate" hreflang="x-default" href="${absoluteUrl('home', 'es')}">`,
    )
  }

  if (isHome) {
    const home = t.seo.home
    const other: Lang = lang === 'es' ? 'en' : 'es'
    tags.push(
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="AC4 Group">`,
      `<meta property="og:title" content="${esc(home.ogTitle)}">`,
      `<meta property="og:description" content="${esc(home.ogDescription)}">`,
      `<meta property="og:url" content="${absoluteUrl('home', lang)}">`,
      `<meta property="og:locale" content="${t.seo.ogLocale}">`,
      `<meta property="og:locale:alternate" content="${CONTENT[other].seo.ogLocale}">`,
      `<meta property="og:image" content="${OG_IMAGE.url}">`,
      `<meta property="og:image:width" content="${OG_IMAGE.width}">`,
      `<meta property="og:image:height" content="${OG_IMAGE.height}">`,
      `<meta property="og:image:alt" content="${esc(t.seo.ogImageAlt)}">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${esc(home.ogTitle)}">`,
      `<meta name="twitter:description" content="${esc(home.ogDescription)}">`,
      `<meta name="twitter:image" content="${OG_IMAGE.url}">`,
      `<meta name="twitter:image:alt" content="${esc(t.seo.ogImageAlt)}">`,
      `<script type="application/ld+json">${JSON.stringify(jsonLd(lang)).replace(/</g, '\\u003c')}</script>`,
    )
  }
  return tags.join('\n    ')
}

// ProfessionalService sin dirección física (el servicio es 100 % remoto).
function jsonLd(lang: Lang) {
  const t = CONTENT[lang]
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}#organization`,
    name: 'AC4 Group',
    url: absoluteUrl('home', lang),
    logo: LOGO_URL,
    image: OG_IMAGE.url,
    description: t.seo.businessDescription,
    telephone: `+${SITE.whatsappNumber}`,
    email: SITE.email,
    areaServed: { '@type': 'City', name: 'Bogotá' },
    knowsLanguage: ['es', 'en'],
    sameAs: [SITE.instagram, SITE.facebook].filter(Boolean),
  }
}
