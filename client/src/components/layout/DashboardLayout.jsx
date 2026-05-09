// // import React from "react";
// // import AppSidebar from "./AppSidebar";
// // import Topbar from "./Topbar";

// // export default function DashboardLayout({ children }) {
// //   return (
// //     <div className="min-h-screen bg-slate-50 text-slate-900">
// //       <div className="flex min-h-screen">
// //         <AppSidebar />
// //         <div className="flex min-w-0 flex-1 flex-col">
// //           <Topbar />
// //           <main className="flex-1 p-6">{children}</main>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { Menu } from "lucide-react";
// import AppSidebar from "./AppSidebar";
// import Topbar from "./Topbar";

// export default function DashboardLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     // <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-900">
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
//       <div className="flex min-h-screen">
//         <AppSidebar
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />

//         <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
//           <div className="flex items-center gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80  lg:hidden">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="rounded-xl border border-slate-200 p-2"
//             >
//               <Menu size={22} />
//             </button>
//             <div>
//               <h1 className="text-lg font-bold">Smart Support</h1>
//               <p className="text-xs text-slate-500">AI Support Automation</p>
//             </div>
//           </div>

//           <Topbar />

//           {/* <main className="flex-1 p-4 md:p-6 lg:p-8">
//             <div className="mx-auto max-w-7xl">{children}</div>
//           </main> */}
//             <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-5 lg:p-8">
//     <div className="mx-auto w-full max-w-7xl overflow-hidden">{children}</div>
//   </main>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { Menu } from "lucide-react";
// import AppSidebar from "./AppSidebar";
// import Topbar from "./Topbar";

// export default function DashboardLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors">
//       <div className="flex h-screen overflow-hidden">
//         <AppSidebar
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />

//         <div className="flex min-w-0 flex-1 flex-col overflow-y-auto shrink-0 sticky top-0 z-30">
//           <div className="flex items-center gap-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 lg:hidden">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="rounded-xl border border-[rgb(var(--border))] p-2"
//             >
//               <Menu size={22} />
//             </button>
//             <h1 className="font-bold">Smart Support</h1>
//           </div>

//           <Topbar />

//           <main className="flex-1 p-4 sm:p-5 lg:p-8">
//             <div className="mx-auto w-full max-w-7xl">{children}</div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Topbar from "./Topbar";
import NotificationDropdown from "./NotificationDropdown";
import { applyTheme, getInitialTheme } from "../../utils/theme";
import { logout } from "../../utils/auth";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors">
      <div className="flex h-full overflow-hidden">
        <AppSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="shrink-0 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="shrink-0 rounded-xl border border-[rgb(var(--border))] p-2"
                >
                  <Menu size={22} />
                </button>

                <div className="min-w-0">
                  <h1 className="truncate text-sm font-bold text-[rgb(var(--foreground))]">
                    Smart Support
                  </h1>
                  <p className="truncate text-xs text-[rgb(var(--muted-foreground))]">
                    AI Support Automation
                  </p>
                </div>
              </div>

              <MobileHeaderActions />
            </div>
          </div>

          <div className="shrink-0">
            <Topbar />
          </div>

          <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileHeaderActions() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex shrink-0 items-center gap-2">
      <NotificationDropdown />

      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3 transition hover:bg-[rgb(var(--muted))]"
      >
        {theme === "dark" ? (
          <Sun size={18} className="text-yellow-400" />
        ) : (
          <Moon size={18} className="text-[rgb(var(--muted-foreground))]" />
        )}
      </button>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-2xl bg-red-600 p-3 text-white transition hover:bg-red-700"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}