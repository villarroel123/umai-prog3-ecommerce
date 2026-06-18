import mongoose from "mongoose";
//Este archivo es cómo se construye una categoría en la base de datos: dice que tiene que tener un nombre de texto obligatorio y único, una descripción opcional, y que el sistema tiene que anotar la hora exacta en la que se creó
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
