import CustomDateRangePicker from "./CustomDateRangePicker";

const ranges = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 30 Days", value: "30days" },
  { label: "Custom", value: "custom" },
];

export default function DateRangeFilter({
  dateRange,
  setDateRange,
  customRange,
  setCustomRange,
}) {
  // return (
  //   <div className="grid gap-3">
  //     {/* ✅ Mobile (chips) */}
  //     <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
  //       {ranges.map((range) => (
  //         <button
  //           key={range.value}
  //           type="button"
  //           onClick={() => setDateRange(range.value)}
  //           className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
  //             dateRange === range.value
  //               ? "bg-slate-900 text-white"
  //               : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
  //           }`}
  //         >
  //           {range.label}
  //         </button>
  //       ))}
  //     </div>

  //     {/* ✅ Desktop (dropdown) */}
  //     <select
  //       value={dateRange}
  //       onChange={(e) => setDateRange(e.target.value)}
  //       className="hidden h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 lg:block"
  //     >
  //       {ranges.map((range) => (
  //         <option key={range.value} value={range.value}>
  //           {range.label}
  //         </option>
  //       ))}
  //     </select>

  //     {/* Custom range */}
  //     {dateRange === "custom" && (
  //       <CustomDateRangePicker
  //         customRange={customRange}
  //         setCustomRange={setCustomRange}
  //         setDateRange={setDateRange}
  //       />
  //     )}
  //   </div>
  // );


  return (
  <div className="grid gap-3">
    {/* Mobile chips */}
    <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {ranges.map((range) => (
        <button
          key={range.value}
          type="button"
          onClick={() => setDateRange(range.value)}
          className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            dateRange === range.value
              ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
              : "bg-[rgb(var(--background))] text-[rgb(var(--muted-foreground))] ring-1 ring-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>

    {/* Desktop dropdown */}
    <select
      value={dateRange}
      onChange={(e) => setDateRange(e.target.value)}
      className="hidden h-12 w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-4 text-sm font-medium text-[rgb(var(--foreground))] outline-none transition focus:ring-2 focus:ring-blue-500 lg:block"
    >
      {ranges.map((range) => (
        <option
          key={range.value}
          value={range.value}
          className="bg-[rgb(var(--card))] text-[rgb(var(--foreground))]"
        >
          {range.label}
        </option>
      ))}
    </select>

    {/* Custom range */}
    {dateRange === "custom" && (
      <CustomDateRangePicker
        customRange={customRange}
        setCustomRange={setCustomRange}
        setDateRange={setDateRange}
      />
    )}
  </div>
);
}