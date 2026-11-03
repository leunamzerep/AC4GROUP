// Eyebrow con raya dorada a la izquierda (y a la derecha si `both`).
export default function Eyebrow({ children, both = false }: { children: string; both?: boolean }) {
  const rule = <span aria-hidden="true" className="h-0.5 w-6 flex-none rounded-sm bg-gold-500" />
  return (
    <span className="ac4-eyebrow inline-flex items-center gap-3 leading-normal">
      {rule}
      {children}
      {both && rule}
    </span>
  )
}
