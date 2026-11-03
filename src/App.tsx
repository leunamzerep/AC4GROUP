// Página temporal de la fase 2: solo comprueba tokens, fuentes y Tailwind.
// Se reemplaza por la landing en las fases 3 y 4.
export default function App() {
  return (
    <main className="ac4-container ac4-section flex flex-col gap-6">
      <span className="ac4-eyebrow">Fase 2 · Setup</span>
      <h1 className="ac4-h1">
        Publicidad que se mide en <span className="ac4-text-gold-gradient">resultados</span>
      </h1>
      <p className="ac4-lead max-w-[52ch]">
        Prueba de fuentes con tildes y eñe: áéíóú ÁÉÍÓÚ ñÑ ¿¡ — Manrope y Oswald alojadas localmente.
      </p>
      <div className="flex flex-wrap gap-3">
        <a className="ac4-btn ac4-btn--primary ac4-btn--lg" href="#">Diagnóstico gratuito</a>
        <a className="ac4-btn ac4-btn--outline ac4-btn--lg" href="#">Ver paquetes</a>
      </div>
      <p className="font-numeric text-5xl text-gold-500">$1.000 COP</p>
      <div className="h-12 rounded-card border border-blue-300 bg-night-800" />
    </main>
  )
}
