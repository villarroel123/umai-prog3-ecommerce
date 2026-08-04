import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/User";
//envio a la api para crear user en la en la base de datos
export async function POST(request) {
    try {
    await connectDB();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "El email ya está registrado" },
        { status: 400 }
      );
    }
    const newUser = await User.create({
      name,
      email,
      password,
      favorites: [],
    });
    const userWithoutPassword = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      favorites: newUser.favorites,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json(
      { message: "Usuario creado", user: userWithoutPassword },
      { status: 201 }
    );

    }catch(error){
            return Response.json(
                { message: "Error al crear el usuario", error: error.message },
                { status: 400 }  
            )
    }


}