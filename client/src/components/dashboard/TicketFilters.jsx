import { Search } from "lucide-react";
import { Input } from "../ui/input";
import DateRangeFilter from "./DateRangeFilter";

const categories = [
  "All",
  "Login Issue",
  "Payment Issue",
  "Technical Bug",
  "General Inquiry",
  "Unclassified",
];

export default function TicketFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  dateRange,
  setDateRange,
  customRange,
  setCustomRange,
}) {
  return (
    <section className="mt-8 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-sm">
      <div className="grid min-w-0 grid-cols-1 gap-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]"
          />
          <Input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-2xl pl-11"
          />
        </div>

        <div>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                    : "bg-[rgb(var(--background))] text-[rgb(var(--muted-foreground))] ring-1 ring-[rgb(var(--border))]"
                }`}
              >
                {category === "All" ? "All" : category}
              </button>
            ))}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="hidden h-12 w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-4 text-sm font-medium text-[rgb(var(--foreground))] outline-none focus:ring-2 focus:ring-blue-500 lg:block"
          >
            <option value="All">All Categories</option>
            <option value="Login Issue">Login Issue</option>
            <option value="Payment Issue">Payment Issue</option>
            <option value="Technical Bug">Technical Bug</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Unclassified">Unclassified</option>
          </select>
        </div>

        <DateRangeFilter
          dateRange={dateRange}
          setDateRange={setDateRange}
          customRange={customRange}
          setCustomRange={setCustomRange}
        />
      </div>
    </section>
  );
}