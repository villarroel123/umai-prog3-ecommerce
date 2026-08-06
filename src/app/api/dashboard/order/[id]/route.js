import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function GET(request, context) {
  try {
    const { id } = await context.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    await connectDB();
    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error( error);
    return NextResponse.json({ error: error.message || "Error al obtener la orden" }, { status: 500 });
  }
}

export async function PATCH(request, context) {
  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    await connectDB();
    const { status } = await request.json();
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar estado" }, { status: 500 });
  }
}