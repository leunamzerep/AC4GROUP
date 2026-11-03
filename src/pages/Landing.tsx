import { useState } from 'react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import WhatsAppFab from '../components/layout/WhatsAppFab'
import { useI18n } from '../i18n'

export default function Landing() {
  const { t } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative min-h-full overflow-x-clip bg-night-950 text-text-primary">
      <Header menuOpen={menuOpen} onMenuChange={setMenuOpen} />
      <main>
        {/* TEMPORAL (fase 3): bloques vacíos para probar header, anclas y FAB. Las secciones reales llegan en la fase 4. */}
        <section id="inicio" className="ac4-section pt-40">
          <div className="ac4-container flex flex-col gap-6">
            <span className="ac4-eyebrow">Fase 3 · Layout</span>
            <h1 className="ac4-h1">Layout base</h1>
            <div data-cta className="flex gap-3">
              <a className="ac4-btn ac4-btn--primary ac4-btn--lg ac4-btn--shimmer" href="#paquetes">CTA de prueba</a>
            </div>
          </div>
        </section>
        {t.nav.items.map((item) => (
          <section key={item.id} id={item.id} className="ac4-section min-h-[80vh] border-t border-white/10">
            <div className="ac4-container">
              <h2 className="ac4-h2">{item.label}</h2>
            </div>
          </section>
        ))}
      </main>
      <Footer />
      <WhatsAppFab hidden={menuOpen} />
    </div>
  )
}
