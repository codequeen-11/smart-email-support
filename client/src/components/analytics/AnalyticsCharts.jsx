import CategoryBarChart from "./CategoryBarChart";
import StatusPieChart from "./StatusPieChart";
import TicketsTrendChart from "./TicketsTrendChart";

export default function AnalyticsCharts({
  categoryData,
  statusData,
  trendData,
}) {
  return (
    <section className="mt-6 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="min-w-0 overflow-hidden">
        <CategoryBarChart data={categoryData} />
      </div>

      <div className="min-w-0 overflow-hidden">
        <StatusPieChart data={statusData} />
      </div>

      <div className="min-w-0 overflow-hidden xl:col-span-2">
        <TicketsTrendChart data={trendData} />
      </div>
    </section>
  );
}