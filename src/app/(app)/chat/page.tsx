import { MessageSquare } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function ChatPage() {
  return (
    <PlaceholderPage
      eyebrow="Command center"
      title="Chat"
      description="A future command surface for natural-language planning. No prompt box is shown until the data foundations are ready."
      icon={MessageSquare}
      status="Later phase"
    />
  );
}
