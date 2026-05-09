// export default function PageHeader({ title, description, action }) {
//   return (
//     <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
//         <p className="mt-1 text-sm text-slate-500">{description}</p>
//       </div>
//       {action && <div>{action}</div>}
//     </div>
//   );
// }

// export default function PageHeader({ title, description, action }) {
//   return (
//     <div className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-3xl font-black tracking-tight text-slate-950">
//             {title}
//           </h1>
//           <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
//             {description}
//           </p>
//         </div>

//         {action && <div>{action}</div>}
//       </div>
//     </div>
//   );
// }



// export default function PageHeader({ title, description, action }) {
//   return (
//     <div className="mb-6 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6">
//       <div className="flex min-w-0 flex-col gap-4">
//         <div className="min-w-0">
//           <h1 className="break-words text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
//             {title}
//           </h1>

//           <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-slate-500 sm:text-base">
//             {description}
//           </p>
//         </div>

//         {action && <div className="w-full sm:w-auto">{action}</div>}
//       </div>
//     </div>
//   );
// }

export default function PageHeader({ title, description, action }) {
  return (
    <div className="mb-6 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[rgb(var(--foreground))] sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">
            {description}
          </p>
        </div>

        {action && <div className="w-full sm:w-auto">{action}</div>}
      </div>
    </div>
  );
}