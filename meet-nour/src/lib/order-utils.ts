import type { OrderStatus } from "@/types/order";

export const STATUSES: OrderStatus[] = ["Pending", "Preparing", "Delivered"];

// 3 x 12.5 = 37.5  (rounded to 2 decimals)
export function calculateTotal(quantity: number, unitPrice: number) {
  return Number((quantity * unitPrice).toFixed(2));
}

// 37.5 -> "$37.50"
export function formatPrice(amount: number) {
  return "$" + amount.toFixed(2);
}

export function formatOrderDate(value: string | Date | null | undefined) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

// Keeps only digits, "+" and spaces, and groups the number: "+961 70000001" -> "+961 70 000 001"
export function formatPhone(input: string) {
  const text = input.replace(/[^\d+ ]/g, "");
  const [code, ...rest] = text.split(" "); // code = "+961", rest = the number
  const digits = rest.join("").replace(/\D/g, "");
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, " "); // groups of 3 from the right
  return rest.length > 0 ? `${code} ${grouped}` : code;
}

// "+961 70 000 001" is valid: a country code, a space, then 6 to 12 digits
export function isValidPhone(phone: string) {
  if (!/^\+\d{1,4} [\d ]+$/.test(phone)) return false;
  const numberDigits = phone.split(" ").slice(1).join("").length;
  return numberDigits >= 6 && numberDigits <= 12;
}
