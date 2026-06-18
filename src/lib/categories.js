import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export function serializeCategory(category) {//se treducen los datos
  return {
    _id: category._id.toString(),
    name: category.name,
    description: category.description,
    createdAt: category.createdAt?.toISOString(),
    updatedAt: category.updatedAt?.toISOString(),
  };
}

export async function getCategories() {//Esta función es la que llama tu página web cuando la clienta entra al e-commerce. Hace todo el trabajo pesado: conecta, busca, ordena de la A a la Z, limpia los datos y te los entrega en bandeja.
  await connectDB();

  const categories = await Category.find().sort({ name: 1 }).lean();

  return categories.map(serializeCategory);
}

export async function getCategoryById(id) {//Creamos una función para "obtener una categoría por su ID"
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  await connectDB();

  const category = await Category.findById(id).lean();

  return category ? serializeCategory(category) : null;
}
