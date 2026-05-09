import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export function Popover({ ...props }) {
  return <PopoverPrimitive.Root {...props} />;
}

export function PopoverTrigger({ ...props }) {
  return <PopoverPrimitive.Trigger {...props} />;
}

export function PopoverContent({ className = "", align = "start", sideOffset = 4, ...props }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={`z-50 w-auto rounded-xl border border-slate-200 bg-white p-3 shadow-md outline-none ${className}`}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}