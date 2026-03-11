import useCountdown from '../../hooks/useCountdown'

export default function CountdownTimer({ targetDate }) {
  const timeLeft = useCountdown(targetDate)

  if (!timeLeft) return (
    <span className="badge-live animate-pulse">● LIVE</span>
  )

  const pad = n => String(n).padStart(2, '0')

  // Format: 01h 58m 47s — always on one line, no wrapping
  const parts = []
  if (timeLeft.hours > 0) parts.push(`${pad(timeLeft.hours)}h`)
  parts.push(`${pad(timeLeft.minutes)}m`)
  parts.push(`${pad(timeLeft.seconds)}s`)

  return (
    <div className="flex flex-col items-center gap-0.5 w-full">
      <span className="section-label text-[9px] whitespace-nowrap">STARTS IN</span>
      <span
        className="font-mono font-bold text-brand-orange leading-tight whitespace-nowrap"
        style={{ fontSize: timeLeft.hours > 0 ? "11px" : "13px" }}
      >
        {parts.join(' ')}
      </span>
    </div>
  )
}
