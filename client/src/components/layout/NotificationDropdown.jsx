// import { useEffect, useMemo, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Bell, CheckCheck } from "lucide-react";
// import { getTickets } from "../../services/ticketService";

// export default function NotificationDropdown() {
//   const [open, setOpen] = useState(false);
//   const [tickets, setTickets] = useState([]);
//   const [readIds, setReadIds] = useState(() => {
//     const saved = localStorage.getItem("readNotifications");
//     return saved ? JSON.parse(saved) : [];
//   });
//   const dropdownRef = useRef(null);
//   useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (
//       dropdownRef.current &&
//       !dropdownRef.current.contains(event.target)
//     ) {
//       setOpen(false);
//     }
//   };

//   document.addEventListener("mousedown", handleClickOutside);

//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, []);
// const navigate = useNavigate();
// const handleNotificationClick = (id) => {
//   const updatedReadIds = [...new Set([...readIds, id])];

//   setReadIds(updatedReadIds);
//   localStorage.setItem("readNotifications", JSON.stringify(updatedReadIds));

//   setOpen(false);
//   navigate(`/tickets/${id}`);
// };
//   useEffect(() => {
//     async function loadTickets() {
//       try {
//         const data = await getTickets();
//         setTickets(data.slice(0, 6));
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     loadTickets();
//   }, []);

//   const notifications = useMemo(() => {
//     return tickets.map((ticket) => ({
//       id: ticket._id,
//       title: "New support ticket",
//       message: `${ticket.subject} • ${ticket.category}`,
//       createdAt: ticket.createdAt,
//     }));
//   }, [tickets]);

//   const unreadCount = notifications.filter(
//     (item) => !readIds.includes(item.id)
//   ).length;

//   const markAllAsRead = () => {
//     const ids = notifications.map((item) => item.id);
//     setReadIds(ids);
//     localStorage.setItem("readNotifications", JSON.stringify(ids));
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         type="button"
//         onClick={() => setOpen((prev) => !prev)}
//         className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3 transition hover:bg-[rgb(var(--muted))]"
//       >
//         <Bell size={19} className="text-[rgb(var(--muted-foreground))]" />

//         {unreadCount > 0 && (
//           <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-2xl">
//           <div className="flex items-center justify-between border-b border-[rgb(var(--border))] px-4 py-3">
//             <div>
//               <h3 className="text-sm font-bold text-[rgb(var(--foreground))]">
//                 Notifications
//               </h3>
//               <p className="text-xs text-[rgb(var(--muted-foreground))]">
//                 Recent ticket activity
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={markAllAsRead}
//               className="rounded-xl p-2 text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]"
//               title="Mark all as read"
//             >
//               <CheckCheck size={17} />
//             </button>
//           </div>

//           <div className="max-h-80 overflow-y-auto">
//             {notifications.length === 0 ? (
//               <div className="p-5 text-center text-sm text-[rgb(var(--muted-foreground))]">
//                 No notifications yet.
//               </div>
//             ) : (
//               notifications.map((item) => {
//                 const unread = !readIds.includes(item.id);

//                 return (
//                 //   <div
//                 <button
//   key={item.id}
//   type="button"
//   onClick={() => handleNotificationClick(item.id)}
//   className="w-full border-b border-[rgb(var(--border))] px-4 py-3 text-left last:border-b-0 hover:bg-[rgb(var(--muted))]"
// > 
//                 {/* //     key={item.id}
//                 //     className="border-b border-[rgb(var(--border))] px-4 py-3 last:border-b-0 hover:bg-[rgb(var(--muted))]"
//                 //   > */}
//                     <div className="flex gap-3">
//                       <span
//                         className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
//                           unread ? "bg-red-500" : "bg-transparent"
//                         }`}
//                       />

//                       <div className="min-w-0">
//                         <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
//                           {item.title}
//                         </p>
//                         <p className="mt-1 truncate text-xs text-[rgb(var(--muted-foreground))]">
//                           {item.message}
//                         </p>
//                         <p className="mt-2 text-[11px] text-[rgb(var(--muted-foreground))]">
//                           {new Date(item.createdAt).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   </button>
//                 );
//               })
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck } from "lucide-react";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../services/notificationService";

export default function NotificationDropdown() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const unreadCount = notifications.filter((item) => !item.read).length;

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.read) {
        const updated = await markNotificationAsRead(notification._id);

        setNotifications((prev) =>
          prev.map((item) => (item._id === updated._id ? updated : item))
        );
      }

      setOpen(false);

      if (notification.ticket) {
        navigate(`/tickets/${notification.ticket}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          read: true,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          if (!open) loadNotifications();
        }}
        className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3 transition hover:bg-[rgb(var(--muted))]"
      >
        <Bell size={19} className="text-[rgb(var(--muted-foreground))]" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed left-4 right-4 top-16 z-50  overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-80">
          <div className="flex items-center justify-between border-b border-[rgb(var(--border))] px-4 py-3">
            <div>
              <h3 className="text-sm font-bold text-[rgb(var(--foreground))]">
                Notifications
              </h3>
              <p className="text-xs text-[rgb(var(--muted-foreground))]">
                Recent ticket activity
              </p>
            </div>

            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="rounded-xl p-2 text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]"
              title="Mark all as read"
            >
              <CheckCheck size={17} />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-5 text-center text-sm text-[rgb(var(--muted-foreground))]">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-5 text-center text-sm text-[rgb(var(--muted-foreground))]">
                No notifications yet.
              </div>
            ) : (
              notifications.map((item) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => handleNotificationClick(item)}
                  className="w-full border-b border-[rgb(var(--border))] px-4 py-3 text-left last:border-b-0 hover:bg-[rgb(var(--muted))]"
                >
                  <div className="flex gap-3">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        !item.read ? "bg-red-500" : "bg-transparent"
                      }`}
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                        {item.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-[rgb(var(--muted-foreground))]">
                        {item.message}
                      </p>
                      <p className="mt-2 text-[11px] text-[rgb(var(--muted-foreground))]">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}