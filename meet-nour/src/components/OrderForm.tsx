"use client";
import { useEffect, useState } from "react";
import type { Order, OrderStatus } from "@/types/order";
import { PRODUCTS } from "@/lib/products";
import {
  STATUSES,
  calculateTotal,
  formatPrice,
  formatPhone,
  isValidPhone,
} from "@/lib/order-utils";
import {
  fetchCountries,
  DEFAULT_COUNTRIES,
  type Country,
} from "@/lib/countries";

type OrderFormProps = {
  order?: Order; // if given, we are editing; otherwise we are adding
  onSaved: (message: string) => void;
  onCancel: () => void;
};

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3 py-2 text-sm";

function getCountryCode(phone: string, countries: Country[]) {
  return [...countries]
    .sort((a, b) => b.dialCode.length - a.dialCode.length)
    .find((country) => phone.startsWith(country.dialCode))?.code ?? "";
}

export default function OrderForm({
  order,
  onSaved,
  onCancel,
}: OrderFormProps) {
  // one piece of state per field
  const [customerName, setCustomerName] = useState(order?.customerName ?? "");
  const [phone, setPhone] = useState(order?.phone ?? "+961 "); // new orders start with +961
  const [countries, setCountries] = useState<Country[]>(DEFAULT_COUNTRIES);
  const [countryCode, setCountryCode] = useState(
    order ? getCountryCode(order.phone, DEFAULT_COUNTRIES) : "LB",
  );
  const [countriesFailed, setCountriesFailed] = useState(false);
  const [productName, setProductName] = useState(order?.productName ?? "");
  const [unitPrice, setUnitPrice] = useState(order?.unitPrice ?? 0);
  const [quantity, setQuantity] = useState(String(order?.quantity ?? 1));
  const [status, setStatus] = useState<OrderStatus>(order?.status ?? "Pending");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  // load the countries from the API once when the form opens
  useEffect(() => {
    fetchCountries()
      .then((availableCountries) => {
        setCountries(availableCountries);
        if (order) {
          setCountryCode(getCountryCode(order.phone, availableCountries));
        }
      })
      .catch(() => setCountriesFailed(true));
  }, [order]);

  // when a product is chosen, fill the price automatically
  function handleProductChange(name: string) {
    setProductName(name);
    const product = PRODUCTS.find((p) => p.name === name);
    setUnitPrice(product ? product.price : 0);
  }

  // when a country is chosen, replace the code at the start of the phone
  function handleCountryChange(code: string) {
    setCountryCode(code);
    const country = countries.find((c) => c.code === code);
    if (!country) return;
    const rest = phone.startsWith("+")
      ? phone.split(" ").slice(1).join(" ")
      : phone;
    setPhone(formatPhone(country.dialCode + " " + rest));
  }

  const qty = Number(quantity);
  const totalPreview =
    productName && Number.isInteger(qty) && qty >= 1
      ? formatPrice(calculateTotal(qty, unitPrice))
      : "—";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return; // avoid double submit

    // 1. quick checks for the user (the server checks again)
    const newErrors: Record<string, string> = {};
    if (!customerName.trim())
      newErrors.customerName = "Customer name is required";
    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!isValidPhone(phone)) {
      newErrors.phone = "Enter a full phone number like +961 70 000 001";
    }
    if (!productName) newErrors.productName = "Please choose a product";
    if (!Number.isInteger(qty) || qty < 1)
      newErrors.quantity = "Quantity must be a whole number (1 or more)";
    setErrors(newErrors);
    setServerError("");
    if (Object.keys(newErrors).length > 0) return;

    // 2. send to the API
    setSaving(true);
    try {
      const body = {
        customerName,
        phone,
        productName,
        quantity: qty,
        unitPrice,
        ...(order ? { status } : {}),
      };
      const url = order ? `/api/orders/${order.id}` : "/api/orders";
      const res = await fetch(url, {
        method: order ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.error?.fields ?? {});
        setServerError(data.error?.message ?? "Something went wrong");
        setSaving(false);
        return;
      }
      onSaved(order ? "Order updated" : "Order created");
    } catch {
      setServerError("Could not reach the server. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {order && (
        <div>
          <p className="mb-1 text-sm font-medium">Order ID</p>
          <p className="rounded-xl bg-cream px-3 py-2 font-mono text-sm text-muted">
            {order.id}
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="customerName"
          className="mb-1 block text-sm font-medium"
        >
          Customer name
        </label>
        <input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className={inputClass}
        />
        {errors.customerName && (
          <p className="mt-1 text-sm text-red-700">{errors.customerName}</p>
        )}
      </div>

      {/* <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          maxLength={15}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          className={inputClass}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-700">{errors.phone}</p>
        )}
      </div> */}
      <div className=" flex items-center gap-3">
        <div className="w-2/5">
          <label htmlFor="country" className="mb-1 block text-sm font-medium">
            Country
          </label>
          <select
            id="country"
            value={countryCode}
            onChange={(e) => handleCountryChange(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose a country…</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.dialCode})
              </option>
            ))}
          </select>
          {countriesFailed && (
            <p className="mt-1 text-sm text-muted">
              Could not load the country list. Only Lebanon is available.
            </p>
          )}
        </div>

        <div className="w-3/5">
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            maxLength={20}
            placeholder="+961 70 000 001"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            className={inputClass}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-700">{errors.phone}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="productName" className="mb-1 block text-sm font-medium">
          Product
        </label>
        <select
          id="productName"
          value={productName}
          onChange={(e) => handleProductChange(e.target.value)}
          className={inputClass}
        >
          <option value="">Choose a product…</option>
          {PRODUCTS.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name} — {formatPrice(p.price)}
            </option>
          ))}
        </select>
        {errors.productName && (
          <p className="mt-1 text-sm text-red-700">{errors.productName}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="quantity" className="mb-1 block text-sm font-medium">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={inputClass}
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-700">{errors.quantity}</p>
          )}
        </div>
        <div>
          <label htmlFor="unitPrice" className="mb-1 block text-sm font-medium">
            Unit price
          </label>
          <input
            id="unitPrice"
            readOnly
            value={productName ? formatPrice(unitPrice) : ""}
            placeholder="Set by product"
            className={`${inputClass} bg-cream text-muted`}
          />
        </div>
      </div>

      {order && (
        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className={inputClass}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      <p className="flex justify-between rounded-xl bg-sage-soft px-4 py-3 text-sm">
        <span>Total (final amount is calculated by the server)</span>
        <strong>{totalPreview}</strong>
      </p>

      {serverError && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {serverError}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-line px-4 py-2 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-sage-dark px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
