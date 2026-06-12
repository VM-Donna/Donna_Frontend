import { LoadingState } from "@/components/feedback/LoadingState";

export default function AuthCallbackPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] p-6">
      <LoadingState label="Completing sign in..." />
    </main>
  );
}
