
import { Bug, CreditCard, HelpCircle, KeyRound, Ticket } from "lucide-react";
import StatsCard from "./StatsCard";

export default function DashboardStats({ stats }) {
  return (
    <section className="grid min-w-0 gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
      <StatsCard title="Total Tickets" value={stats.total} icon={Ticket} />
      <StatsCard title="Login Issues" value={stats.login} icon={KeyRound} />
      <StatsCard title="Payment Issues" value={stats.payment} icon={CreditCard} />
      <StatsCard title="Technical Bugs" value={stats.technical} icon={Bug} />
      <StatsCard title="General Inquiries" value={stats.general} icon={HelpCircle} />
    </section>
  );
}