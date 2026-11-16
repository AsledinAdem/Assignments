import { STATUSES, isValidPhone } from "./order-utils";

// Returns an object of errors, e.g. { quantity: "Quantity must be..." }
// An empty object means everything is valid.
// isNew = true  -> every field is required (create)
// isNew = false -> only check the fields that were sent (update)
export function validateOrder(data: unknown, isNew: boolean) {
  const errors: Record<string, string> = {};

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    errors.body = "Request body must be a JSON object";
    return errors;
  }

  const body = data as Record<string, unknown>;
  const shouldCheck = (field: string) => isNew || field in body;

  const textFields = {
    customerName: "Customer name",
    productName: "Product name",
  };
  for (const [field, label] of Object.entries(textFields)) {
    if (shouldCheck(field)) {
      if (typeof body[field] !== "string" || body[field].trim().length === 0) {
        errors[field] = `${label} is required`;
      }
    }
  }

  if (shouldCheck("phone")) {
    if (typeof body.phone !== "string" || !isValidPhone(body.phone.trim())) {
      errors.phone = "Phone must include a country code and 6 to 12 digits";
    }
  }

  if (shouldCheck("quantity")) {
    if (
      typeof body.quantity !== "number" ||
      !Number.isInteger(body.quantity) ||
      body.quantity < 1
    ) {
      errors.quantity = "Quantity must be a positive integer";
    }
  }

  if (shouldCheck("unitPrice")) {
    const price = body.unitPrice;
    if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
      errors.unitPrice = "Unit price must be 0 or more";
    } else if (Math.round(price * 100) / 100 !== price) {
      errors.unitPrice = "Unit price can have at most 2 decimal places";
    }
  }

  if ("status" in body && !STATUSES.some((status) => status === body.status)) {
    errors.status = "Status must be Pending, Preparing or Delivered";
  }

  return errors;
}
