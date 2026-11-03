import Reveal from './Reveal'

type Props = { eyebrow: string; title: string; lead?: string; center?: boolean; titleId?: string }

// Encabezado de sección: eyebrow dorado + H2 + texto de apoyo opcional.
export default function SectionHeader({ eyebrow, title, lead, center = false, titleId }: Props) {
  return (
    <Reveal>
      <header className={`ac4-sh ${center ? 'ac4-sh--center' : ''}`}>
        <span className="ac4-eyebrow ac4-sh__eyebrow">{eyebrow}</span>
        <h2 id={titleId} className="ac4-sh__title">
          {title}
        </h2>
        {lead && <p className="ac4-lead">{lead}</p>}
      </header>
    </Reveal>
  )
}
