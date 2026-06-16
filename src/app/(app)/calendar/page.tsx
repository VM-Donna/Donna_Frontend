import { CalendarDays } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function CalendarPage() {
  return (
    <PlaceholderPage
      eyebrow="Schedule"
      title="Calendar"
      description="A dedicated schedule surface for calendar context, open blocks, conflicts, and proposed changes."
      icon={CalendarDays}
    />
  );
}
