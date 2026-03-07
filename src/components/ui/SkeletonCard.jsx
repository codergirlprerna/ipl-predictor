export default function SkeletonCard() {
  return (
    <div className="card p-5 animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-3 w-24 bg-surface-hover rounded" />
        <div className="h-5 w-16 bg-surface-hover rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-surface-hover rounded-lg" />
          <div className="h-4 w-16 bg-surface-hover rounded" />
        </div>
        <div className="h-4 w-6 bg-surface-hover rounded" />
        <div className="flex items-center gap-3">
          <div className="h-4 w-16 bg-surface-hover rounded" />
          <div className="w-10 h-10 bg-surface-hover rounded-lg" />
        </div>
      </div>
      <div className="h-1.5 bg-surface-hover rounded-full" />
    </div>
  )
}