import Link from "next/link";

const navItems = [
  { href: "/today", label: "Today" },
  { href: "/tasks", label: "Tasks" },
  { href: "/habits", label: "Habits" },
  { href: "/calendar", label: "Calendar" },
  { href: "/inbox", label: "Inbox" },
  { href: "/chat", label: "Chat" },
  { href: "/approvals", label: "Approvals" },
  { href: "/settings", label: "Settings" }
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-6">
      <div className="mb-8">
        <p className="text-lg font-semibold">Donna</p>
        <p className="text-xs text-slate-500">AI executive assistant</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
