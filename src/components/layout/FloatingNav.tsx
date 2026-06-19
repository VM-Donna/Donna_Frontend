"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "./Sidebar";

type FloatingNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const floatingNavItems: FloatingNavItem[] = [{ href: "/", label: "Home", icon: Home }, ...navItems];

export function FloatingNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <div className="fixed bottom-6 left-6 z-50">
        {isOpen ? (
          <nav
            aria-label="Quick navigation"
            className="mb-3 w-[min(calc(100vw-3rem),340px)] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--shadow-lifted)]"
          >
            <div className="grid grid-cols-3 gap-2">
              {floatingNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border border-transparent px-2 py-3 text-center text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                      isActive &&
                        "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    )}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        ) : null}

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[var(--shadow-lifted)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          {isOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>
    </>
  );
}
