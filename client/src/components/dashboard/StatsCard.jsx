import { Card, CardContent } from "../ui/card";

export default function StatsCard({ title, value, icon: Icon }) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
            {title}
          </p>

          {Icon && (
            <div className="rounded-xl bg-[rgb(var(--muted))] p-2 text-[rgb(var(--foreground))]">
              <Icon size={18} />
            </div>
          )}
        </div>

        <h3 className="mt-4 text-4xl font-black tracking-tight text-[rgb(var(--foreground))]">
          {value}
        </h3>
      </CardContent>
    </Card>
  );
}