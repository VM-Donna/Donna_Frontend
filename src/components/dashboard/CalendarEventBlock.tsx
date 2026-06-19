import type { CSSProperties } from "react";
import { MapPin } from "lucide-react";
import type { CalendarEvent } from "@/types/dashboard";

type CalendarEventBlockProps = {
  event: CalendarEvent;
  top: number;
  height: number;
  timeRange: string;
  isCompact?: boolean;
};

export function CalendarEventBlock({
  event,
  top,
  height,
  timeRange,
  isCompact = false
}: CalendarEventBlockProps) {
  const eventStyle: CSSProperties = {
    top,
    height,
    backgroundColor: event.color ?? "var(--accent)"
  };

  return (
    <article
      className="absolute left-1.5 right-1.5 overflow-hidden rounded-lg border border-white/15 px-2 py-1.5 text-[var(--accent-contrast)] shadow-md shadow-[var(--accent-ring)] transition hover:-translate-y-0.5 hover:shadow-lg sm:left-2 sm:right-2 sm:px-3 sm:py-2"
      style={eventStyle}
    >
      <div className="flex h-full flex-col justify-between gap-1">
        <div>
          <h3 className="truncate text-[11px] font-semibold leading-4 sm:text-xs">{event.title}</h3>
          <p className="truncate text-[10px] font-medium leading-4 opacity-85 sm:text-[11px]">
            {timeRange}
          </p>
        </div>
        {event.location && !isCompact ? (
          <p className="flex min-w-0 items-center gap-1 truncate text-[11px] leading-4 opacity-85">
            <MapPin aria-hidden="true" className="h-3 w-3 shrink-0" />
            <span className="truncate">{event.location}</span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
