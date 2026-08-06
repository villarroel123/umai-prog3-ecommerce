
import Link from "next/link";
import OrderStatusSelector from "@/components/OrderStatusSelector";

export default function OrderDetailView({
  order,
  userData = null,
  isAdmin = false,
  backLink = "/user",
  backLabel = "Volver a mis órdenes",
}) {
  const buyerName = userData?.name || order.user?.name || "Sin nombre registrado";
  const buyerEmail = userData?.email || order.user?.email || "Sin email";
  const totalAmount = order.total || order.totalAmount || 0;
  const totalItems = order.items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 sm:space-y-10 font-lexend text-[#4A3525]">
      <section className="space-y-6">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#4A3525] hover:text-pink-700 transition-colors"
        >
          <p>← {backLabel}</p>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A3525] tracking-tight break-all">
                {order.orderNumber || `Orden #${order._id?.slice(-6)}`}
              </h2>
              {isAdmin ? (
                <OrderStatusSelector
                  orderId={order._id}
                  currentStatus={order.status || "Active"}
                />
              ) : (
                <p className="px-3 py-1 bg-pink-50 text-pink-700 border border-pink-200 rounded-full text-xs font-bold">
                  {order.status || "Procesada"}
                </p>
              )}
            </div>
            <p className="text-xs sm:text-sm text-stone-500">
              Registrada el {new Date(order.createdAt).toLocaleDateString("es-AR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 pt-2 sm:pt-0 border-t md:border-t-0 border-stone-200">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Items</p>
              <p className="text-base sm:text-lg font-bold text-[#4A3525]">{totalItems}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-stone-500 font-bold">Total</p>
              <p className="text-xl sm:text-2xl font-black text-[#4A3525]">
                ${totalAmount.toLocaleString("es-AR")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {isAdmin && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2 px-1 text-sm text-[#4A3525]">
          <div>
            <p className="text-xs text-stone-500 font-bold mb-0.5 uppercase tracking-wider">Comprador</p>
            <p className="font-bold text-[#4A3525] text-base">{buyerName}</p>
          </div>
          <div className="break-all">
            <p className="text-xs text-stone-500 font-bold mb-0.5 uppercase tracking-wider">Email</p>
            <p className="font-medium text-stone-700">{buyerEmail}</p>
          </div>
          <div>
            <p className="text-xs text-stone-500 font-bold mb-0.5 uppercase tracking-wider">ID de Usuario</p>
            <p className="font-mono text-xs text-stone-600 truncate">
              {typeof order.user === "object" ? order.user._id : order.user || "N/A"}
            </p>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A3525] px-1">
          Artículos pedidos
        </h3>

        <div className="divide-y divide-stone-200">
          {order.items?.map((item, index) => {
            const subtotal = (item.price || 0) * (item.quantity || 0);

            return (
              <div
                key={item._id || index}
                className="py-4 sm:py-5 px-1 sm:px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 hover:bg-stone-50 transition-colors rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold text-base sm:text-lg text-[#4A3525]">
                    {item.title || item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500">
                    ${item.price?.toLocaleString("es-AR")} c/u
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 shrink-0 border-t sm:border-t-0 border-stone-200 pt-2 sm:pt-0">
                  <p className="text-xs sm:text-sm text-stone-600 font-bold">
                    Cantidad: {item.quantity}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#4A3525] min-w-[90px] text-right">
                    ${subtotal.toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="pt-6 border-t border-stone-200 flex justify-between items-center px-1">
        <p className="text-base font-bold text-[#4A3525]">Monto Final</p>
        <p className="text-2xl sm:text-3xl font-black text-[#4A3525]">
          ${totalAmount.toLocaleString("es-AR")}
        </p>
      </div>
    </div>
  );
}