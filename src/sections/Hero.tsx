import { WAVE } from '../content/images'
import { whatsappUrl } from '../content/site'
import { useI18n } from '../i18n'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Eyebrow from '../components/ui/Eyebrow'
import Icon from '../components/ui/Icon'
import MiniBars from '../components/ui/MiniBars'

const BARS = [34, 46, 40, 58, 52, 68, 62, 76, 72, 90]

export default function Hero() {
  const { t } = useI18n()
  const h = t.hero
  return (
    <section id="inicio" className="relative isolate overflow-hidden pt-[clamp(128px,14vw,184px)] pb-[clamp(64px,7vw,104px)]">
      {/* Aurora de fondo (solo hero y contacto). La animación lenta llega en la fase 5. */}
      <div aria-hidden="true" className="ac4-aurora-hero absolute -inset-x-[10%] -top-[20%] bottom-0 -z-30" />
      <div aria-hidden="true" className="ac4-texture-grid ac4-hero-grid absolute inset-0 -z-20" />

      <div className="ac4-container grid items-center gap-[clamp(40px,5vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
        {/* Entrada en CSS (ver .ac4-hero-in en site.css): el hero no espera a JavaScript. */}
        <div>
          <div className="ac4-hero-in flex flex-col items-start gap-6">
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <h1 className="max-w-[14ch] text-[clamp(2.6rem,1.4rem+4.4vw,4.75rem)] leading-[1.02] tracking-[-0.005em]">
              {h.titleBefore} <span className="ac4-text-gold-gradient">{h.titleHighlight}</span>
            </h1>
            <p className="ac4-lead max-w-[52ch]">{h.lead}</p>
            <div data-cta className="mt-2 flex flex-wrap gap-3">
              <Button href={whatsappUrl(t.whatsappMessage)} target="_blank" size="lg" shimmer icon="whatsapp">
                {h.ctaPrimary}
              </Button>
              <Button href="#paquetes" size="lg" variant="outline" iconRight="arrow-right">
                {h.ctaSecondary}
              </Button>
            </div>
            <ul className="ac4-small flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {h.checks.map((c, i) => (
                <li key={c} className="inline-flex items-center gap-1.5 text-text-secondary">
                  {i > 0 && (
                    <span aria-hidden="true" className="mr-1.5 text-text-muted">
                      ·
                    </span>
                  )}
                  <Icon name="check" size={16} className="text-blue-300" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual decorativo: onda de marca + tablero ilustrativo (cifras de ejemplo, no de clientes). */}
        <div aria-hidden="true" className="ac4-hero-visual relative aspect-square w-full max-w-[560px] justify-self-center">
          <img
            src={WAVE.src}
            srcSet={WAVE.srcSet}
            sizes="(min-width: 1024px) 800px, 140vw"
            width={WAVE.width}
            height={WAVE.height}
            alt=""
            fetchPriority="high"
            className="ac4-hero-wave absolute -top-[6%] -right-[30%] -bottom-[6%] -left-[12%] h-[112%] w-[142%] max-w-none object-cover opacity-95"
          />
          <div className="ac4-hero-dash absolute bottom-[4%] left-0 flex w-[min(100%,360px)] flex-col gap-3.5 rounded-[20px] p-[18px]">
            <div className="flex items-center justify-between gap-3">
              <span className="ac4-dash__title">
                <span className="ac4-dash__live" />
                {h.dashboard.title}
              </span>
              <Badge>{h.dashboard.badge}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {h.dashboard.kpis.map((k) => (
                <div key={k.label} className={`ac4-dash__kpi ${'gold' in k && k.gold ? 'is-gold' : ''}`}>
                  <span>{k.label}</span>
                  <strong>{k.value}</strong>
                </div>
              ))}
            </div>
            <MiniBars heights={BARS} className="h-14 gap-[5px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
