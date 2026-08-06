import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { userId } = await params;
        const { productIds } = await request.json(); 

        if (!Array.isArray(productIds)) {
            return Response.json({ error: "productIds debe ser un array" }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: { $each: productIds } } },
            { new: true }
        ).populate("favorites");

        return Response.json({ favorites: updatedUser.favorites }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Error al sincronizar favoritos" }, { status: 500 });
    }
}