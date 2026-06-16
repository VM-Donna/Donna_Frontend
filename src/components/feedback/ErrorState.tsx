export function ErrorState({ message }: { message: string }) {
  return <p className="text-sm font-medium text-[var(--danger)]">{message}</p>;
}
