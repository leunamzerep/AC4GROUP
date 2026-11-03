import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { whatsappUrl } from '../content/site'
import { useI18n } from '../i18n'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'

const GOLD_INDEX = 1

// Paquetes en orden fijo: Platinum, Gold (recomendado), Black.
// Carrusel Embla por debajo de 1024px con Gold centrado al cargar; 3 columnas desde 1024px.
export default function Packages() {
  const { t } = useI18n()
  const p = t.packages
  const wa = whatsappUrl(t.whatsappMessage)
  const [emblaRef, embla] = useEmblaCarousel({
    align: 'center',
    startIndex: GOLD_INDEX,
    containScroll: false,
    breakpoints: { '(min-width: 1024px)': { active: false } },
  })
  const [selected, setSelected] = useState(GOLD_INDEX)
  const [isCarousel, setIsCarousel] = useState(false)

  useEffect(() => {
    if (!embla) return
    const sync = () => {
      setSelected(embla.selectedScrollSnap())
      setIsCarousel(embla.internalEngine().options.active)
    }
    sync()
    embla.on('select', sync).on('reInit', sync)
    return () => {
      embla.off('select', sync).off('reInit', sync)
    }
  }, [embla])

  const goTo = useCallback((i: number) => embla?.scrollTo(i), [embla])

  return (
    <section id="paquetes" className="ac4-section overflow-hidden bg-night-950">
      <div aria-hidden="true" className="pointer-events-none absolute top-[38%] left-1/2 h-[420px] w-[min(900px,90vw)] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(217,169,72,.10),transparent_70%)]" />
      <div className="ac4-container relative flex flex-col gap-[clamp(32px,4vw,48px)]">
        <SectionHeader eyebrow={p.eyebrow} title={p.title} lead={p.lead} center />

        <div>
          <div className="ac4-plans__viewport" ref={emblaRef} role="region" aria-roledescription="carousel" aria-label={p.regionLabel}>
            <RevealGroup className="ac4-plans__track">
              {p.plans.map((plan, i) => {
                const gold = plan.id === 'gold'
                return (
                  // El wrapper anima la aparición; la tarjeta conserva su transform de hover/elevación.
                  <RevealItem key={plan.id} className="ac4-plans__slide">
                  <article
                    className={`ac4-plan ac4-plan--${plan.id} h-full`}
                    aria-roledescription={isCarousel ? 'slide' : undefined}
                    aria-label={isCarousel ? `${i + 1} / ${p.plans.length}: ${plan.name}` : undefined}
                  >
                    <div className="ac4-plan__head">
                      <h3 className="ac4-plan__name">{plan.name}</h3>
                      {gold && (
                        <Badge variant="gold" icon="award">
                          {p.recommended}
                        </Badge>
                      )}
                    </div>
                    <div className="ac4-plan__price">
                      <Badge variant={plan.id === 'platinum' ? 'light' : gold ? 'gold-outline' : 'neutral'} className="self-start">
                        {p.from}
                      </Badge>
                      <div className="ac4-plan__amount">
                        <strong>${plan.price}</strong>
                        <span>{p.perMonth}</span>
                      </div>
                    </div>
                    <ul className="ac4-plan__list">
                      {'includesPrevious' in plan && (
                        <li className="ac4-plan__item">
                          <span className="ac4-plan__check">
                            <Icon name="check" size={18} strokeWidth={2.5} />
                          </span>
                          <strong className="text-white">{plan.includesPrevious}</strong>
                        </li>
                      )}
                      {plan.features.map((f) => (
                        <li key={f} className="ac4-plan__item">
                          <span className="ac4-plan__check">
                            <Icon name="check" size={18} strokeWidth={2.5} />
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="ac4-plan__foot" data-cta>
                      {plan.id === 'platinum' ? (
                        // Platinum es claro: botón oscuro para contraste (como en el diseño).
                        <Button href={wa} target="_blank" block iconRight="arrow-right" variant="ghost" className="bg-night-900 text-white shadow-[var(--inset-highlight)] hover:bg-night-700 hover:text-white">
                          {plan.cta}
                        </Button>
                      ) : (
                        <Button href={wa} target="_blank" block iconRight="arrow-right" variant={gold ? 'primary' : 'outline'}>
                          {plan.cta}
                        </Button>
                      )}
                    </div>
                  </article>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </div>

          {isCarousel && (
            <div className="-mt-4 flex justify-center gap-1" role="group" aria-label={p.dotsLabel}>
              {p.plans.map((plan, i) => (
                <button
                  key={plan.id}
                  type="button"
                  className={`ac4-plans__dot ${plan.id === 'gold' ? 'is-gold' : ''}`}
                  aria-label={plan.name}
                  aria-current={selected === i ? 'true' : undefined}
                  onClick={() => goTo(i)}
                >
                  <span />
                </button>
              ))}
            </div>
          )}
        </div>

        <ul className="ac4-notes mx-auto grid w-full max-w-[960px] gap-x-8 gap-y-2.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
          {p.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
