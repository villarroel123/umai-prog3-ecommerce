import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";


export async function GET(request, {params}) {
    try{
        await connectDB();
        const {userId}=await params;

        const user = await User.findById(userId).populate("favorites"); 

        if (!user) {
            return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        return Response.json({ favorites: user.favorites || [] }, { status: 200 });
    }  catch (error) {
        return Response.json({ error: "Error al obtener favoritos" }, { status: 500 });
    }  
}

export async function POST(request, { params }) {
    try {
        await connectDB();
        const { userId } = await params;
        const { productId } = await request.json();

        if (!productId) {
            return Response.json({ error: "Se requiere productId" }, { status: 400 });
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: productId } },
            { new: true }
        ).populate("favorites");

        return Response.json({ favorites: updatedUser.favorites }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Error al agregar favorito" }, { status: 500 });
    }
}