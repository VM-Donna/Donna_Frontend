import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-[var(--background)] p-6 text-[var(--text-primary)]">
      <Card className="mx-auto w-full max-w-md p-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-contrast)]">
          <Sparkles aria-hidden="true" className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-semibold">Sign in to Donna</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Auth is intentionally a placeholder in this starter. Add your auth provider here.
        </p>
      </Card>
    </main>
  );
}
