"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import OrderStatusSelector from "@/components/OrderStatusSelector";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("/api/dashboard/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error al obtener órdenes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-stone-500 font-lexend text-base">
        Cargando órdenes...
      </div>
    );
  }

  return (
    <div className="max-w-[95rem] mx-auto p-6 space-y-6 font-lexend">
      <h1 className="text-3xl font-bold text-[#4A3525]">
        Gestión de Órdenes
      </h1>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/60 text-xs font-bold uppercase tracking-wider text-[#4A3525]">
                <th className="py-5 px-6">Orden</th>
                <th className="py-5 px-6">$ Total</th>
                <th className="py-5 px-6">Comprador</th>
                <th className="py-5 px-6">Estado</th>
                <th className="py-5 px-6 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-base">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-stone-50/50 transition-colors"
                >
                  <td className="py-5 px-6 font-bold text-[#4A3525]">
                    <Link
                      href={`/dashboard/order/${order._id}`}
                      className="hover:underline text-base"
                    >
                      Orden #{order.orderNumber.slice(-6)}
                    </Link>
                  </td>

                  <td className="py-5 px-6 font-bold text-[#4A3525] whitespace-nowrap text-base">
                    ${order.total?.toLocaleString() || order.totalAmount?.toLocaleString()}
                  </td>

                  <td className="py-5 px-6 text-stone-600 text-sm sm:text-base">
                    {order.user?.email || "Usuario no especificado"}
                  </td>

                  <td className="py-5 px-6">
                    <OrderStatusSelector
                      orderId={order._id}
                      currentStatus={order.status}
                    />
                  </td>

                  <td className="py-5 px-6 text-right whitespace-nowrap">
                    <Link
                      href={`/dashboard/order/${order._id}`}
                      className="inline-flex items-center rounded-xl bg-pink-50 border border-pink-200/60 px-4 py-2 text-sm font-semibold text-pink-700 hover:bg-pink-100 transition-colors shadow-sm"
                    >
                      Ver Detalle →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <p className="py-10 text-center text-sm text-stone-400">
            No hay órdenes registradas.
          </p>
        )}
      </div>
    </div>
  );
}