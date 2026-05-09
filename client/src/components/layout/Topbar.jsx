// import { useNavigate } from "react-router-dom";
// import { Bell, Search, LogOut } from "lucide-react";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { getCurrentUser, logout } from "../../utils/auth";

// export default function Topbar() {
//   const navigate = useNavigate();
//   const user = getCurrentUser();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
//         <p className="text-sm text-slate-500">
//           Logged in as {user?.name || "User"} ({user?.role || "user"})
//         </p>
//       </div>

//       <div className="flex items-center gap-3">
//         <div className="relative hidden w-full min-w-[240px] md:block">
//           <Search
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//           />
//           <Input placeholder="Search..." className="pl-10" />
//         </div>

//         <button className="rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
//           <Bell size={18} className="text-slate-600" />
//         </button>

//         <Button
//           type="button"
//           onClick={handleLogout}
//           className="gap-2 bg-red-600 hover:bg-red-700"
//         >
//           <LogOut size={16} />
//           Logout
//         </Button>
//       </div>
//     </header>
//   );
// }

import { useNavigate } from "react-router-dom";
import { Search, LogOut } from "lucide-react";
import { Moon, Sun } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getCurrentUser, logout } from "../../utils/auth";
import { useEffect, useState } from "react";
import { applyTheme, getInitialTheme } from "../../utils/theme";
import NotificationDropdown from "./NotificationDropdown";
export default function Topbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [theme, setTheme] = useState(getInitialTheme());

useEffect(() => {
  applyTheme(theme);
}, [theme]);

const toggleTheme = () => {
  setTheme((prev) => (prev === "dark" ? "light" : "dark"));
};

//   return (
//     <header className="hidden border-b border-slate-200 bg-[rgb(var(--background))] px-8 py-5 backdrop-blur lg:block">
//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
//         <div>
//           <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Dashboard</h1>
//           <p className="text-sm text-slate-500">
//             Logged in as{" "}
//             <span className="font-semibold text-[rgba(var(--primary))]">
//               {user?.name || "User"}
//             </span>{" "}
//             ({user?.role || "user"})
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="relative w-[320px]">
//             <Search
//               size={18}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//             />
//             <Input
//               placeholder="Search..."
//               className="h-12 rounded-2xl border-slate-200 bg-white pl-11"
//             />
//           </div>

//           <button className="rounded-2xl border border-slate-200 bg-white p-3 hover:bg-slate-50">
//             <Bell size={19} className="text-slate-600" />
//           </button>
//                    <button
//   type="button"
//   onClick={toggleTheme}
//   className="rounded-2xl border border-slate-200 bg-white p-3 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
// >
//   {theme === "dark" ? (
//     <Sun size={19} className="text-yellow-400" />
//   ) : (
//     <Moon size={19} className="text-slate-600" />
//   )}
// </button>
//           <Button
//             type="button"
//             onClick={handleLogout}
//             className="h-12 gap-2 rounded-2xl bg-red-600 px-5 hover:bg-red-700"
//           >
    
//             <LogOut size={16} />
//             Logout
//           </Button>
//         </div>
//       </div>
//     </header>
//   );

return (
  <header className="hidden border-b border-[rgb(var(--border))] bg-[rgb(var(--background))] px-8 py-5 backdrop-blur lg:block">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
      
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">
          Dashboard
        </h1>

        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Logged in as{" "}
          <span className="font-semibold text-[rgb(var(--primary))]">
            {user?.name || "User"}
          </span>{" "}
          ({user?.role || "user"})
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        
        {/* Search */}
        <div className="relative w-[320px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]"
          />

          <Input
            placeholder="Search..."
            className="h-12 rounded-2xl pl-11"
          />
        </div>

        {/* Notifications */}
        {/* <button className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3 transition hover:bg-[rgb(var(--muted))]">
          <Bell size={19} className="text-[rgb(var(--muted-foreground))]" />
        </button> */}
        <NotificationDropdown />
        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3 transition hover:bg-[rgb(var(--muted))]"
        >
          {theme === "dark" ? (
            <Sun size={19} className="text-yellow-400" />
          ) : (
            <Moon size={19} className="text-[rgb(var(--muted-foreground))]" />
          )}
        </button>

        {/* Logout */}
        <Button
          type="button"
          onClick={handleLogout}
          className="h-12 gap-2 rounded-2xl bg-red-600 px-5 text-white hover:bg-red-700"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </div>
  </header>
);
}