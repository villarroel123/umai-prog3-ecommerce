"use client";

import { useState } from "react";
import axios from "axios";

const STATUS_OPTIONS = [
  { value: "Active", label: "Activa" },
  { value: "Closed", label: "Cerrada" },
  { value: "Shipped", label: "Enviada" },
  { value: "Canceled", label: "Cancelada" },
];

export default function OrderStatusSelector({ orderId, currentStatus, onStatusChange }) {
  const [status, setStatus] = useState(currentStatus || "Active");
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      await axios.patch(`/api/dashboard/order/${orderId}`, { status: newStatus });
      if (onStatusChange) onStatusChange(newStatus);
    } catch (err) {
      console.error("Error actualizando estado de la orden:", err);
      setStatus(currentStatus); 
    } finally {
      setLoading(false);
    }
  }
  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-slate-900 focus:bg-white transition-all disabled:opacity-50"
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}