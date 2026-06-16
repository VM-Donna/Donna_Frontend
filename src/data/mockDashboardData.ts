import type { CalendarEvent, DashboardData } from "@/types/dashboard";

function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);
  return nextDate;
}

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function createMockDashboardData(baseDate = new Date()): DashboardData {
  const today = formatDateKey(baseDate);
  const tomorrow = formatDateKey(addDays(baseDate, 1));
  const dayAfterTomorrow = formatDateKey(addDays(baseDate, 2));

  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Call with solar company",
      date: today,
      startTime: "12:00",
      endTime: "12:30"
    },
    {
      id: "2",
      title: "Book club",
      date: today,
      startTime: "17:30",
      endTime: "18:30"
    },
    {
      id: "3",
      title: "House",
      date: today,
      startTime: "19:00",
      endTime: "21:00"
    },
    {
      id: "4",
      title: "Strategy review",
      date: tomorrow,
      startTime: "09:30",
      endTime: "10:15"
    },
    {
      id: "5",
      title: "Volleyball",
      date: tomorrow,
      startTime: "19:00",
      endTime: "20:00",
      location: "Valley Park"
    },
    {
      id: "6",
      title: "Deep work block",
      date: dayAfterTomorrow,
      startTime: "08:30",
      endTime: "10:30"
    },
    {
      id: "7",
      title: "Dinner with Priya",
      date: dayAfterTomorrow,
      startTime: "18:30",
      endTime: "20:00",
      location: "West Loop"
    }
  ];

  return {
    events,
    tasks: [
      {
        id: "1",
        title: "Call Mark",
        status: "pending",
        important: true,
        urgent: false
      },
      {
        id: "2",
        title: "Book dentist appointment",
        status: "in_progress",
        important: true,
        urgent: true
      },
      {
        id: "3",
        title: "Review insurance renewal",
        status: "completed",
        important: false,
        urgent: false
      }
    ],
    emails: [
      {
        id: "1",
        sender: "Alex Morgan",
        subject: "Updated contract draft for review",
        receivedAt: "8:42 AM",
        isUnread: true,
        importance: "important"
      },
      {
        id: "2",
        sender: "Delta Airlines",
        subject: "Your upcoming trip details",
        receivedAt: "7:18 AM",
        isUnread: true,
        importance: "normal"
      },
      {
        id: "3",
        sender: "Morgan Stanley",
        subject: "Monthly portfolio statement available",
        receivedAt: "Yesterday",
        importance: "normal"
      }
    ],
    habits: [
      {
        id: "1",
        name: "Morning workout",
        frequency: "daily",
        completed: true,
        streak: 5
      },
      {
        id: "2",
        name: "Read 20 minutes",
        frequency: "daily",
        completed: false,
        streak: 12
      },
      {
        id: "3",
        name: "Plan tomorrow",
        frequency: "daily",
        completed: false,
        streak: 3
      }
    ]
  };
}
