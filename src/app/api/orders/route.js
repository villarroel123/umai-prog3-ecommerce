import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. PRIMERO conectar a la base de datos
    await connectDB();

    const body = await request.json();
    const { user, shippingData, cart, total } = body;

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { message: "El carrito está vacío" },
        { status: 400 }
      );
    }

    // 2. Ahora sí contar documentos
    const count = await Order.countDocuments();
    const orderNumber = `ORD-${1001 + count}`;

    // 3. Crear la orden en la base de datos
    const order = await Order.create({
      orderNumber,
      user: {
        id: user?.id || user?._id || null,
        name: shippingData?.name || "",
        email: shippingData?.email || "",
        phone: shippingData?.phone || "",
      },
      shippingAddress: {
        address: shippingData?.address || "", 
        city: shippingData?.city || "",
        notes: shippingData?.notes || "",
      },
      items: cart.map((item) => ({
        id: String(item.id || item._id),
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        subtotal: Number(item.subtotal || item.price * item.quantity),
        image: item.image || null,
      })),
      total: Number(total),
      status: "completed",
    });

    return NextResponse.json(
      {
        success: true,
        orderNumber: order.orderNumber,
        order: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return NextResponse.json(
      { message: "Error al crear la orden", error: error.message },
      { status: 400 }
    );
  }
}