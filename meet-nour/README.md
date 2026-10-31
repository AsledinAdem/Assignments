# Nour Candle Studio — Order Dashboard (simple version)

    npm install
    npm run dev      # http://localhost:3000

Orders are saved in `orders/orders.json` (fictional sample data).

## Where to read the code (in this order)
1. `src/types/order.ts` – the shape of an order
2. `src/lib/orders-storage.ts` – reads and writes the JSON file
3. `src/lib/validate.ts` – checks the data the server receives
4. `src/app/api/orders/route.ts` – GET all, POST create
5. `src/app/api/orders/[id]/route.ts` – GET one, PATCH update, DELETE
6. `src/components/Dashboard.tsx` – the page: cards, table, buttons
7. `src/components/OrderForm.tsx` – the add / edit form
