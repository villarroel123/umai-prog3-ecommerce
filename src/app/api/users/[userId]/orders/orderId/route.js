import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Product";

export async function GET(request, params) {
    try{
        await connectDB();
        const{userId, orderId}=await params;

        const order = await Order.findOne({ _id: orderId, "user.id": userId });
        if (!order) {
        return NextResponse.json(
            { message: "Orden no encontrada o no pertenece a este usuario" },
            { status: 404 }
        );
        }
        return Response.json(order,{status:200})
    }catch (error) {
        return Response.json(
        { message: "Error al obtener la orden", error: error.message },
        { status: 500 }
        );
    }
}