import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import type { Order } from "@/types/order";
import { insertOrder, readOrders } from "@/lib/orders-storage";
import { connectionDb } from "@/lib/mongodb";
import { validateOrder } from "@/lib/validate";
import { calculateTotal } from "@/lib/order-utils";
import { errorResponse } from "@/lib/response";

// GET /api/orders -> all orders
export async function GET() {
  try {
    const orders = await readOrders(await connectionDb());
    return NextResponse.json(orders);
  } catch {
    return errorResponse("Could not load orders", 500);
  }
}

// POST /api/orders -> create an order
export async function POST(request: Request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return errorResponse("Invalid JSON", 400);
  }

  const errors = validateOrder(data, true);
  if (Object.keys(errors).length > 0) {
    return errorResponse("Validation failed", 400, errors);
  }

  try {
    const db = await connectionDb();
    // id, status and total are decided by the server, never by the client
    const newOrder: Order = {
      id: "NC-" + randomUUID().slice(0, 8).toUpperCase(),
      customerName: data.customerName.trim(),
      phone: data.phone.trim(),
      productName: data.productName.trim(),
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      total: calculateTotal(data.quantity, data.unitPrice),
      status: "Pending",
      date: new Date(),
    };

    await insertOrder(db, newOrder);
    return NextResponse.json(newOrder, { status: 201 });
  } catch {
    return errorResponse("Could not save the order", 500);
  }
}
