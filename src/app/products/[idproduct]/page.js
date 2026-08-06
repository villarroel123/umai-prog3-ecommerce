
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import Image from 'next/image';
import ProductCustomizer from "@/components/ProductCustomizer";

function getProductImageSrc(image) {
  if (!image) {
    return "";
  }
  if (image.startsWith("/")) {
    return image;
  }
  return `/images/products/${image}`;
}

export default async function DetailProductPage({ params }) {
    const { idproduct } = await params;
    const product = await getProductById(idproduct);
    if (!product) {
        notFound();
    }
    const { description, price, stock, image, name } = product;

    return (
       <section className="w-full py-12 px-6 flex justify-center bg-slate-50">
        <div className="flex flex-col max-w-5xl w-full gap-6">
            {/* Card horizontal unificada */}
            <div className="flex flex-col lg:flex-row overflow-hidden rounded-[2rem] border border-white/20 bg-white/15 backdrop-blur-xl shadow-lg shadow-pink-500/5">
                {/* Imagen del producto */}
                <div className="relative w-full lg:w-[45%] min-h-[400px] bg-white/5 overflow-hidden flex items-center justify-center p-6">
                    {image ? (
                        <Image 
                            src={getProductImageSrc(image)}
                            fill
                            alt={name}
                            sizes="(min-width: 1024px) 45vw, 100vw"
                            priority
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-pink-400 font-serif">
                            Sin imagen
                        </div>
                    )}
                </div>

                {/* Información y Customizador al lado */}
                <div className="p-6 lg:p-8 flex flex-col justify-between flex-1 gap-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 font-serif">{name}</h1>
                            <p className="text-2xl lg:text-3xl font-serif font-black text-pink-600 shrink-0">${price}</p>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-serif text-slate-500 font-medium">
                            <p>Stock disponible: <span className="font-bold text-slate-700">{stock} unidades</span></p>
                        </div>
                        
                        <div className="border-t border-white/20 pt-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-pink-700 mb-1 font-serif">Descripción</h3>
                            <p className="text-sm text-slate-600 leading-relaxed font-serif">{description || "Sin descripción"}</p>
                        </div>
                    </div>

                    {/* Customizador embebido directamente al lado derecho */}
                    <ProductCustomizer product={product} />
                </div>
            </div>
        </div>
      </section>
    );
}