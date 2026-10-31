"use client";
import { useEffect, useState } from "react";
import type { Order } from "@/types/order";
import { formatOrderDate, formatPrice } from "@/lib/order-utils";
import Modal from "./Modal";
import OrderForm from "./OrderForm";
import StatusBadge from "./StatusBadge";

export default function Dashboard() {
  // ----- orders list -----
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // ----- add / edit form -----
  const [formOpen, setFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  // ----- details modal -----
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState<Order | null>(null);
  const [detailsError, setDetailsError] = useState("");

  // ----- delete modal -----
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // ----- success message -----
  const [message, setMessage] = useState("");

  // Summary numbers are calculated from the orders we got from the API
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  async function loadOrders() {
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      if (!res.ok) throw new Error("Request failed");
      setOrders(await res.json());
      setLoadError("");
    } catch {
      setLoadError("Could not load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // load the orders once when the page opens
  useEffect(() => {
    loadOrders();
  }, []);

  function showMessage(text: string) {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  }

  function openAddForm() {
    setEditingOrder(null);
    setFormOpen(true);
  }

  function openEditForm(order: Order) {
    setEditingOrder(order);
    setFormOpen(true);
  }

  async function handleSaved(text: string) {
    await loadOrders(); // get fresh data from the API
    setFormOpen(false);
    setEditingOrder(null);
    showMessage(text);
  }

  async function openDetails(id: string) {
    setDetailsOpen(true);
    setDetails(null);
    setDetailsError("");
    try {
      const res = await fetch(`/api/orders/${id}`, { cache: "no-store" });
      if (res.status === 404) setDetailsError("This order was not found.");
      else if (!res.ok) setDetailsError("Could not load the order.");
      else setDetails(await res.json());
    } catch {
      setDetailsError("Could not reach the server.");
    }
  }

  async function handleDelete() {
    if (!orderToDelete) return;
    setDeleting(true);
    setDeleteError("");
    try {
      const res = await fetch(`/api/orders/${orderToDelete.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        setDeleteError(data.error?.message ?? "Could not delete the order.");
        return;
      }
      setOrderToDelete(null);
      await loadOrders();
      showMessage("Order deleted");
    } catch {
      setDeleteError("Could not reach the server.");
    } finally {
      setDeleting(false);
    }
  }

  const cards = [
    { label: "Total Orders", value: totalOrders, bg: "bg-white" },
    {
      label: "Pending Orders",
      value: pendingOrders,
      bg: "bg-amber-100 ",
      text: "text-amber-900",
    },
    {
      label: "Delivered Orders",
      value: deliveredOrders,
      bg: "bg-sage-soft ",
      text: "text-sage-dark",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8  ">
      {/* Header */}
      <div className=" bg-cream sticky top-2 py-3">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🕯️</span>
            <div>
              <h1 className="font-serif text-3xl font-semibold">
                Nour Candle Studio
              </h1>
              <p className="text-sm text-muted">
                Order management from WhatsApp and Instagram
              </p>
            </div>
          </div>
          <button
            onClick={openAddForm}
            className="rounded-xl bg-sage-dark px-5 py-2.5 text-sm font-medium text-white cursor-pointer w-full sm:w-fit"
          >
            Add Order
          </button>
        </header>

        {/* Summary cards */}
        <section className="mt-8 grid grid-cols-3 gap-4  mb-3 font-semibold">
          {cards.map((card) => (
            <div
              key={card.label}
              className={`rounded-2xl border border-line ${card.bg} ${card.text} p-5 shadow-sm`}
            >
              <p className="text-sm text-muted">{card.label}</p>
              <p className="mt-1 font-serif text-4xl">
                {loading ? "—" : card.value}
              </p>
            </div>
          ))}
        </section>
      </div>
      {/* Error while loading */}
      {loadError && (
        <div
          role="alert"
          className="mt-6 flex items-center justify-between rounded-2xl bg-red-50 p-4 text-sm text-red-900"
        >
          <span>{loadError}</span>
          <button
            onClick={loadOrders}
            className="rounded-lg border border-red-300 px-3 py-1"
          >
            Try again
          </button>
        </div>
      )}

      {/* Orders table */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
        {loading ? (
          <p className="p-6 text-muted">Loading orders…</p>
        ) : orders.length === 0 && !loadError ? (
          <div className="p-12 text-center">
            <p className="font-serif text-xl">No orders yet</p>
            <p className="mt-2 text-sm text-muted">
              Add your first order to get started.
            </p>
            <button
              onClick={openAddForm}
              className="mt-4 rounded-xl bg-sage-dark px-5 py-2.5 text-sm font-medium text-white"
            >
              Add Order
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto  w-full">
            <table className="w-max min-w-full whitespace-nowrap text-left text-sm  ">
              <thead className="bg-sage-dark text-white font-normal">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line ">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-green-50 hover:-translate-y-1 transition-all duration-300 hover:shadow-sm"
                  >
                    <td className="px-4 py-3  text-sm">{order.id}</td>
                    <td className="px-4 py-3 capitalize">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-3">{order.phone}</td>
                    <td className="px-4 py-3">{order.productName}</td>
                    <td className="px-4 py-3">{order.quantity}</td>
                    <td className="px-4 py-3">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="space-x-3 px-4 py-3">
                      <button
                        onClick={() => openDetails(order.id)}
                        aria-label={`View order ${order.id}`}
                        className="underline cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openEditForm(order)}
                        aria-label={`Edit order ${order.id}`}
                        className="underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteError("");
                          setOrderToDelete(order);
                        }}
                        aria-label={`Delete order ${order.id}`}
                        className="text-red-800 underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Add / Edit modal */}
      {formOpen && (
        <Modal
          title={editingOrder ? "Edit order" : "Add order"}
          onClose={() => setFormOpen(false)}
        >
          <OrderForm
            order={editingOrder ?? undefined}
            onSaved={handleSaved}
            onCancel={() => setFormOpen(false)}
          />
        </Modal>
      )}

      {/* Details modal */}
      {detailsOpen && (
        <Modal title="Order details" onClose={() => setDetailsOpen(false)}>
          {detailsError && (
            <p role="alert" className="text-sm text-red-800">
              {detailsError}
            </p>
          )}
          {!details && !detailsError && (
            <p className="text-sm text-muted">Loading…</p>
          )}
          {details && (
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted">Order ID:</span> {details.id}
              </p>
              <p>
                <span className="text-muted">Order date:</span>{" "}
                {formatOrderDate(details.date)}
              </p>
              <p>
                <span className="text-muted">Customer:</span>{" "}
                {details.customerName}
              </p>
              <p>
                <span className="text-muted">Phone:</span> {details.phone}
              </p>
              <p>
                <span className="text-muted">Product:</span>{" "}
                {details.productName}
              </p>
              <p>
                <span className="text-muted">Quantity:</span> {details.quantity}
              </p>
              <p>
                <span className="text-muted">Unit price:</span>{" "}
                {formatPrice(details.unitPrice)}
              </p>
              <p>
                <span className="text-muted">Total:</span>{" "}
                {formatPrice(details.total)}
              </p>
              <p>
                <span className="text-muted">Status:</span>{" "}
                <StatusBadge status={details.status} />
              </p>
            </div>
          )}
        </Modal>
      )}

      {/* Delete confirmation */}
      {orderToDelete && (
        <Modal
          title="Delete this order?"
          onClose={() => setOrderToDelete(null)}
        >
          <p className="text-sm">
            Delete order <strong>{orderToDelete.id}</strong> for{" "}
            <strong>{orderToDelete.customerName}</strong>? This cannot be
            undone.
          </p>
          {deleteError && (
            <p
              role="alert"
              className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              {deleteError}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setOrderToDelete(null)}
              className="rounded-xl border border-line px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-xl bg-red-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </Modal>
      )}

      {/* Success message */}
      {message && (
        <div
          role="status"
          className="fixed bottom-4 right-4 z-50 rounded-xl bg-sage-dark px-4 py-3 text-sm text-white shadow-lg"
        >
          {message}
        </div>
      )}
    </main>
  );
}
