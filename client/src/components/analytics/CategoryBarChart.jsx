import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "../ui/card";

export default function CategoryBarChart({ data }) {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-lg font-bold text-[rgb(var(--foreground))]">
          Tickets by Category
        </h3>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Overview of ticket classification distribution.
        </p>

        <div className="mt-5 h-[260px] w-full min-w-0 sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="rgb(var(--border))" strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
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
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}