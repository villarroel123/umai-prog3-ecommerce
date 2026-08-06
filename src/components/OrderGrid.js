
import Link from "next/link";

export default function OrderGrid({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <div className="max-w-[110rem] mx-auto my-6 font-lexend">
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center shadow-sm">
          <p className="text-sm font-semibold text-stone-500">
            No tienes órdenes registradas todavía.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-[110rem] mx-auto my-8 font-lexend">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <article
            key={order._id}
            className="flex flex-col justify-between rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition hover:shadow-md hover:border-pink-200"
          >
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-stone-100 pb-5 mb-6">
                <h3 className="font-bold text-lg text-[#4A3525] truncate">
                  {order.orderNumber}
                </h3>
                <span className="shrink-0 rounded-full bg-pink-50 border border-pink-200/60 px-3.5 py-1 text-xs font-semibold text-pink-700 capitalize">
                  {order.status || "Completado"}
                </span>
              </div>

              <div className="space-y-4 text-sm text-stone-600 mb-8">
                <p className="flex justify-between items-center bg-stone-50/70 p-3.5 rounded-2xl border border-stone-100">
                  <span className="text-xs font-medium text-stone-500">Fecha:</span>
                  <strong className="font-bold text-[#4A3525]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </strong>
                </p>

                <p className="flex justify-between items-center bg-stone-50/70 p-3.5 rounded-2xl border border-stone-100">
                  <span className="text-xs font-medium text-stone-500">Productos:</span>
                  <strong className="font-bold text-[#4A3525]">
                    {order.items?.length}
                  </strong>
                </p>

                <p className="flex justify-between items-center bg-stone-50/70 p-4 rounded-2xl border border-stone-100 text-base">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Total:</span>
                  <strong className="text-xl font-black text-[#4A3525]">
                    ${order.total?.toLocaleString()}
                  </strong>
                </p>
              </div>
            </div>

            <Link
              href={`/user/orders/${order._id}`}
              className="block w-full rounded-xl bg-[#4A3525] py-3.5 text-center text-xs font-bold text-white transition hover:bg-[#3B291C] shadow-sm uppercase tracking-wider"
            >
              Ver detalle
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}