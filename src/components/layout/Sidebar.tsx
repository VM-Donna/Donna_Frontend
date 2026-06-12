"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CheckSquare,
  Clock3,
  Inbox,
  MessageSquare,
  Settings,
  ShieldCheck,
  Sparkles,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

export const navItems = [
  { href: "/today", label: "Today", icon: Clock3 },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/habits", label: "Habits", icon: Target },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/approvals", label: "Approvals", icon: ShieldCheck },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] lg:block">
      <div className="flex h-full flex-col">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-[var(--surface-muted)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-contrast)] shadow-sm shadow-[var(--accent-ring)]">
            <Sparkles aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">Donna</p>
            <p className="text-xs font-medium text-[var(--text-secondary)]">Executive assistant</p>
          </div>
        </Link>

        <nav className="mt-8 space-y-1" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]",
                  isActive && "bg-[var(--accent-soft)] text-[var(--accent)]"
                )}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4">
          <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-subtle)]">Status</p>
          <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">Foundation mode</p>
          <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
            Task flow is live. Calendar, inbox, and approvals are staged for integration.
          </p>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur lg:hidden">
      <Link href="/" className="mb-3 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-contrast)]">
          <Sparkles aria-hidden="true" className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Donna</p>
          <p className="text-[11px] text-[var(--text-secondary)]">Executive assistant</p>
        </div>
      </Link>

      <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]",
                isActive && "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
              )}
            >
              <Icon aria-hidden="true" className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
