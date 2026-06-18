import { connectDB } from "@/lib/mongodb";
import "@/models/Category";
import Product from "@/models/Product";
import { serializeCategory } from "@/lib/categories";// se trae funcion de categories para traducir los datos 

function serializeProduct(product) {//transforma los datos "raros" de Mongo en texto y números limpios para la pantalla
  return {
    _id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image: product.image,
    categories: (product.categories || []).map((category) => {
      if (category?.name) {
        return serializeCategory(category);// Si la categoría viene "completa", la limpia con la limpiadora de categorías
      }

      return category.toString();// Si viene solo el número de ID, lo hace texto común
    }),
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
  };
}

export async function getProducts() {//Esta función te sirve para armar la página principal del e-commerce,
  await connectDB();// conectamos con mongo

  const products = await Product.find()//Buscamos los productos con dos órdenes especiales
    .populate("categories")
    .sort({ createdAt: -1 })
    .lean();

  return products.map(serializeProduct);//Los limpiamos uno por uno
}

export async function getProductById(id) { //Para la pagina de detalle de cada producto
  await connectDB();

  const product = await Product.findById(id)//importa product del modelo Product
    .populate("categories")
    .lean();

  return product ? serializeProduct(product) : null;
}

export async function getProductsByCategory(categoryId) {// cuanso solo se quieran ver solo productos de dicha categoria
  await connectDB();

  const products = await Product.find({ categories: categoryId })
    .populate("categories")
    .sort({ createdAt: -1 })
    .lean();

  return products.map(serializeProduct);
}
