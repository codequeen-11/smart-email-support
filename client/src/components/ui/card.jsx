export function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}