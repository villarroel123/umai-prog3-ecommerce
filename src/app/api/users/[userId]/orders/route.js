import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
export async function GET(request, {params}) {
    try{
        await connectDB();//espera la conexion con la base
        const { userId } = await params;
        if (!userId || userId === "undefined") {
        return Response.json(
            { message: "ID de usuario requerido y válido" },
            { status: 400 }
        )}
        console.log("--> Buscando órdenes para userId:", userId);
        const orders = await Order.find({
            $or: [
                { "user._id": userId },
                { "user.id": userId },
                { userId: userId }
            ]
        }).sort({ createdAt: -1 });
        return Response.json(orders, { status: 200 });
    }catch (error) {
        return Response.json(
        { message: "Error al obtener las ordenes del usuario", error: error.message },
        { status: 500 }
        );
    }

}