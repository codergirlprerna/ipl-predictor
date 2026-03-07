import useCountdown from '../../hooks/useCountdown'

export default function CountdownTimer({ targetDate }) {
  const timeLeft = useCountdown(targetDate)

  if (!timeLeft) return (
    <span className="badge-live animate-pulse">● LIVE</span>
  )

  const pad = n => String(n).padStart(2, '0')

  const timeStr = [
    timeLeft.hours > 0 && `${pad(timeLeft.hours)}h`,
    `${pad(timeLeft.minutes)}m`,
    `${pad(timeLeft.seconds)}s`,
  ].filter(Boolean).join(' ')

  return (
    // Stack vertically — label on top, time below
    // This keeps the middle column narrow on mobile
    <div className="flex flex-col items-center gap-0.5">
      <span className="section-label text-[9px] sm:text-xs">STARTS IN</span>
      <span className="font-mono text-xs sm:text-sm font-bold text-brand-orange leading-tight">
        {timeStr}
      </span>
    </div>
  )
}
