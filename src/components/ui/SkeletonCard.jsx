// Reusable skeleton shimmer base
const Shimmer = ({ className = "" }) => (
  <div className={`bg-white/8 rounded animate-pulse ${className}`} />
);

// ── Match Card Skeleton ───────────────────────────────────────────────────────
export function SkeletonMatchCard() {
  return (
    <div className="card p-4 space-y-3 animate-pulse">
      <div className="flex justify-between items-center">
        <Shimmer className="h-3 w-20" />
        <Shimmer className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shimmer className="w-10 h-10 rounded-lg" />
          <Shimmer className="h-4 w-12" />
        </div>
        <Shimmer className="h-8 w-16 rounded-lg" />
        <div className="flex items-center gap-2">
          <Shimmer className="h-4 w-12" />
          <Shimmer className="w-10 h-10 rounded-lg" />
        </div>
      </div>
      <Shimmer className="h-2 w-full rounded-full" />
      <div className="flex gap-2 pt-1">
        <Shimmer className="h-9 flex-1 rounded-xl" />
        <Shimmer className="h-9 flex-1 rounded-xl" />
      </div>
    </div>
  );
}

// ── Stats Row Skeleton ────────────────────────────────────────────────────────
export function SkeletonStatsRow() {
  return (
    <div className="flex items-center gap-3 px-3 py-3 animate-pulse">
      <Shimmer className="w-5 h-4" />
      <Shimmer className="w-8 h-8 rounded-lg" />
      <Shimmer className="h-4 w-20 flex-1" />
      <Shimmer className="h-4 w-8" />
      <Shimmer className="h-4 w-8" />
      <Shimmer className="h-4 w-8" />
      <Shimmer className="h-4 w-10" />
    </div>
  );
}

// ── Leaderboard Row Skeleton ──────────────────────────────────────────────────
export function SkeletonLeaderboardRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 animate-pulse">
      <Shimmer className="w-8 h-4" />
      <Shimmer className="w-9 h-9 rounded-xl" />
      <div className="flex-1 space-y-1.5">
        <Shimmer className="h-3.5 w-24" />
        <Shimmer className="h-3 w-16" />
      </div>
      <Shimmer className="h-4 w-12" />
      <Shimmer className="h-4 w-10" />
    </div>
  );
}

// ── Profile Skeleton ──────────────────────────────────────────────────────────
export function SkeletonProfile() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Avatar + name */}
      <div className="flex flex-col items-center gap-3 py-6">
        <Shimmer className="w-20 h-20 rounded-2xl" />
        <Shimmer className="h-5 w-32" />
        <Shimmer className="h-3.5 w-44" />
      </div>
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {[1,2,3].map(i => (
          <div key={i} className="card p-3 space-y-2">
            <Shimmer className="h-6 w-10 mx-auto" />
            <Shimmer className="h-3 w-16 mx-auto" />
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div className="flex gap-2">
        {[1,2,3].map(i => <Shimmer key={i} className="h-9 flex-1 rounded-xl" />)}
      </div>
      {/* Content rows */}
      {[1,2,3].map(i => (
        <div key={i} className="card p-4 flex gap-3">
          <Shimmer className="w-10 h-10 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-3.5 w-3/4" />
            <Shimmer className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Generic Card Skeleton (default export — keeps backward compat) ────────────
export default function SkeletonCard() {
  return (
    <div className="card p-5 animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <Shimmer className="h-3 w-24" />
        <Shimmer className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shimmer className="w-10 h-10 rounded-lg" />
          <Shimmer className="h-4 w-16" />
        </div>
        <Shimmer className="h-4 w-6" />
        <div className="flex items-center gap-3">
          <Shimmer className="h-4 w-16" />
          <Shimmer className="w-10 h-10 rounded-lg" />
        </div>
      </div>
      <Shimmer className="h-1.5 w-full rounded-full" />
    </div>
  );
}
