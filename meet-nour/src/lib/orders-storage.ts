import fs from "node:fs/promises";
import path from "node:path";
import type { Order } from "@/types/order";

// The "database": orders/orders.json in the project root
const folder = path.join(process.cwd(), "orders");
const file = path.join(folder, "orders.json");

export async function readOrders(): Promise<Order[]> {
  try {
    const text = await fs.readFile(file, "utf-8");
    return JSON.parse(text); // throws if the JSON is broken (we never overwrite the file in that case)
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // the file doesn't exist yet, so create it with an empty list
      await fs.mkdir(folder, { recursive: true });
      await fs.writeFile(file, "[]");
      return [];
    }
    throw error;
  }
}

export async function writeOrders(orders: Order[]) {
  await fs.mkdir(folder, { recursive: true });
  await fs.writeFile(file, JSON.stringify(orders, null, 2));
}
