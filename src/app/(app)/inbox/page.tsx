import { Inbox } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function InboxPage() {
  return (
    <PlaceholderPage
      eyebrow="Communication"
      title="Inbox"
      description="A triage surface for important messages, follow-ups, and draft replies pending approval."
      icon={Inbox}
    />
  );
}
