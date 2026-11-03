import { whatsappUrl } from '../content/site'
import { CONTENT, pagePath } from '../i18n'
import Button from '../components/ui/Button'
import Logo from '../components/ui/Logo'

// 404 con estilo de marca. GitHub Pages la sirve para cualquier ruta inexistente,
// sin saber el idioma, así que muestra ambos (ES primero).
export default function NotFound() {
  const es = CONTENT.es.notFound
  const en = CONTENT.en.notFound
  return (
    <main className="relative isolate flex min-h-svh flex-col items-center justify-center gap-8 overflow-hidden px-[var(--gutter)] py-16 text-center">
      <div aria-hidden="true" className="ac4-aurora-cta absolute -inset-1/4 -z-10 opacity-60" />
      <a href={pagePath('home', 'es')} aria-label={CONTENT.es.nav.homeLabel}>
        <Logo variant="primary" height={72} />
      </a>
      <span className="ac4-eyebrow">{es.eyebrow}</span>
      <h1 className="ac4-h2 max-w-[18ch]">{es.title}</h1>
      <p className="ac4-lead max-w-[48ch]">
        {es.text}
        <br />
        <span lang="en" className="text-text-muted">
          {en.title}. {en.text}
        </span>
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href={pagePath('home', 'es')} size="lg" iconRight="arrow-right">
          {es.home}
        </Button>
        <Button href={pagePath('home', 'en')} size="lg" variant="outline" lang="en">
          {en.home}
        </Button>
        <Button href={whatsappUrl(CONTENT.es.whatsappMessage)} target="_blank" size="lg" variant="ghost" icon="whatsapp">
          {es.whatsapp}
        </Button>
      </div>
    </main>
  )
}
