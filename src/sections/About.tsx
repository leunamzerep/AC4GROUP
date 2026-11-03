import { WAVE } from '../content/images'
import { useI18n } from '../i18n'
import Eyebrow from '../components/ui/Eyebrow'
import Logo from '../components/ui/Logo'
import Reveal from '../components/ui/Reveal'

export default function About() {
  const { t } = useI18n()
  const a = t.about
  return (
    <section id="nosotros" className="ac4-section ac4-texture-dots overflow-hidden border-y border-[var(--border-subtle)]">
      <div className="ac4-container grid items-center gap-[clamp(40px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        <Reveal>
          <div className="flex flex-col gap-7">
            <Eyebrow>{a.eyebrow}</Eyebrow>
            <h2 className="text-[clamp(3rem,1.6rem+5.6vw,6.5rem)] leading-[.98] tracking-[-.01em]">
              {a.titleLine1} <span className="text-blue-300">=</span>
              <br />
              <span className="ac4-text-gold-gradient">{a.titleLine2}</span>
            </h2>
            <span className="ac4-rule-gold" />
            <p className="ac4-lead max-w-[54ch]">{a.body}</p>
          </div>
        </Reveal>
        <div aria-hidden="true" className="relative aspect-[5/4] overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[image:var(--gradient-night)]">
          <img
            src={WAVE.src}
            srcSet={WAVE.srcSet}
            sizes="(min-width: 1024px) 600px, 100vw"
            width={WAVE.width}
            height={WAVE.height}
            alt=""
            loading="lazy"
            decoding="async"
            className="ac4-about-wave absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute bottom-[22px] left-6 flex items-center gap-3">
            <Logo variant="icon" height={28} />
            <span className="ac4-eyebrow tracking-[.18em] text-text-secondary">{a.location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
