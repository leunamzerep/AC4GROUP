import { useI18n } from '../i18n'
import Badge from '../components/ui/Badge'
import Icon from '../components/ui/Icon'
import type { LucideName } from '../components/ui/iconData'
import SectionHeader from '../components/ui/SectionHeader'

type BadgeVariant = 'gold' | 'gold-outline' | 'blue' | 'neutral' | 'light'

export default function Why() {
  const { t } = useI18n()
  const w = t.why
  return (
    <section id="por-que" className="ac4-section bg-night-950">
      <div className="ac4-container flex flex-col gap-[clamp(36px,4vw,56px)]">
        <SectionHeader eyebrow={w.eyebrow} title={w.title} />
        <div className="ac4-bento">
          {w.items.map((item, i) => (
            <article key={item.title} className={`ac4-card ac4-card--interactive ${'wide' in item && item.wide ? 'span-4' : 'span-2'}`}>
              <div className="mb-2 flex items-start justify-between">
                <span className="ac4-card__icon">
                  <Icon name={item.icon as LucideName} size={22} />
                </span>
                <span className="ac4-card__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="ac4-card__title">{item.title}</h3>
              <p className="ac4-card__body">{item.body}</p>
            </article>
          ))}
        </div>
        <ul className="flex flex-wrap gap-2.5">
          {w.badges.map((b) => (
            <li key={b.label}>
              <Badge variant={b.variant as BadgeVariant} icon={b.icon as LucideName}>
                {b.label}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
