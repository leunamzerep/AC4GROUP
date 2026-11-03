import { WAVE } from '../content/images'
import { SITE, whatsappUrl } from '../content/site'
import { useI18n } from '../i18n'
import Button from '../components/ui/Button'
import Eyebrow from '../components/ui/Eyebrow'

export default function Contact() {
  const { t } = useI18n()
  const c = t.contact
  return (
    <section id="contacto" className="ac4-section bg-night-950">
      <div className="ac4-container">
        <div className="ac4-cta gap-7 py-[clamp(64px,8vw,120px)]">
          <img
            className="ac4-cta__img opacity-[.42]"
            src={WAVE.src}
            srcSet={WAVE.srcSet}
            sizes="(min-width: 1280px) 1200px, 100vw"
            width={WAVE.width}
            height={WAVE.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
          {/* Aurora del CTA final. La animación lenta llega en la fase 5. */}
          <div aria-hidden="true" className="ac4-aurora-cta absolute -inset-1/4 -z-10" />
          <Eyebrow both>{c.eyebrow}</Eyebrow>
          <h2 className="ac4-cta__title">{c.title}</h2>
          <p className="ac4-cta__text text-night-100">{c.text}</p>
          <div data-cta className="flex w-full flex-col items-center gap-4">
            <Button href={whatsappUrl(t.whatsappMessage)} target="_blank" size="lg" shimmer icon="whatsapp">
              {c.whatsapp}
            </Button>
            <div className="flex flex-wrap justify-center gap-2.5">
              <Button href={`mailto:${SITE.email}`} variant="outline" icon="mail">
                {c.email}
              </Button>
              <Button href={SITE.instagram} target="_blank" variant="outline" icon="instagram">
                {c.instagram}
              </Button>
              {SITE.facebook && (
                <Button href={SITE.facebook} target="_blank" variant="outline" icon="facebook">
                  {c.facebook}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
