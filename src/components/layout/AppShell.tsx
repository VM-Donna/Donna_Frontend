export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-6 text-[var(--text-primary)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}
