## API

The API uses JSON requests and responses. Order records are stored in
`orders/orders.json`.

### Endpoints

| Method   | Endpoint           | Purpose                     | Success response                            |
| -------- | ------------------ | --------------------------- | ------------------------------------------- |
| `GET`    | `/api/orders`      | List all orders             | `200` with an array of orders               |
| `POST`   | `/api/orders`      | Create an order             | `201` with the created order                |
| `GET`    | `/api/orders/{id}` | Get one order               | `200` with the order                        |
| `PATCH`  | `/api/orders/{id}` | Update allowed order fields | `200` with the updated order                |
| `DELETE` | `/api/orders/{id}` | Delete an order             | `200` with `{ "message": "Order deleted" }` |

### Request examples

Create an order:

```http
POST /api/orders
Content-Type: application/json
```

```json
{
  "customerName": "Maya Haddad",
  "phone": "+961 70 000 001",
  "productName": "Lavender Calm Candle",
  "quantity": 2,
  "unitPrice": 16
}
```

The server generates the order ID, sets the initial status to `Pending`,
calculates the total, and records the creation date.

Update an order:

```http
PATCH /api/orders/NC-12345678
Content-Type: application/json
```

```json
{
  "status": "Preparing"
}
```

### Response example

```json
{
  "id": "NC-12345678",
  "customerName": "Maya Haddad",
  "phone": "+961 70 000 001",
  "productName": "Lavender Calm Candle",
  "quantity": 2,
  "unitPrice": 16,
  "total": 32,
  "status": "Pending",
  "date": "2026-10-30T17:00:00.000Z"
}
```

The date is shown in the order details modal opened with the dashboard's
**View** action. Existing orders without a saved date do not have an original
date to display.

### Validation and error status codes

- `400 Bad Request`: invalid JSON, validation errors, or no allowed fields in a
  PATCH request. Validation errors use an object shaped like
  `{ "error": { "message": "Validation failed", "fields": { } } }`.
- Quantity must be a positive integer.
- Unit price must be a number greater than or equal to zero, with at most two
  decimal places.
- Phone numbers are checked against the expected country-code and digit format
  (for example, `+961 70 000 001`).
- A provided status must be `Pending`, `Preparing`, or `Delivered`.
- `404 Not Found`: the requested order ID does not exist.
- `500 Internal Server Error`: the server could not load, save, update, or
  delete order data.

**Validation limitation:** Customer name and product name are not currently
checked for presence or valid string content by the API. Do not describe them
as required API validation until that behavior is implemented and tested.
