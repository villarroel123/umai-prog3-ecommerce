import Link from "next/link";

export default function OrderGrid({orders=[]}){
    if (orders.length === 0) {
        return (
            <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                No orders yet.
            </p>
        );
    }

    return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <article
          key={order._id}
          className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800">
                {order.orderNumber}
              </h3>
              <p className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 capitalize">
                {order.status || "Completado"}
              </p>
            </div>
            <div className="my-4 space-y-2 text-sm text-slate-600">
              <p className="flex justify-between">
                Date:
                <strong className="font-medium text-slate-800">
                  {new Date(order.createdAt).toLocaleDateString()}
                </strong>
              </p>

              <p className="flex justify-between">
                Products:
                <strong className="font-medium text-slate-800">
                  {order.items?.length}
                </strong>
              </p>

              <p className="mt-2 flex justify-between border-t border-slate-100 pt-2 text-base font-semibold text-slate-900">
                Total:
                <strong className="text-indigo-600">
                  ${order.total?.toLocaleString()}
                </strong>
              </p>
            </div>
          </div>

          <Link
            href={`/user/orders/${order._id}`}
            className="mt-2 block w-full rounded-lg bg-slate-100 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-indigo-600 hover:text-white">
                See more
          </Link>
        </article>
      ))}
    </div>
  );

}