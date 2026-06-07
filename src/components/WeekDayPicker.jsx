import { useState } from "react";
import {
  startOfWeek,
  addDays,
  addWeeks,
  getWeek,
  format,
} from "date-fns";
const formatDate = (date) => format(date, "d.M.yyyy");

const days = [
  "Pondelok",
  "Utorok",
  "Streda",
  "Štvrtok",
  "Piatok",
  "Sobota",
  "Nedela",
];

export default function WeekDayPicker({ value, onChange }) {
  const baseWeek = getWeek(new Date(), {
    weekStartsOn: 1,
  });

  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekStart = (offset) =>
    addWeeks(
      startOfWeek(new Date(), { weekStartsOn: 1 }),
      offset
    );

  const selectedWeek = baseWeek + weekOffset;

  const setWeek = (newOffset) => {
    setWeekOffset(newOffset);

    const monday = getWeekStart(newOffset);
    const date = format(monday, "yyyy-MM-dd");

    onChange?.(date);
  };

  const handleDayClick = (index) => {
    const weekStart = getWeekStart(weekOffset);

    const date = format(
      addDays(weekStart, index),
      "yyyy-MM-dd"
    );

    onChange?.(date);
  };

  const handleToday = () => {
    const today = new Date();

    const week = getWeek(today, { weekStartsOn: 1 });
    const newOffset = week - baseWeek;

    setWeekOffset(newOffset);

    const date = format(today, "yyyy-MM-dd");
    onChange?.(date);
  };

  const handleInputWeek = (e) => {
    const newWeek = Number(e.target.value);
    setWeek(newWeek - baseWeek);
  };

  return (
    <div className="space-y-3">
      {/* CONTROLS */}
      <div className="flex items-center gap-1">
        <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            Week:
        </span>
        <input 
          className="w-25 rounded border pl-13 py-1"
          type="number"
          value={selectedWeek}
          onChange={handleInputWeek}
          />
        </div>

        {/* TODAY BUTTON */}
        <button
          type="button"
          onClick={handleToday}
          className="ml-2 rounded-lg bg-green-600 px-3 py-1 text-white hover:bg-green-700"
        >
          Today
        </button>
      

      {/* DAYS */}
      <div className="grid grid-cols-7 gap-1 pl-5">
        {days.map((day, index) => {
          const weekStart = getWeekStart(weekOffset);

          const date = format(
            addDays(weekStart, index),
            "yyyy-MM-dd"
          );

          const active = value === date;

          const isToday =
            format(new Date(), "yyyy-MM-dd") === date;

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(index)}
              className={`rounded-lg border px-1 py-0 text-sm transition ${
                active
                  ? "bg-green-600 text-white border-green-400"
                  : isToday
                  ? "border-green-500"
                  : "hover:bg-gray-800"
              }`}
            >
              <div>{day}</div>
              <div className="text-xs opacity-80">
                {formatDate(date)}
              </div>
            </button>
          );
        })}
      </div>
      </div>
    </div>
  );
}