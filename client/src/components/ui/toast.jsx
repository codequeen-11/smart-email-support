export default function Toast({ message, type = "success", onClose }) {
  const styles =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-slate-900";

  return (
    <div className={`fixed right-6 top-6 z-50 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-lg ${styles}`}>
      <div className="flex items-center gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          ×
        </button>
      </div>
    </div>
  );
}