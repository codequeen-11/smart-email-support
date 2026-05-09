import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Calendar({
  className = "",
  classNames = {},
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`p-3 ${className}`}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button:
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 rounded-md border border-slate-200",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative",
        day: "h-9 w-9 p-0 font-normal rounded-md hover:bg-slate-100",
        day_selected:
          "bg-slate-900 text-white hover:bg-slate-900 hover:text-white",
        day_today: "bg-slate-100 text-slate-900",
        day_outside: "text-slate-400 opacity-50",
        day_disabled: "text-slate-400 opacity-50",
        day_range_middle: "bg-slate-100 text-slate-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}