export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-soft)]">
      <p className="font-semibold text-[var(--text-primary)]">{title}</p>
      {description ? <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p> : null}
    </div>
  );
}
