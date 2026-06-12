import { Clock3 } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function TodayPage() {
  return (
    <PlaceholderPage
      eyebrow="Daily brief"
      title="Today"
      description="A focused view for the morning plan, risks, priorities, habits, and schedule context."
      icon={Clock3}
    />
  );
}
