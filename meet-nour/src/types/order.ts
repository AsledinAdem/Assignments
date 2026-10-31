export type OrderStatus = "Pending" | "Preparing" | "Delivered";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  status: OrderStatus;
  date: Date;
}

export interface CreateOrderInput {
  customerName: string;
  phone: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface UpdateOrderInput {
  customerName?: string;
  phone?: string;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  status?: OrderStatus;
}
