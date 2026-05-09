import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Eye,
  Mail,
  MessageSquare,
  Tag,
  Trash2,
  User,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import ConfirmDialog from "../ui/confirm-dialog";
import {
  updateTicketStatus,
  deleteTicket as deleteTicketRequest,
} from "../../services/ticketService";
// import 

function getCategoryBadgeStyles(category) {
  switch (category) {
    case "Login Issue":
      return "bg-blue-50 text-blue-700 ring-blue-200";
    case "Payment Issue":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "Technical Bug":
      return "bg-red-50 text-red-700 ring-red-200";
    case "General Inquiry":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    default:
      return "bg-slate-50 text-slate-700 ring-slate-200";
  }
}

function getStatusBadgeStyles(status) {
  switch (status) {
    case "Open":
      return "bg-red-50 text-red-700 ring-red-200";
    case "In Progress":
      return "bg-blue-50 text-blue-700 ring-blue-200";
    case "Resolved":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    default:
      return "bg-[rgb(var(--muted))] text-slate-700 ring-slate-200";
  }
}

export default function TicketCard({
  ticket,
  onStatusUpdated,
  onTicketDeleted,
}) {
  const [status, setStatus] = useState(ticket.status || "Open");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const previousStatus = status;

    setStatus(newStatus);
    setUpdating(true);

    try {
      const updatedTicket = await updateTicketStatus(ticket._id, newStatus);
      onStatusUpdated(updatedTicket);
    } catch (error) {
      console.error(error);
      setStatus(previousStatus);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await deleteTicketRequest(ticket._id);
      onTicketDeleted(ticket._id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  // return (
  //   <>
  //     <Card className="group overflow-hidden border-slate-200  bg-[rgb(var(--muted))] dark:border-slate-800 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
  //       <CardContent className="p-0">
  //         <div className="border-b border-slate-100 p-5">
  //           <div className="flex items-start justify-between gap-4">
  //             <div className="min-w-0">
  //               <h3 className="line-clamp-2 text-lg font-black tracking-tight text-[rgba(var(--foreground))]">
  //                 {ticket.subject}
  //               </h3>

  //               <div className="mt-3 flex flex-wrap items-center gap-2">
  //                 <span
  //                   className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ring-1 ${getCategoryBadgeStyles(
  //                     ticket.category
  //                   )}`}
  //                 >
  //                   <Tag size={13} />
  //                   {ticket.category}
  //                 </span>

  //                 <span
  //                   className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ring-1 ${getStatusBadgeStyles(
  //                     status
  //                   )}`}
  //                 >
  //                   <Clock size={13} />
  //                   {status}
  //                 </span>
  //               </div>
  //             </div>

  //             <Link to={`/tickets/${ticket._id}`}>
  //               <Button
  //                 type="button"
  //                 className="h-10 rounded-xl bg-slate-900 px-3 hover:bg-slate-800"
  //               >
  //                 <Eye size={16} />
  //               </Button>
  //             </Link>
  //           </div>
  //         </div>

  //         <div className="space-y-4 p-5">
  //           <div className="grid gap-3 text-sm text-[rgb(var(--muted-foreground))]">
  //             <div className="flex items-center gap-2">
  //               <User size={16} className="text-[rgb(var(--muted-foreground))]" />
  //               <span className="font-semibold text-[rgb(var(--foreground))]">
  //                 {ticket.name}
  //               </span>
  //             </div>

  //             <div className="flex items-center gap-2">
  //               <Mail size={16} className="text-[rgb(var(--muted-foreground))]" />
  //               <span className="truncate">{ticket.email}</span>
  //             </div>
  //           </div>

  //           <div className="rounded-2xl bg-[rgb(var(--muted))] p-4">
  //             <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[rgb(var(--foreground))]">
  //               <MessageSquare size={16} />
  //               Message
  //             </div>
  //             <p className="line-clamp-3 text-sm leading-6 text-[rgba(var(--foreground))]">
  //               {ticket.message}
  //             </p>
  //           </div>

  //           {ticket.aiReply && (
  //             <div className="rounded-2xl border border-blue-100 bg p-4">
  //               <p className="mb-2 text-sm font-bold text-blue-900">
  //                 Suggested Reply
  //               </p>
  //               <p className="line-clamp-3 text-sm leading-6 text-blue-900">
  //                 {ticket.aiReply}
  //               </p>
  //             </div>
  //           )}

  //           <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
  //             <div>
  //               <label className="mb-2 block text-sm font-semibold text-[rgba(var(--foreground))]">
  //                 Status
  //               </label>
  //               <Select
  //                 value={status}
  //                 onChange={handleStatusChange}
  //                 disabled={updating}
  //                 className="h-11 rounded-xl"
  //               >
  //                 <option value="Open">Open</option>
  //                 <option value="In Progress">In Progress</option>
  //                 <option value="Resolved">Resolved</option>
  //               </Select>
  //             </div>

  //             <Button
  //               type="button"
  //               onClick={() => setDeleteDialogOpen(true)}
  //               className="h-11 gap-2 rounded-xl bg-red-600 px-4 hover:bg-red-700"
  //             >
  //               <Trash2 size={16} />
  //               Delete
  //             </Button>
  //           </div>

  //           <div className="border-t border-slate-100 pt-4 text-xs text-slate-500">
  //             Created: {new Date(ticket.createdAt).toLocaleString()}
  //           </div>
  //         </div>
  //       </CardContent>
  //     </Card>

  //     <ConfirmDialog
  //       open={deleteDialogOpen}
  //       title="Delete ticket?"
  //       description="This action cannot be undone. The ticket will be permanently removed from your database."
  //       confirmText="Delete ticket"
  //       loading={deleting}
  //       onConfirm={handleDelete}
  //       onCancel={() => setDeleteDialogOpen(false)}
  //     />
  //   </>
  // );


  return (
  <>
    <Card className="group overflow-hidden border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-0">
        <div className="border-b border-[rgb(var(--border))] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-lg font-black tracking-tight text-[rgb(var(--foreground))]">
                {ticket.subject}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ring-1 ${getCategoryBadgeStyles(
                    ticket.category
                  )}`}
                >
                  <Tag size={13} />
                  {ticket.category}
                </span>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ring-1 ${getStatusBadgeStyles(
                    status
                  )}`}
                >
                  <Clock size={13} />
                  {status}
                </span>
              </div>
            </div>

            <Link to={`/tickets/${ticket._id}`}>
              <Button
                type="button"
                className="h-10 gap-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))] px-3 text-[rgb(var(--foreground))] hover:bg-[rgb(var(--background))]"
              >
                <Eye size={16} />
                <span className="hidden sm:inline">Details</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="grid gap-3 text-sm text-[rgb(var(--muted-foreground))]">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="font-semibold text-[rgb(var(--foreground))]">
                {ticket.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span className="truncate">{ticket.email}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[rgb(var(--foreground))]">
              <MessageSquare size={16} />
              Message
            </div>
            <p className="line-clamp-3 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
              {ticket.message}
            </p>
          </div>

          {ticket.aiReply && (
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
              <p className="mb-2 text-sm font-bold text-blue-500">
                Suggested Reply
              </p>
              <p className="line-clamp-3 text-sm leading-6 text-blue-600 dark:text-blue-300">
                {ticket.aiReply}
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[rgb(var(--foreground))]">
                Status
              </label>
              <Select
                value={status}
                onChange={handleStatusChange}
                disabled={updating}
                className="h-11 rounded-xl"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </Select>
            </div>

            <Button
              type="button"
              onClick={() => setDeleteDialogOpen(true)}
              className="h-11 gap-2 rounded-xl bg-red-600 px-4 text-white hover:bg-red-700"
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </div>

          <div className="border-t border-[rgb(var(--border))] pt-4 text-xs text-[rgb(var(--muted-foreground))]">
            Created: {new Date(ticket.createdAt).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>

    <ConfirmDialog
      open={deleteDialogOpen}
      title="Delete ticket?"
      description="This action cannot be undone. The ticket will be permanently removed from your database."
      confirmText="Delete ticket"
      loading={deleting}
      onConfirm={handleDelete}
      onCancel={() => setDeleteDialogOpen(false)}
    />
  </>
);
}