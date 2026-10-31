import type { OrderStatus } from "@/types/order";

// An icon is used together with the text so color is not the only signal
const styles: Record<OrderStatus, { icon: string; classes: string }> = {
  Pending: { icon: "○", classes: "bg-amber-100 text-amber-900" },
  Preparing: { icon: "◐", classes: "bg-sky-100 text-sky-900" },
  Delivered: { icon: "✓", classes: "bg-sage-soft text-sage-dark" },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const style = styles[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${style.classes}`}>
      <span aria-hidden="true">{style.icon}</span>
      {status}
    </span>
  );
}
