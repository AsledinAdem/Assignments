# Nour Candle Order Management Plan

## Client problem

Nour runs a small candle business and receives orders from channels such as WhatsApp and Instagram. As the number of orders grows, it becomes harder to keep customer and product details organized, track each order's progress, and quickly find the information needed to prepare or deliver an order. A simple order dashboard will help her manage orders in one place and reduce missed or incorrect order details.

## Required features

- View all orders in a clear, responsive dashboard.
- See key order information at a glance: order ID, customer, phone, product,
  quantity, total, and status.
- Create an order with customer and product details; calculate the total and
  assign an ID, initial status, and order date automatically.
- View an order's complete details, including its creation date.
- Edit order information and update its status.
- Delete an order after confirmation.
- Show useful loading, success, empty, and error states.
- Validate API input and return clear error responses.
- Persist order data in `orders/orders.json`.

## Endpoint list

| Method   | Endpoint           | Purpose                     |
| -------- | ------------------ | --------------------------- |
| `GET`    | `/api/orders`      | Retrieve all orders         |
| `POST`   | `/api/orders`      | Create an order             |
| `GET`    | `/api/orders/{id}` | Retrieve one order by ID    |
| `PATCH`  | `/api/orders/{id}` | Update allowed order fields |
| `DELETE` | `/api/orders/{id}` | Delete an order by ID       |

### Expected behavior

- A successful order creation returns `201`; the server generates its ID,
  sets its status to `Pending`, calculates its total, and records its date.
- Successful reads and updates return `200`.
- A successful deletion returns `200`.
- Invalid JSON, invalid input, or an empty update returns `400`.
- An order ID that does not exist returns `404`.
- A storage or server failure returns `500`.

## Implementation steps

1. Define the order data shape and allowed statuses.
2. Implement JSON file storage helpers to read and write orders.
3. Add validation and consistent API error responses.
4. Implement collection endpoints to list and create orders.
5. Implement item endpoints to retrieve, update, and delete an order.
6. Build the dashboard table and summary counts, including responsive handling for narrower screens.
7. Build the add/edit form with client-side feedback and API validation errors.
8. Add order details and delete-confirmation modals; show the order date in
   the details modal.
9. Verify the production build and test each endpoint's success and error
   cases; check the dashboard and details modal at desktop and mobile widths.
