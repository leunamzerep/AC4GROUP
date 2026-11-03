import { useI18n } from '../i18n'
import Icon from '../components/ui/Icon'
import type { LucideName } from '../components/ui/iconData'
import MiniBars from '../components/ui/MiniBars'
import SectionHeader from '../components/ui/SectionHeader'

const BARS = [30, 42, 36, 50, 47, 58, 55, 66, 61, 74, 70, 82, 78, 94]
// CTR y CPC se resaltan en azul (son las métricas de clic).
const HIGHLIGHT = 5

export default function Service() {
  const { t } = useI18n()
  const s = t.service
  return (
    <section id="servicio" className="ac4-section bg-night-950">
      <div className="ac4-container flex flex-col gap-[clamp(36px,4vw,56px)]">
        <SectionHeader eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
        <div className="ac4-bento">
          {/* Ojo: no usar la clase "row-2" del DS; en Tailwind v4 significa grid-row: 2. */}
          <article className="ac4-card ac4-card--feature gap-4 md:col-span-4 md:row-span-2">
            <span className="ac4-card__icon">
              <Icon name="chart-column" size={22} />
            </span>
            <h3 className="ac4-card__title text-[clamp(1.5rem,1.2rem+1vw,2rem)]">{s.feature.title}</h3>
            <p className="ac4-card__body max-w-[56ch]">{s.feature.body}</p>
            <div aria-hidden="true" className="ac4-dash__chart mt-auto bg-[rgba(3,4,9,.45)]">
              <div className="ac4-dash__chart-head">
                <span>{s.feature.chartTitle}</span>
                <span>{s.feature.chartBadge}</span>
              </div>
              <MiniBars heights={BARS} className="h-[120px]" />
              <div className="flex flex-wrap gap-x-3.5 gap-y-1.5 font-numeric text-xs tracking-widest text-text-muted uppercase">
                {s.feature.metrics.map((m, i) => (
                  <span key={m} className={i >= HIGHLIGHT ? 'text-blue-300' : undefined}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </article>
          {s.items.map((item) => (
            <article key={item.title} className="ac4-card ac4-card--interactive span-2">
              <span className="ac4-card__icon">
                <Icon name={item.icon as LucideName} size={22} />
              </span>
              <h3 className="ac4-card__title">{item.title}</h3>
              <p className="ac4-card__body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
