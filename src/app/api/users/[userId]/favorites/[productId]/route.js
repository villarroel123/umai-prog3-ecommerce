import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { userId, productId } = await params;

        if (!userId || !productId) {
            return Response.json(
                { error: "Se requieren userId y productId" }, 
                { status: 400 }
            );
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { favorites: productId } },
            { new: true }
        ).populate("favorites");

        if (!updatedUser) {
            return Response.json(
                { error: "Usuario no encontrado" }, 
                { status: 404 }
            );
        }
        return Response.json({ favorites: updatedUser.favorites }, { status: 200 });
    } catch (error) {
        console.error("Error en DELETE favorito:", error);
        return Response.json(
            { error: "Error interno al eliminar favorito" }, 
            { status: 500 }
        );
    }
}