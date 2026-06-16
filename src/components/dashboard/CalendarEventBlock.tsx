import type { CSSProperties } from "react";
import { MapPin } from "lucide-react";
import type { CalendarEvent } from "@/types/dashboard";

type CalendarEventBlockProps = {
  event: CalendarEvent;
  top: number;
  height: number;
  timeRange: string;
};

export function CalendarEventBlock({ event, top, height, timeRange }: CalendarEventBlockProps) {
  const eventStyle: CSSProperties = {
    top,
    height,
    backgroundColor: event.color ?? "var(--accent)"
  };

  return (
    <article
      className="absolute left-2 right-2 overflow-hidden rounded-lg border border-white/15 px-3 py-2 text-[var(--accent-contrast)] shadow-md shadow-[var(--accent-ring)] transition hover:-translate-y-0.5 hover:shadow-lg"
      style={eventStyle}
    >
      <div className="flex h-full flex-col justify-between gap-1">
        <div>
          <h3 className="truncate text-xs font-semibold leading-4 sm:text-sm">{event.title}</h3>
          <p className="truncate text-[11px] font-medium leading-4 opacity-85">{timeRange}</p>
        </div>
        {event.location ? (
          <p className="flex min-w-0 items-center gap-1 truncate text-[11px] leading-4 opacity-85">
            <MapPin aria-hidden="true" className="h-3 w-3 shrink-0" />
            <span className="truncate">{event.location}</span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
