import { ShieldCheck } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function ApprovalsPage() {
  return (
    <PlaceholderPage
      eyebrow="Safety"
      title="Approvals"
      description="Review high-risk assistant actions before anything touches external systems or other people."
      icon={ShieldCheck}
      status="Approval-first"
    />
  );
}
