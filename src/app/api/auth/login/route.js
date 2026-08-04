import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server"; 
import User from "@/models/User";

export async function POST(request) { 
  try {
    await connectDB();
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "El email y la contraseña son obligatorios" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email, password });
    if (!user) {
      return NextResponse.json(
        { message: "Email o contraseña incorrectos" },
        { status: 401 }
      );
    }
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      favorites: user.favorites,
      createdAt: user.createdAt,
    };
    return NextResponse.json(
      { message: "Login exitoso", user: userData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al logear al usuario", error: error.message },
      { status: 500 }
    );
  }
}