import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

type PlaceholderPageProps = {
  title: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  status?: string;
};

export function PlaceholderPage({ title, eyebrow, description, icon: Icon, status = "Planned" }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />

      <Card className="overflow-hidden p-0">
        <div className="border-b border-[var(--border)] bg-[var(--surface-muted)] px-5 py-4">
          <Badge variant="accent">{status}</Badge>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
            <Icon aria-hidden="true" className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Ready for the next integration pass</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
              This surface is intentionally quiet while the foundation comes together. It now shares Donna&apos;s product shell,
              theme system, and visual rhythm so future functionality has a polished home.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
