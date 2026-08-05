import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Product";
export async function GET(request, params) {
    try{
        await connectDB();//espera la conexion con la base
        const { userId } = await params;
        if (!userId) {
            return NextResponse.json(
                { message: "ID de usuario requerido" },
                { status: 400 }
            );
        }
        const orders = await Order.find({ "user.id": userId }).sort({ createdAt: -1 });
        return Response.json(orders, { status: 200 });
    }catch (error) {
        return Response.json(
        { message: "Error al obtener las ordenes del usuario", error: error.message },
        { status: 500 }
        );
    }

}