"use client";

import { useMemo, useState } from "react";
import { createMockDashboardData } from "@/data/mockDashboardData";
import { ThreeDayCalendar } from "@/components/dashboard/ThreeDayCalendar";
import { PageHeader } from "@/components/ui/PageHeader";

export default function CalendarPage() {
  const [today] = useState(() => new Date());
  const dashboardData = useMemo(() => createMockDashboardData(today), [today]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Schedule"
        title="Calendar"
        description="A dedicated schedule surface for calendar context, open blocks, conflicts, and proposed changes."
      />
      <ThreeDayCalendar baseDate={today} events={dashboardData.events} />
    </div>
  );
}
