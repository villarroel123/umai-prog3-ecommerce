import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function DetailOrderPage({ params }) {
    const { orderId } = await params;

    await connectDB();

    let order = null;
    try {
        const orderDoc = await Order.findById(orderId).lean();
        if (orderDoc) {
            order = JSON.parse(JSON.stringify(orderDoc));
        }
    } catch (error) {
        order = null;
    }

    if (!order) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 font-lexend text-white">
            <Link 
                href="/user" 
                className="inline-block text-sm text-gray-400 hover:text-white mb-4 transition-colors">
                ← Volver a mis órdenes
            </Link>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                    <div>
                        <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
                        <p className="text-sm text-gray-400">
                            Fecha: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <p className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full text-sm font-semibold">
                        {order.status || "Procesada"}
                    </p>
                </div>
                <div className="space-y-3 pt-2">
                    <h2 className="text-lg font-semibold">Productos</h2>
                    <div className="divide-y divide-slate-700">
                        {order.items?.map((item, index) => {
                            const subtotal = (item.price || 0) * (item.quantity || 0);

                            return (
                                <div key={item._id || index} className="py-3 flex justify-between items-center text-sm">
                                    <div>
                                        <h3 className="font-medium text-base">{item.title || item.name}</h3>
                                        <p className="text-gray-400">Cantidad: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">${subtotal}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="border-t border-slate-700 pt-4 flex justify-between items-center text-lg font-bold">
                    <p>Total</p>
                    <p className="text-green-400">${order.total || order.totalAmount}</p>
                </div>
            </div>
        </div>
    );
}