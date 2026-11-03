import { Fragment } from 'react'
import { AMAB_LOGO } from '../content/images'
import { SITE } from '../content/site'
import { useI18n } from '../i18n'
import Eyebrow from '../components/ui/Eyebrow'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'

// Caso real AMAB. Siempre con el aviso de que es un resultado puntual, no una garantía.
export default function Case() {
  const { lang, t } = useI18n()
  const c = t.case
  const value = new Intl.NumberFormat(lang === 'es' ? 'es-CO' : 'en-US').format(c.metricValue)
  return (
    <section id="caso" className="ac4-section ac4-bg-night border-y border-[var(--border-subtle)]">
      <div className="ac4-container">
        <Reveal>
          <article className="ac4-case bg-[radial-gradient(80%_120%_at_100%_0%,rgba(35,119,227,.22),transparent_60%),rgba(10,14,38,.9)]">
            <div className="ac4-case__client gap-[18px]">
              <Eyebrow>{c.eyebrow}</Eyebrow>
              <div className="flex items-center gap-4">
                <img
                  className="ac4-case__logo"
                  src={AMAB_LOGO.src}
                  width={AMAB_LOGO.width}
                  height={AMAB_LOGO.height}
                  alt={c.logoAlt}
                  loading="lazy"
                  decoding="async"
                />
                <h2 className="ac4-case__name">{c.client}</h2>
              </div>
              <p className="flex flex-wrap gap-x-2.5 gap-y-1 text-[15px] leading-normal text-text-secondary">
                {c.tags.map((tag, i) => (
                  <Fragment key={tag}>
                    {i > 0 && (
                      <span aria-hidden="true" className="text-text-muted">
                        ·
                      </span>
                    )}
                    <span>{tag}</span>
                  </Fragment>
                ))}
              </p>
              <a className="ac4-case__handle self-start font-bold" href={SITE.caseInstagram} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" brand size={16} />
                {c.instagram}
                <Icon name="arrow-up-right" size={16} />
                <span className="ac4-sr-only">{t.newTab}</span>
              </a>
            </div>

            <div className="ac4-case__metric gap-2.5 border-[var(--border-gold)] bg-[linear-gradient(180deg,rgba(217,169,72,.08),rgba(0,0,0,.4))]">
              <span className="text-[15px] font-bold tracking-[.14em] text-gold-300 uppercase">{c.metricPrefix}</span>
              <div className="ac4-case__value">
                {/* PENDIENTE (fase 5): Number Ticker animado. */}
                <span className="ac4-ticker">
                  {c.metricCurrencySymbol}
                  {value}
                </span>
                <span className="ac4-case__unit">{c.metricUnit}</span>
              </div>
              <p className="ac4-case__label">{c.metricLabel}</p>
              <p className="ac4-case__disclaimer mt-2">{c.disclaimer}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
