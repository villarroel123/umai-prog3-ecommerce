import Image from "next/image";
import Link from "next/link";

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
      <p className="rounded-3xl border border-dashed border-white/20 bg-white/15 backdrop-blur-md p-12 text-center text-lg text-slate-600 font-serif shadow-sm">
        No products added yet.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-4xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article
          key={product._id}
          className="group overflow-hidden rounded-[2rem] border border-white/20 bg-white/15 backdrop-blur-xl shadow-lg shadow-pink-500/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-pink-500/15 hover:bg-white/30 hover:opacity-95 flex flex-col justify-between"
        >
          <div>
            <div className="relative aspect-[4/3] bg-white/5 overflow-hidden rounded-t-[2rem]">
              {product.image ? (
                <Image
                  alt={product.name}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 100vw"
                  src={getProductImageSrc(product.image)}
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-pink-400 bg-white/5 font-serif">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight line-clamp-1 font-serif">
                  {product.name}
                </h2>
                <p className="shrink-0 text-lg font-serif font-black text-pink-600">
                  ${product.price}
                </p>
              </div>

              <p className="line-clamp-2 text-sm text-slate-600 leading-relaxed font-serif">
                {product.description || "Sin descripcion"}
              </p>

              {product.categories?.length ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.categories.map((category) =>
                    typeof category === "string" ? (
                      <p
                        key={category}
                        className="rounded-lg bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold tracking-wider uppercase text-pink-700 font-serif"
                      >
                        {category}
                      </p>
                    ) : (
                      <Link
                        key={category._id}
                        className="rounded-lg bg-white/10 border border-white/20 backdrop-blur-md py-1 text-xs font-semibold tracking-wider uppercase text-pink-700 transition-all hover:bg-pink-600 hover:text-white hover:border-pink-600 font-serif"
                        href={`/category/${category._id}`}>
                        {category.name}
                      </Link>
                    )
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="px-5 pb-5 pt-0 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs text-slate-500 font-medium font-serif border-t border-white/20 pt-3">
              <p>Stock disponible</p>
              <p className="font-bold text-slate-700">{product.stock} unidades</p>
            </div>
            
            <Link 
              href={`/products/${product._id}`}
              className="w-full bg-pink-600 text-white text-sm font-semibold py-3 rounded-xl transition-all hover:bg-pink-700 active:scale-[0.98] text-center shadow-md shadow-pink-600/20 block font-serif tracking-wide"
            >
              See more
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}