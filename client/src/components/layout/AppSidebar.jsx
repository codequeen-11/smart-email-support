// import { NavLink } from "react-router-dom";
// import { sidebarLinks } from "../../data/sidebarLinks";
// import { getCurrentUser } from "../../utils/auth";

// export default function AppSidebar() {
//   const user = getCurrentUser();
//   const role = user?.role || "user";

//   const visibleLinks = sidebarLinks.filter((item) =>
//     item.roles.includes(role)
//   );

//   return (
//     <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
//       <div className="flex h-20 items-center border-b border-slate-200 px-6">
//         <div>
//           <h2 className="text-xl font-bold text-slate-900">Smart Support</h2>
//           <p className="text-sm text-slate-500">
//             {role === "admin" ? "Admin Panel" : "User Portal"}
//           </p>
//         </div>
//       </div>

//       <nav className="space-y-2 p-4">
//         {visibleLinks.map((item) => {
//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.title}
//               to={item.href}
//               className={({ isActive }) =>
//                 `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
//                   isActive
//                     ? "bg-slate-900 text-white"
//                     : "text-slate-600 hover:bg-slate-100"
//                 }`
//               }
//             >
//               <Icon size={18} />
//               {item.title}
//             </NavLink>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

// import { NavLink } from "react-router-dom";
// import { X, ShieldCheck } from "lucide-react";
// import { sidebarLinks } from "../../data/sidebarLinks";
// import { getCurrentUser } from "../../utils/auth";

// export default function AppSidebar({ sidebarOpen, setSidebarOpen }) {
//   const user = getCurrentUser();
//   const role = user?.role || "user";

//   const visibleLinks = sidebarLinks.filter((item) =>
//     item.roles.includes(role)
//   );

//   return (
//     <>
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 lg:static lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex h-24 items-center justify-between border-b border-slate-200 px-6">
//           <div className="flex items-center gap-3">
//             <div className="rounded-2xl bg-slate-900 p-3 dark:bg-slate-900 text-white">
//               <ShieldCheck size={24} />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//                 Smart Support
//               </h2>
//               <p className="text-sm text-slate-500">
//                 {role === "admin" ? "Admin Panel" : "User Portal"}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="rounded-xl border border-slate-200 p-2 lg:hidden"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         <nav className="flex-1 space-y-2 p-4">
//           {visibleLinks.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.title}
//                 to={item.href}
//                 onClick={() => setSidebarOpen(false)}
//                 className={({ isActive }) =>
//                   `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
//                     isActive
//                       ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
//                       : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//                   }`
//                 }
//               >
//                 <Icon size={19} />
//                 {item.title}
//               </NavLink>
//             );
//           })}
//         </nav>

//         <div className="border-t border-slate-200 p-4">
//           <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
//             <p className="text-sm font-semibold text-slate-900 dark:text-white">
//               {user?.name || "User"}
//             </p>
//             <p className="truncate text-xs text-slate-500">{user?.email}</p>
//             <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
//               {role}
//             </span>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }


// import { NavLink } from "react-router-dom";
// import { X, ShieldCheck } from "lucide-react";
// import { sidebarLinks } from "../../data/sidebarLinks";
// import { getCurrentUser } from "../../utils/auth";

// export default function AppSidebar({ sidebarOpen, setSidebarOpen }) {
//   const user = getCurrentUser();
//   const role = user?.role || "user";

//   const [showEmail, setShowEmail] = useState(false);
//   const visibleLinks = sidebarLinks.filter((item) =>
//     item.roles.includes(role)
//   );

//   return (
//     <>
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-[rgb(var(--border))] bg-[rgb(var(--card))] transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Logo area - fixed top */}
//         <div className="shrink-0 border-b border-[rgb(var(--border))] px-5 py-5">
//           <div className="flex items-center justify-between gap-3">
//             <div className="flex min-w-0 items-center gap-3">
//               <div className="shrink-0 rounded-2xl bg-[rgb(var(--primary))] p-3 text-[rgb(var(--primary-foreground))]">
//                 <ShieldCheck size={24} />
//               </div>

//               <div className="min-w-0">
//                 <h2 className="truncate text-xl font-bold text-[rgb(var(--foreground))]">
//                   Smart Support
//                 </h2>
//                 <p className="truncate text-sm text-[rgb(var(--muted-foreground))]">
//                   {role === "admin" ? "Admin Panel" : "User Portal"}
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="shrink-0 rounded-xl border border-[rgb(var(--border))] p-2 lg:hidden"
//             >
//               <X size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Navigation - only this part can scroll if many links */}
//         <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
//           {visibleLinks.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.title}
//                 to={item.href}
//                 onClick={() => setSidebarOpen(false)}
//                 className={({ isActive }) =>
//                   `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
//                     isActive
//                       ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] shadow-lg shadow-slate-900/15"
//                       : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
//                   }`
//                 }
//               >
//                 <Icon size={19} />
//                 {item.title}
//               </NavLink>
//             );
//           })}
//         </nav>

//         {/* User area - always visible bottom */}
//         <div className="shrink-0 border-t border-[rgb(var(--border))] p-4">
//           <div className="rounded-2xl bg-[rgb(var(--muted))] p-4">
//             <p className="truncate text-sm font-semibold text-[rgb(var(--foreground))]">
//               {user?.name || "User"}
//             </p>
//             <p className="mt-1 truncate text-xs text-[rgb(var(--muted-foreground))]">
//               {user?.email || "No email"}
//             </p>
//             <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
//               {role}
//             </span>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }


// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { ShieldCheck, X } from "lucide-react";

// export default function AppSidebar({
//   sidebarOpen,
//   setSidebarOpen,
//   sidebarLinks,
//   user,
// }) {
//   const role = user?.role || "user";

//   // ✅ ADDED: toggle email visibility
//   const [showEmail, setShowEmail] = useState(false);

//   const visibleLinks = sidebarLinks.filter((item) =>
//     item.roles.includes(role)
//   );

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShieldCheck, X } from "lucide-react";
import { sidebarLinks } from "../../data/sidebarLinks";
import { getCurrentUser } from "../../utils/auth";

export default function AppSidebar({ sidebarOpen, setSidebarOpen }) {
  const user = getCurrentUser();
  const role = user?.role || "user";

  const [showEmail, setShowEmail] = useState(false);

  const visibleLinks = sidebarLinks.filter((item) =>
    item.roles.includes(role)
  );


  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-[rgb(var(--border))] bg-[rgb(var(--card))] transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo area */}
        <div className="shrink-0 border-b border-[rgb(var(--border))] px-5 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="shrink-0 rounded-2xl bg-[rgb(var(--primary))] p-3 text-[rgb(var(--primary-foreground))]">
                <ShieldCheck size={24} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-[rgb(var(--foreground))]">
                  Smart Support
                </h2>

                <p className="truncate text-sm text-[rgb(var(--muted-foreground))]">
                  {role === "admin" ? "Admin Panel" : "User Portal"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="shrink-0 rounded-xl border border-[rgb(var(--border))] p-2 lg:hidden"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
          {visibleLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] shadow-lg shadow-slate-900/15"
                      : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
                  }`
                }
              >
                <Icon size={19} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        {/* ✅ Modern User Area */}
        <div className="shrink-0 border-t border-[rgb(var(--border))] p-4">
          <button
            type="button"
            onClick={() => setShowEmail((prev) => !prev)}
            className="w-full rounded-2xl bg-[rgb(var(--muted))] p-4 text-left transition hover:opacity-90"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {/* User name */}
                <p className="truncate text-sm font-semibold text-[rgb(var(--foreground))]">
                  {user?.name || "User"}
                </p>

                {/* Role */}
                <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                  {role}
                </span>

                {/* Hidden email */}
                {showEmail && (
                  <p className="mt-3 truncate text-xs text-[rgb(var(--muted-foreground))]">
                    {user?.email || "No email"}
                  </p>
                )}
              </div>

              {/* Small helper text */}
              <div className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">
                {showEmail ? "Hide" : "Info"}
              </div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}