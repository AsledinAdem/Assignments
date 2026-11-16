import type { Order } from "@/types/order";
import type { connectionDb } from "@/lib/mongodb";

type OrdersDatabase = Awaited<ReturnType<typeof connectionDb>>;

export async function readOrders(db: OrdersDatabase): Promise<Order[]> {
  const orders = await db
    .collection("orders")
    .find({})
    .sort({ date: -1, _id: -1 })
    .toArray();
  return orders as unknown as Order[];
}

export async function insertOrder(db: OrdersDatabase, order: Order) {
  await db.collection("orders").insertOne({ ...order });
}

export async function writeOrders(db: OrdersDatabase, orders: Order[]) {
  const collection = db.collection("orders");
  await collection.deleteMany({});

  if (orders.length > 0) {
    await collection.insertMany(orders);
  }
}
