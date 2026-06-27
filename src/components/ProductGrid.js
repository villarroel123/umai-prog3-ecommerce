import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/products";

function getProductImageSrc(image) {
  if (!image) {
    return "";
  }

  if (image.startsWith("/")) {
    return image;
  }

  return `/images/products/${image}`;
}

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        Todavia no hay productos cargados.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article
          key={product._id}
          className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
              {product.image ? (
                <Image
                  alt={product.name}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={getProductImageSrc(product.image)}
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-xs font-medium text-slate-400 bg-slate-50">
                  Sin imagen
                </div>
              )}
            </div>
            <div className="p-5 pb-0">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-base font-bold text-slate-900 tracking-tight line-clamp-2">
                  {product.name}
                </h2>
                <p className="shrink-0 text-base font-black text-slate-950">
                  ${product.price}
                </p>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-slate-500 leading-relaxed">
                {product.description || "Sin descripcion"}
              </p>
              {product.categories?.length ? (
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {product.categories.map((category) =>
                    typeof category === "string" ? (
                      <span
                        key={category}
                        className="rounded-lg bg-slate-50 border border-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {category}
                      </span>
                    ) : (
                      <Link
                        key={category._id}
                        className="rounded-lg bg-slate-50 border border-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-900 hover:text-white hover:border-slate-900"
                        href={`/category/${category._id}`}
                      >
                        {category.name}
                      </Link>
                    )
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <div className="p-5 pt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
              <p>Stock: {product.stock}</p>
            </div>
            
            <Link 
              href={`/products/${product._id}`}
              className="w-full bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-xl transition-all hover:bg-slate-800 active:scale-[0.98] text-center shadow-sm block"
            >
              See more
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
