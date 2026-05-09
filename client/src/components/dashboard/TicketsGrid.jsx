import React from "react";
import TicketCard from "./TicketCard";

export default function TicketsGrid({
  tickets,
  onStatusUpdated,
  onTicketDeleted,
}) {
  if (tickets.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No tickets matched your filters.
      </div>
    );
  }

  return (
    <section className="mt-6 grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket._id}
          ticket={ticket}
          onStatusUpdated={onStatusUpdated}
          onTicketDeleted={onTicketDeleted}
        />
      ))}
    </section>
  );
}