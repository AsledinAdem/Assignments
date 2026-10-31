import { STATUSES, isValidPhone } from "./order-utils";

// Returns an object of errors, e.g. { quantity: "Quantity must be..." }
// An empty object means everything is valid.
// isNew = true  -> every field is required (create)
// isNew = false -> only check the fields that were sent (update)
export function validateOrder(data: any, isNew: boolean) {
  const errors: Record<string, string> = {};

  if (typeof data !== "object" || data === null) {
    errors.body = "Request body must be a JSON object";
    return errors;
  }

  const shouldCheck = (field: string) => isNew || field in data;

  const textFields = {
    customerName: "Customer name",
    phone: "Phone",
    productName: "Product name",
  };
  for (const [field, label] of Object.entries(textFields)) {
    if (
      shouldCheck("phone") &&
      !errors.phone &&
      !isValidPhone(data.phone.trim())
    ) {
      errors.phone = "Phone must look like +961 70 000 001";
    }
  }

  if (shouldCheck("quantity")) {
    if (!Number.isInteger(data.quantity) || data.quantity < 1) {
      errors.quantity = "Quantity must be a positive integer";
    }
  }

  if (shouldCheck("unitPrice")) {
    const price = data.unitPrice;
    if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
      errors.unitPrice = "Unit price must be 0 or more";
    } else if (Math.round(price * 100) / 100 !== price) {
      errors.unitPrice = "Unit price can have at most 2 decimal places";
    }
  }

  if ("status" in data && !STATUSES.includes(data.status)) {
    errors.status = "Status must be Pending, Preparing or Delivered";
  }

  return errors;
}
