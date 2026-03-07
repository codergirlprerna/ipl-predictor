export default function EmptyState({ emoji = "🏏", title, subtitle, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <h3 className="text-xl font-display text-white mb-2">{title}</h3>
      {subtitle && <p className="text-gray-400 text-sm max-w-xs mb-6">{subtitle}</p>}
      {action && (
        <button onClick={onAction} className="btn-primary">{action}</button>
      )}
    </div>
  );
}