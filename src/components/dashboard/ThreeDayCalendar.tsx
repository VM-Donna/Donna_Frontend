"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { formatDateKey } from "@/data/mockDashboardData";
import type { CalendarEvent } from "@/types/dashboard";
import { CalendarEventBlock } from "./CalendarEventBlock";

type ThreeDayCalendarProps = {
  baseDate: Date;
  events: CalendarEvent[];
};

type CalendarDay = {
  date: Date;
  key: string;
};

const startHour = 7;
const endHour = 22;
const rowHeight = 64;
const timelineHeight = (endHour - startHour) * rowHeight;

function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);
  return nextDate;
}

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime(time: string): string {
  const [hourString, minuteString] = time.split(":");
  const hour = Number(hourString);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minuteString} ${suffix}`;
}

function formatDayName(date: Date): string {
  return new Intl.DateTimeFormat("en", { weekday: "short" }).format(date);
}

function formatDayNumber(date: Date): string {
  return new Intl.DateTimeFormat("en", { day: "numeric" }).format(date);
}

function formatCalendarRange(days: CalendarDay[]): string {
  const firstDay = days[0].date;
  const lastDay = days[days.length - 1].date;
  const monthFormatter = new Intl.DateTimeFormat("en", { month: "short" });

  if (firstDay.getMonth() === lastDay.getMonth()) {
    return `${monthFormatter.format(firstDay)} ${firstDay.getDate()}-${lastDay.getDate()}`;
  }

  return `${monthFormatter.format(firstDay)} ${firstDay.getDate()} - ${monthFormatter.format(lastDay)} ${lastDay.getDate()}`;
}

function formatHourLabel(hour: number): string {
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${suffix}`;
}

function getEventPosition(event: CalendarEvent): { top: number; height: number } {
  const start = parseTimeToMinutes(event.startTime);
  const end = parseTimeToMinutes(event.endTime);
  const dayStart = startHour * 60;
  const top = ((start - dayStart) / 60) * rowHeight;
  const height = Math.max(((end - start) / 60) * rowHeight, 38);

  return {
    top: Math.max(top, 0),
    height
  };
}

function getCurrentTimeTop(now: Date): number | null {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const start = startHour * 60;
  const end = endHour * 60;

  if (minutes < start || minutes > end) {
    return null;
  }

  return ((minutes - start) / 60) * rowHeight;
}

export function ThreeDayCalendar({ baseDate, events }: ThreeDayCalendarProps) {
  const [now, setNow] = useState(() => new Date());
  const days = useMemo<CalendarDay[]>(
    () =>
      [0, 1, 2].map((offset) => {
        const date = addDays(baseDate, offset);
        return {
          date,
          key: formatDateKey(date)
        };
      }),
    [baseDate]
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const hourRows = Array.from({ length: endHour - startHour }, (_, index) => startHour + index);
  const hourLabels = Array.from({ length: endHour - startHour + 1 }, (_, index) => startHour + index);
  const currentTimeTop = getCurrentTimeTop(now);
  const todayKey = formatDateKey(now);

  return (
    <section className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-2 border-b border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            <span>{formatCalendarRange(days)}</span>
          </div>
          <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">3-Day Calendar</h2>
        </div>
        <div className="rounded-md border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
          {events.length} scheduled
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[64px_repeat(3,minmax(0,1fr))] border-b border-[var(--border)] bg-[var(--surface-muted)]">
            <div />
            {days.map((day) => (
              <div key={day.key} className="border-l border-[var(--border)] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-normal text-[var(--text-subtle)]">
                  {formatDayName(day.date)}
                </p>
                <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{formatDayNumber(day.date)}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[64px_repeat(3,minmax(0,1fr))]">
            <div className="relative border-r border-[var(--border)] bg-[var(--surface-muted)]" style={{ height: timelineHeight }}>
              {hourLabels.map((hour, index) => (
                <div
                  key={hour}
                  className="absolute right-3 -translate-y-1/2 text-[11px] font-medium text-[var(--text-secondary)]"
                  style={{ top: index * rowHeight }}
                >
                  {formatHourLabel(hour)}
                </div>
              ))}
            </div>

            {days.map((day) => {
              const dayEvents = events.filter((event) => event.date === day.key);
              const isToday = day.key === todayKey;

              return (
                <div key={day.key} className="relative border-l border-[var(--border)]" style={{ height: timelineHeight }}>
                  {hourRows.map((hour) => (
                    <div
                      key={hour}
                      className="border-b border-[var(--calendar-line)]"
                      style={{ height: rowHeight }}
                    />
                  ))}

                  {isToday && currentTimeTop !== null ? (
                    <div className="absolute left-0 right-0 z-20" style={{ top: currentTimeTop }}>
                      <div className="h-px bg-rose-500" />
                      <div className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-rose-500 shadow-sm" />
                    </div>
                  ) : null}

                  {dayEvents.map((event) => {
                    const position = getEventPosition(event);

                    return (
                      <CalendarEventBlock
                        key={event.id}
                        event={event}
                        top={position.top}
                        height={position.height}
                        timeRange={`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
