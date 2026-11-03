import type { CSSProperties } from 'react'
import { useI18n } from '../i18n'
import Icon from '../components/ui/Icon'
import type { LucideName } from '../components/ui/iconData'
import SectionHeader from '../components/ui/SectionHeader'

// "Cómo trabajamos": línea de tiempo con haz animado (vertical en móvil, horizontal desde 1024px).
export default function Process() {
  const { t } = useI18n()
  const p = t.process
  return (
    <section id="proceso" className="ac4-section ac4-bg-night border-y border-[var(--border-subtle)] [--bg-section:#05081B]">
      <div className="ac4-container flex flex-col gap-[clamp(40px,5vw,64px)]">
        <SectionHeader eyebrow={p.eyebrow} title={p.title} center />
        <ol className="ac4-process">
          {p.steps.map((step, i) => (
            <li key={step.title} className="ac4-process__step" style={{ '--i': i } as CSSProperties}>
              <span className="ac4-process__rail" aria-hidden="true" />
              <span className="ac4-process__node">
                <Icon name={step.icon as LucideName} size={22} />
              </span>
              <div className="ac4-process__text">
                <span className="ac4-process__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="ac4-process__title">{step.title}</h3>
                <p className="ac4-process__desc">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
