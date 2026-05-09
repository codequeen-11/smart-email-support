import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent } from "../ui/card";

const COLORS = ["#ef4444", "#3b82f6", "#22c55e"];

export default function StatusPieChart({ data }) {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-lg font-bold text-[rgb(var(--foreground))]">
          Ticket Status Breakdown
        </h3>
        <p className="text-sm text-[rgb(var(--foreground))]">
          Current distribution of open, active, and resolved tickets.
        </p>

        <div className="mt-5 h-[260px] w-full min-w-0 sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
                innerRadius={55}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {/* <Tooltip
                contentStyle={{
                  background: "rgb(var(--card))",
                  border: "1px solid rgb(var(--border))",
                  color: "rgb(var(--foreground))",
                  borderRadius: "12px",
                }}
              /> */}

              <Tooltip
  contentStyle={{
    background: "rgb(var(--card))",
    border: "1px solid rgb(var(--border))",
    borderRadius: "14px",
    color: "rgb(var(--foreground))",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
  }}
  itemStyle={{
    color: "rgb(var(--foreground))",
  }}
  labelStyle={{
    color: "rgb(var(--foreground))",
  }}
/>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}