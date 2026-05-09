import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { createTicket } from "../services/ticketService";

export default function SubmitTicketPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      loading: true,
      success: "",
      error: "",
    });

    try {
      await createTicket(formData);

      setStatus({
        loading: false,
        success: "Ticket submitted successfully.",
        error: "",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      setStatus({
        loading: false,
        success: "",
        error: error.message || "Something went wrong",
      });
    }
  };


  return (
  <DashboardLayout>
    <PageHeader
      title="Submit Ticket"
      description="Create a new support request for the system."
    />

    <Card className="max-w-3xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]">
                Full Name
              </label>
              <Input
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]">
              Subject
            </label>
            <Input
              name="subject"
              placeholder="Enter ticket subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]">
              Message
            </label>
            <textarea
              name="message"
              rows="6"
              placeholder="Describe the issue..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full resize-none rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-3 text-sm text-[rgb(var(--foreground))] outline-none placeholder:text-[rgb(var(--muted-foreground))] focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {status.success && (
            <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-600">
              {status.success}
            </div>
          )}

          {status.error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600">
              {status.error}
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={status.loading} className="h-11 rounded-xl">
              {status.loading ? "Submitting..." : "Submit Ticket"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </DashboardLayout>
);
}