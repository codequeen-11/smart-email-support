import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "../ui/card";

export default function TicketsTrendChart({ data }) {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-lg font-bold text-[rgb(var(--foreground))]">
          Ticket Creation Trend
        </h3>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Track how many tickets are created over time.
        </p>

        <div className="mt-5 h-[260px] w-full min-w-0 sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="rgb(var(--border))" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "rgb(var(--muted-foreground))" }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "rgb(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--card))",
                  border: "1px solid rgb(var(--border))",
                  color: "rgb(var(--foreground))",
                  borderRadius: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}