"use client";

import { useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import type { Locale } from "date-fns";

interface BookingCalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  locale: Locale;
  isEnglish: boolean;
}

/** Premier jour réservable : demain, à l'heure de Paris (et non à l'heure de l'appareil du client). */
export function firstBookableParis(): Date {
  const parisToday = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(new Date()); // AAAA-MM-JJ
  return addDays(startOfDay(new Date(parisToday + "T00:00:00")), 1);
}

/** Calendrier affiché directement dans la page (plus de fenêtre flottante par-dessus le formulaire). */
export function BookingCalendar({ selected, onSelect, locale, isEnglish }: BookingCalendarProps) {
  const firstBookable = firstBookableParis();
  const today = addDays(firstBookable, -1);
  const [month, setMonth] = useState(() => startOfMonth(selected ?? firstBookable));

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }),
  });
  const weekdays = days.slice(0, 7).map((d) => format(d, "EEEEEE", { locale }));
  const canGoBack = !isSameMonth(month, firstBookable) && !isBefore(month, firstBookable);

  return (
    <div className="bk-cal">
      <div className="bk-cal-head">
        <button
          type="button"
          className="bk-cal-nav"
          onClick={() => setMonth(addMonths(month, -1))}
          disabled={!canGoBack}
          aria-label={isEnglish ? "Previous month" : "Mois précédent"}
        >
          ‹
        </button>
        <p className="bk-cal-month" aria-live="polite">
          {format(month, "LLLL yyyy", { locale })}
        </p>
        <button
          type="button"
          className="bk-cal-nav"
          onClick={() => setMonth(addMonths(month, 1))}
          aria-label={isEnglish ? "Next month" : "Mois suivant"}
        >
          ›
        </button>
      </div>

      <div className="bk-cal-grid" aria-hidden="true">
        {weekdays.map((w, i) => (
          <span key={i} className="bk-cal-weekday">
            {w}
          </span>
        ))}
      </div>

      <div key={month.toISOString()} className="bk-cal-grid bk-cal-days">
        {days.map((day) => {
          const outside = !isSameMonth(day, month);
          if (outside) return <span key={day.toISOString()} />;
          const disabled = isBefore(day, firstBookable);
          const isSelected = !!selected && isSameDay(day, selected);
          return (
            <button
              key={day.toISOString()}
              type="button"
              className={`bk-cal-day${isSelected ? " is-selected" : ""}${isSameDay(day, today) ? " is-today" : ""}`}
              disabled={disabled}
              aria-pressed={isSelected}
              aria-label={format(day, "EEEE d MMMM yyyy", { locale })}
              onClick={() => onSelect(day)}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
