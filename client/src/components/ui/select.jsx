import React from "react";
import { cn } from "../../lib/utils";

 
export function Select({ className = "", children, ...props }) {
  return (
    <select
      className={`flex h-11 w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-sm text-[rgb(var(--foreground))] outline-none focus:ring-2 focus:ring-slate-900 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}