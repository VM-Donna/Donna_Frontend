import { Mail, MailOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EmailSummary } from "@/types/dashboard";

type EmailSummaryCardProps = {
  emails: EmailSummary[];
};

const importanceConfig = {
  important: "bg-[var(--warning-soft)] text-[var(--warning)]",
  urgent: "bg-[var(--danger-soft)] text-[var(--danger)]"
} as const;

export function EmailSummaryCard({ emails }: EmailSummaryCardProps) {
  const unreadCount = emails.filter((email) => email.isUnread).length;

  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Email Summary</h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{unreadCount} unread needing a look</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
          <Mail aria-hidden="true" className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 divide-y divide-[var(--border)]">
        {emails.map((email) => {
          const Icon = email.isUnread ? Mail : MailOpen;
          const importanceClass =
            email.importance && email.importance !== "normal" ? importanceConfig[email.importance] : null;

          return (
            <article key={email.id} className="rounded-lg py-3 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)]",
                    email.isUnread && "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  )}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p
                      className={cn(
                        "truncate text-sm text-[var(--text-primary)]",
                        email.isUnread ? "font-semibold" : "font-medium"
                      )}
                    >
                      {email.sender}
                    </p>
                    <span className="shrink-0 text-[11px] font-medium text-[var(--text-secondary)]">{email.receivedAt}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-[var(--text-secondary)]">{email.subject}</p>
                  {importanceClass ? (
                    <span className={cn("mt-2 inline-flex rounded-md px-2 py-1 text-[11px] font-semibold capitalize", importanceClass)}>
                      {email.importance}
                    </span>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
