"use client";

import { Moon, Settings, Sun } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { accentOptions } from "@/theme/accents";
import { useThemeSettings } from "@/theme/ThemeProvider";

export default function SettingsPage() {
  const { mode, accent, setMode, setAccent } = useThemeSettings();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Tune Donna's interface while integrations, autonomy controls, and model settings are staged for future phases."
        actions={<Badge variant="accent">Local preferences</Badge>}
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                <Settings aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Appearance</h2>
                <p className="text-sm text-[var(--text-secondary)]">Saved in this browser and applied across the app.</p>
              </div>
            </div>
          </div>

          <section>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Theme mode</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                { id: "light" as const, label: "Light", icon: Sun },
                { id: "dark" as const, label: "Dark", icon: Moon }
              ].map((option) => {
                const Icon = option.icon;
                const isSelected = mode === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setMode(option.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4 text-left transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                      isSelected && "border-[var(--accent)] bg-[var(--accent-soft)]"
                    )}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--accent)]">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[var(--text-primary)]">{option.label}</span>
                      <span className="block text-xs text-[var(--text-secondary)]">
                        {option.id === "light" ? "Clean daytime workspace" : "Rich low-light workspace"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Accent color</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {accentOptions.map((option) => {
                const isSelected = accent === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setAccent(option.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-left transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                      isSelected && "border-[var(--accent)] bg-[var(--accent-soft)]"
                    )}
                  >
                    <span className="h-7 w-7 rounded-md shadow-sm" style={{ backgroundColor: option.value }} />
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </Card>

        <Card variant="muted" className="h-fit">
          <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-subtle)]">Coming later</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">Connected accounts and autonomy</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Google, Gmail, model provider, and approval-level controls will live here once those foundations are ready.
          </p>
          <Button variant="secondary" disabled className="mt-5 w-full">
            Integrations not connected
          </Button>
        </Card>
      </div>
    </div>
  );
}
