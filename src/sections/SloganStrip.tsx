import Slogan from '../components/ui/Slogan'

// Franja con el slogan entre el hero y Servicio.
export default function SloganStrip() {
  return (
    <div className="border-y border-[var(--border-subtle)] bg-[linear-gradient(90deg,rgba(0,17,60,0),rgba(0,17,60,.45),rgba(0,17,60,0))]">
      <div className="ac4-container flex justify-center py-[22px]">
        <Slogan className="text-[clamp(13px,1.2vw,15px)]" />
      </div>
    </div>
  )
}
