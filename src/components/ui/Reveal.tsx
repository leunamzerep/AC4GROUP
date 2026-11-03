import type { ReactNode } from 'react'

// PENDIENTE (fase 5): animación de aparición al hacer scroll con Motion.
// Por ahora solo envuelve el contenido, para que las secciones ya lo usen.
export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}
