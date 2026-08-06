"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBoxOpen, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await axios.get("/api/dashboard/metrics");
        setData(res.data);
      } catch (err) {
        console.error("Error al obtener métricas del dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center font-lexend">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
          <div className="text-sm font-medium">Cargando resumen administrativo...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[90rem] space-y-8 p-4 sm:p-6 lg:p-8 font-lexend">
      
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Administración
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Panel de control general con el estado actual del negocio, accesos rápidos y estadísticas operativas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Link
          href="/dashboard/products"
          className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-slate-900 p-4 text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg">
              <FontAwesomeIcon icon={faBoxOpen} />
            </div>
            <div>
              <p className="text-sm font-semibold">Productos & Categorías</p>
              <p className="text-xs text-slate-400">Gestionar catálogo y existencias</p>
            </div>
          </div>
          <div className="text-slate-400 transition-transform group-hover:translate-x-1">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        </Link>

        <Link
          href="/dashboard/orders"
          className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-slate-900 p-4 text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg">
              <FontAwesomeIcon icon={faCartShopping} />
            </div>
            <div>
              <p className="text-sm font-semibold">Órdenes de Venta</p>
              <p className="text-xs text-slate-400">Revisar y actualizar pedidos</p>
            </div>
          </div>
          <div className="text-slate-400 transition-transform group-hover:translate-x-1">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50 via-white to-pink-50/50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-800">
            Total Vendido en el Mes
          </p>
          <div className="rounded-full bg-pink-100 px-2.5 py-0.5 text-[11px] font-semibold text-pink-800">
            Actualizado
          </div>
        </div>
        <p className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-pink-950">
          ${data?.totalMonthSales?.toLocaleString("es-AR", { minimumFractionDigits: 2 }) || "0,00"}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h2 className="text-lg font-bold text-slate-900">Últimas 5 Órdenes</h2>
            <Link
              href="/dashboard/orders"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
            >
              Ver todas <FontAwesomeIcon icon={faArrowRightLong} className="text-[10px]" />
            </Link>
          </div>

          {!data?.recentOrders?.length ? (
            <p className="py-8 text-center text-xs text-slate-400">
              Sin órdenes registradas.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {data.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="py-3.5 flex items-center justify-between text-xs gap-2"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/dashboard/order/${order._id}`}
                      className="font-bold text-slate-900 hover:underline block truncate"
                    >
                      #{order._id.slice(-6)}
                    </Link>
                    <p className="text-slate-400 truncate">
                      {order.user?.email || "Usuario no especificado"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-900">
                      ${order.total?.toLocaleString() || 0}
                    </p>
                    <div className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 text-slate-700 capitalize">
                      {order.status || "pendiente"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Stock Crítico (1 o 0)
            </h2>
            <Link
              href="/dashboard/products"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
            >
              Inventario <FontAwesomeIcon icon={faArrowRightLong} className="text-[10px]" />
            </Link>
          </div>

          {!data?.lowStockProducts?.length ? (
            <p className="py-8 text-center text-xs text-slate-400">
              Sin productos con stock bajo.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {data.lowStockProducts.map((prod) => (
                <div
                  key={prod._id}
                  className="py-3.5 flex items-center justify-between text-xs gap-2"
                >
                  <p className="font-medium text-slate-800 truncate">
                    {prod.name}
                  </p>
                  <div
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      prod.stock === 0
                        ? "bg-pink-100 text-pink-700 border border-pink-200/50"
                        : "bg-amber-100 text-amber-800 border border-amber-200/50"
                    }`}
                  >
                    Stock: {prod.stock}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="border-b border-slate-100 pb-4 mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Últimos Usuarios Registrados
          </h2>
        </div>

        {!data?.recentUsers?.length ? (
          <p className="py-6 text-center text-xs text-slate-400">
            Sin usuarios registrados.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.recentUsers.map((u) => (
              <div
                key={u._id}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-700 text-xs uppercase">
                  {(u.name || u.email || "U").charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {u.name || "Sin Nombre"}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{u.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}