import { LayoutDashboard, PlusCircle, Settings } from "lucide-react";

export const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    title: "Submit Ticket",
    href: "/submit-ticket",
    icon: PlusCircle,
    roles: ["admin", "user"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["admin"],
  },
];


// import { LayoutDashboard, PlusCircle, Settings } from "lucide-react";

// export const sidebarLinks = [
//   {
//     title: "Dashboard",
//     href: "/",
//     icon: LayoutDashboard,
//     roles: ["admin"],
//   },
//   {
//     title: "Submit Ticket",
//     href: "/submit-ticket",
//     icon: PlusCircle,
//     roles: ["admin", "user"],
//   },
//   {
//     title: "Settings",
//     href: "/settings",
//     icon: Settings,
//     roles: ["admin"],
//   },
// ];



