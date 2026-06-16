import { ReactNode } from "react";
import { Card } from "./Card";

type EmptyPanelProps = {
  icon?: ReactNode;
  title: string;
  description: string;
};

export function EmptyPanel({ icon, title, description }: EmptyPanelProps) {
  return (
    <Card className="border-dashed p-8 text-center">
      {icon ? <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">{icon}</div> : null}
      <h2 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
    </Card>
  );
}
