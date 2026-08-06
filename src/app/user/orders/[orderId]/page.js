import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { notFound } from "next/navigation";
import OrderDetailView from "@/components/OrderDetailView";

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
    <OrderDetailView
      order={order}
      isAdmin={false}
      backLink="/user"
      backLabel="Volver a mis órdenes"
    />
  );
}