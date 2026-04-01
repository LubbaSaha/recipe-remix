export default function Loading() {
  return (
    <div className="min-h-screen p-[var(--space-10)] bg-[var(--color-neutral)]">
      <div className="max-w-3xl mx-auto space-y-[var(--space-6)] animate-pulse">
        <div className="w-1/2 h-8 rounded-[var(--radius-chip)] bg-[var(--color-tertiary)]" />
        <div className="w-3/4 h-4 rounded-[var(--radius-chip)] bg-[var(--color-tertiary)]" />
        <div className="grid grid-cols-2 gap-[var(--space-3)]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-6 rounded-[var(--radius-chip)] bg-[var(--color-tertiary)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}