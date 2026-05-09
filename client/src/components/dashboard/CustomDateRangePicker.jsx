import { useMemo } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function CustomDateRangePicker({
  customRange,
  setCustomRange,
  setDateRange,
}) {
  const label = useMemo(() => {
    if (customRange?.from && customRange?.to) {
      return `${format(customRange.from, "MMM dd, yyyy")} - ${format(
        customRange.to,
        "MMM dd, yyyy"
      )}`;
    }

    if (customRange?.from) {
      return format(customRange.from, "MMM dd, yyyy");
    }

    return "Pick a custom range";
  }, [customRange]);

  const handleSelect = (range) => {
    setCustomRange(range);
    setDateRange("custom");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className="w-full justify-start border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
        >
          <CalendarIcon size={16} className="mr-2" />
          {label}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={customRange}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}