import { NextResponse } from "next/server";
import type { Order } from "@/types/order";
import { readOrders, writeOrders } from "@/lib/orders-storage";
import { validateOrder } from "@/lib/validate";
import { calculateTotal } from "@/lib/order-utils";
import { errorResponse } from "@/lib/response";

type Context = { params: Promise<{ id: string }> };

// GET /api/orders/NC-123 -> one order
export async function GET(request: Request, { params }: Context) {
  const { id } = await params;
  try {
    const orders = await readOrders();
    const order = orders.find((o) => o.id === id);
    if (!order) return errorResponse("Order not found", 404);
    return NextResponse.json(order);
  } catch {
    return errorResponse("Could not load the order", 500);
  }
}

// PATCH /api/orders/NC-123 -> update some fields
export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;

  let data;
  try {
    data = await request.json();
  } catch {
    return errorResponse("Invalid JSON", 400);
  }

  const errors = validateOrder(data, false);
  if (Object.keys(errors).length > 0) {
    return errorResponse("Validation failed", 400, errors);
  }

  // Only copy the fields we allow. "id" and "total" are ignored on purpose.
  const allowed = ["customerName", "phone", "productName", "quantity", "unitPrice", "status"];
  const updates: any = {};
  for (const key of allowed) {
    if (key in data) {
      updates[key] = typeof data[key] === "string" ? data[key].trim() : data[key];
    }
  }
  if (Object.keys(updates).length === 0) {
    return errorResponse("No valid fields to update", 400);
  }

  try {
    const orders = await readOrders();
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return errorResponse("Order not found", 404);

    const updated: Order = { ...orders[index], ...updates };
    // the total only changes when quantity or unit price changes
    if ("quantity" in updates || "unitPrice" in updates) {
      updated.total = calculateTotal(updated.quantity, updated.unitPrice);
    }

    orders[index] = updated;
    await writeOrders(orders);
    return NextResponse.json(updated);
  } catch {
    return errorResponse("Could not update the order", 500);
  }
}

// DELETE /api/orders/NC-123
export async function DELETE(request: Request, { params }: Context) {
  const { id } = await params;
  try {
    const orders = await readOrders();
    const remaining = orders.filter((o) => o.id !== id);
    if (remaining.length === orders.length) return errorResponse("Order not found", 404);

    await writeOrders(remaining);
    return NextResponse.json({ message: "Order deleted" });
  } catch {
    return errorResponse("Could not delete the order", 500);
  }
}
