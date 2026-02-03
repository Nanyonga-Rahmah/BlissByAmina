import { getDaysInMonth, getFirstDayOfMonth } from "@/lib/calender";
import type { IAvailableDay } from "@/lib/interfaces/interface";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { isSameDay, isToday } from "date-fns";
import { useState } from "react";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarPickerProps {
  selectedDate: Date | null;
  availableDays?: IAvailableDay[];
  onSelectDate: (date: Date) => void;
}

export default function CalendarPicker({
  onSelectDate,
  selectedDate,

  availableDays = [],
}: CalendarPickerProps) {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  //   const [selectedDate] = useState<Date | null>(null);

  const availableDates = availableDays
    ?.filter((d: any) => d.status === "available")
    .map((d: any) => new Date(d.day));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1,
  );

  return (
    <div className="">
      <div className="flex items-center justify-between py-2">
        <div className="flex">
          <span className="font-semibold">
            {currentDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className=" flex items-center justify-between">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
          </button>

          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7  gap-2  text-lg uppercase font-medium">
        {WEEK_DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days */}
      <div className="mt-2 grid grid-cols-7 gap-2 text-center">
        {days.map((day, index) => {
          const dateForDay = day !== null ? new Date(year, month, day) : null;
          const isAvailable =
            dateForDay && availableDates?.some((d) => isSameDay(d, dateForDay));
          const isSelected =
            day &&
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;

          const isTodayDate = dateForDay && isToday(dateForDay);

          return (
            <button
              key={index}
              disabled={!day}
              onClick={() => dateForDay && onSelectDate(dateForDay)}
              className={`h-16 w-16 rounded-lg flex items-center justify-center text-sm
    ${isAvailable ? "bg-black text-white font-bold" : ""}
        ${!day ? "invisible" : ""}
        ${isTodayDate ? " underline font-bold " : ""}
        ${isSelected ? "border border-black font-medium" : ""}
      `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
