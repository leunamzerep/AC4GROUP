import { useState } from 'react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import WhatsAppFab from '../components/layout/WhatsAppFab'
import About from '../sections/About'
import Case from '../sections/Case'
import Contact from '../sections/Contact'
import Hero from '../sections/Hero'
import Packages from '../sections/Packages'
import Process from '../sections/Process'
import Service from '../sections/Service'
import SloganStrip from '../sections/SloganStrip'
import Why from '../sections/Why'

// Landing one-page. Orden de secciones fijado por el diseño.
export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative min-h-full overflow-x-clip bg-night-950 text-text-primary">
      <Header menuOpen={menuOpen} onMenuChange={setMenuOpen} />
      <main>
        <Hero />
        <SloganStrip />
        <Service />
        <Process />
        <Packages />
        <Case />
        <Why />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab hidden={menuOpen} />
    </div>
  )
}
