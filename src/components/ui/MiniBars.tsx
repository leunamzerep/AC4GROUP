// Barras decorativas de los gráficos ilustrativos. La última va en dorado.
export default function MiniBars({ heights, className = '' }: { heights: number[]; className?: string }) {
  return (
    <div className={`ac4-dash__bars ${className}`}>
      {heights.map((h, i) => (
        <div key={i} className={`ac4-dash__bar ${i === heights.length - 1 ? 'is-gold' : ''}`} style={{ height: `${h}%` }} />
      ))}
    </div>
  )
}
