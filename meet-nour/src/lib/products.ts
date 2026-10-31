export interface Product {
  name: string;
  price: number; // USD
}

// Edit this list to change the products and prices offered in the order form.
export const PRODUCTS: readonly Product[] = [
  { name: "Vanilla Soy Candle", price: 15.5 },
  { name: "Cedar & Amber Candle", price: 18 },
  { name: "Lavender Calm Candle", price: 16 },
  { name: "Rose & Oud Candle", price: 20 },
  { name: "Sea Salt & Sage Candle", price: 17.5 },
  { name: "Mini Candle Gift Set", price: 12.5 },
];
