import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { getTicketById } from "../services/ticketService";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTicket() {
      try {
        const result = await getTicketById(id);
        setTicket(result);
      } catch (err) {
        setError(err.message || "Failed to load ticket");
      } finally {
        setLoading(false);
      }
    }

    loadTicket();
  }, [id]);

  return (
    <DashboardLayout>
      <PageHeader
        title="Ticket Details"
        description="View the full support request and suggested response."
        action={
          <Link to="/">
            <Button>Back to Dashboard</Button>
          </Link>
        }
      />

      {loading && <p className="text-slate-500">Loading ticket...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {ticket && (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card>
            <CardContent className="space-y-5 p-6">
              <div>
                <p className="text-sm text-slate-500">Subject</p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {ticket.subject}
                </h2>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">Message</p>
                <p className="mt-2 rounded-xl bg-slate-50 p-4 text-slate-700">
                  {ticket.message}
                </p>
              </div>

              {ticket.aiReply && (
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    Suggested Reply
                  </p>
                  <p className="mt-2 rounded-xl bg-blue-50 p-4 text-blue-700">
                    {ticket.aiReply}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Customer Info
              </h3>

              <p>
                <span className="font-semibold">Name:</span> {ticket.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {ticket.email}
              </p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {ticket.category}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {ticket.status}
              </p>
              <p>
                <span className="font-semibold">Created:</span>{" "}
                {new Date(ticket.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}