import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardStats from "../components/dashboard/DashboardStats";
import TicketFilters from "../components/dashboard/TicketFilters";
import TicketsGrid from "../components/dashboard/TicketsGrid";
import AnalyticsCharts from "../components/analytics/AnalyticsCharts";
import PageHeader from "../components/shared/PageHeader";
import { Button } from "../components/ui/button";
import { getTickets } from "../services/ticketService";
import Toast from "../components/ui/toast";
function isWithinDateRange(ticketDate, range, customRange) {
  const createdAt = new Date(ticketDate);
  const now = new Date();

  if (range === "all") return true;

  if (range === "today") {
    return createdAt.toDateString() === now.toDateString();
  }

  if (range === "7days") {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    return createdAt >= sevenDaysAgo;
  }

  if (range === "30days") {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    return createdAt >= thirtyDaysAgo;
  }

  if (range === "custom") {
    if (!customRange?.from) return true;

    const start = new Date(customRange.from);
    start.setHours(0, 0, 0, 0);

    const end = customRange?.to ? new Date(customRange.to) : new Date(customRange.from);
    end.setHours(23, 59, 59, 999);

    return createdAt >= start && createdAt <= end;
  }

  return true;
}

export default function DashboardPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateRange, setDateRange] = useState("all");
  const [toast, setToast] = useState(null);
 const [customRange, setCustomRange] = useState({
    from: undefined,
    to: undefined,
  });
  useEffect(() => {
    loadTickets();
  }, []);
  

  const loadTickets = async () => {
    try {
      const result = await getTickets();
      setTickets(result);
    } catch (err) {
      setError(err.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  // const handleStatusUpdated = (updatedTicket) => {
  //   setTickets((prevTickets) =>
  //     prevTickets.map((ticket) =>
  //       ticket._id === updatedTicket._id ? updatedTicket : ticket
  //     )
  //   );
  // };
  const handleStatusUpdated = (updatedTicket) => {
  setTickets((prevTickets) =>
    prevTickets.map((ticket) =>
      ticket._id === updatedTicket._id ? updatedTicket : ticket
    )
  );

  setToast({
    type: "success",
    message: "Ticket status updated.",
  });

  setTimeout(() => {
    setToast(null);
  }, 3000);
};

  // const handleTicketDeleted = (deletedTicketId) => {
  //   setTickets((prevTickets) =>
  //     prevTickets.filter((ticket) => ticket._id !== deletedTicketId)
  //   );
  // };
    const handleTicketDeleted = (deletedTicketId) => {
  setTickets((prevTickets) =>
    prevTickets.filter((ticket) => ticket._id !== deletedTicketId)
  );

  setToast({
    type: "success",
    message: "Ticket deleted successfully.",
  });

  setTimeout(() => {
    setToast(null);
  }, 3000);
};
  const dateFilteredTickets = useMemo(() => {
    return tickets.filter((ticket) =>
      isWithinDateRange(ticket.createdAt, dateRange, customRange)
    );
  }, [tickets, dateRange, customRange]);

  const stats = useMemo(() => {
    return {
      total: dateFilteredTickets.length,
      login: dateFilteredTickets.filter((t) => t.category === "Login Issue").length,
      payment: dateFilteredTickets.filter((t) => t.category === "Payment Issue").length,
      technical: dateFilteredTickets.filter((t) => t.category === "Technical Bug").length,
      general: dateFilteredTickets.filter((t) => t.category === "General Inquiry").length,
    };
  }, [dateFilteredTickets]);

  const categoryChartData = useMemo(() => {
    return [
      {
        name: "Login",
        value: dateFilteredTickets.filter((t) => t.category === "Login Issue").length,
      },
      {
        name: "Payment",
        value: dateFilteredTickets.filter((t) => t.category === "Payment Issue").length,
      },
      {
        name: "Technical",
        value: dateFilteredTickets.filter((t) => t.category === "Technical Bug").length,
      },
      {
        name: "General",
        value: dateFilteredTickets.filter((t) => t.category === "General Inquiry").length,
      },
    ];
  }, [dateFilteredTickets]);

  const statusChartData = useMemo(() => {
    return [
      {
        name: "Open",
        value: dateFilteredTickets.filter((t) => t.status === "Open").length,
      },
      {
        name: "In Progress",
        value: dateFilteredTickets.filter((t) => t.status === "In Progress").length,
      },
      {
        name: "Resolved",
        value: dateFilteredTickets.filter((t) => t.status === "Resolved").length,
      },
    ];
  }, [dateFilteredTickets]);

  const trendChartData = useMemo(() => {
    const grouped = dateFilteredTickets.reduce((acc, ticket) => {
      const date = new Date(ticket.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // return Object.entries(grouped).map(([date, count]) => ({
    //   date,
    //   count,
    // }));

    return Object.entries(grouped)
  .map(([date, count]) => ({
    date,
    count,
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [dateFilteredTickets]);

  const filteredTickets = useMemo(() => {
    return dateFilteredTickets.filter((ticket) => {
      const matchesCategory =
        selectedCategory === "All" || ticket.category === selectedCategory;

      const query = search.toLowerCase();

      const matchesSearch =
        ticket.name.toLowerCase().includes(query) ||
        ticket.email.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.message.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [dateFilteredTickets, search, selectedCategory]);

  return (
    <DashboardLayout>
      <PageHeader
        title="Support Dashboard"
        description="Monitor support requests, analytics, and ticket activity."
       

//         action={
//   <Link to="/submit-ticket" className="block w-full sm:w-auto">
//     <Button className="h-12 w-full rounded-2xl sm:w-auto">
//       Create Ticket
//     </Button>
//   </Link>
// }

action={
  <Link to="/submit-ticket" className="block w-full sm:w-auto">
    {/* <Button
      className="
        h-12 w-full sm:w-auto
        rounded-2xl px-6
        bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]
        shadow-md
        transition-all duration-200
        hover:shadow-lg hover:opacity-90
        active:scale-[0.98]
      "
    >
      Create Ticket
    </Button> */}

    <Button
  className="
    h-12 w-full sm:w-auto
    rounded-2xl px-6
    flex items-center gap-2

    bg-[rgb(var(--primary))]
    text-[rgb(var(--primary-foreground))]

    border border-[rgb(var(--border))]
    shadow-md

    transition-all duration-200
    hover:shadow-lg hover:brightness-110
    active:scale-[0.98]
  "
>
  Create Ticket
</Button>
  </Link>
}
      />

      <DashboardStats stats={stats} />

      {!loading && !error && (
        <AnalyticsCharts
          categoryData={categoryChartData}
          statusData={statusChartData}
          trendData={trendChartData}
        />
      )}

      <TicketFilters
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        dateRange={dateRange}
        setDateRange={setDateRange}
        customRange={customRange}
        setCustomRange={setCustomRange}
      />

      {loading && <p className="mt-6 text-slate-500">Loading tickets...</p>}
      {error && <p className="mt-6 text-red-500">{error}</p>}
      {!loading && !error && (
        <TicketsGrid
          tickets={filteredTickets}
          onStatusUpdated={handleStatusUpdated}
          onTicketDeleted={handleTicketDeleted}
        />
      )}

      {toast && (
  <Toast
    message={toast.message}
    type={toast.type}
    onClose={() => setToast(null)}
  />
)}
    </DashboardLayout>
  );
}