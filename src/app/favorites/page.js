'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useAppContext } from "@/contexts/AppContext";

function getProductImageSrc(image) {
  if (!image || typeof image !== "string" || image.trim() === "") {
    return "";
  }
  if (image.startsWith("http") || image.startsWith("/")) {
    return image;
  }
  return `/images/products/${image}`;
}

export default function FavoritesPage() {
  const { favorites = [], removeFavorite } = useAppContext();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      if (favorites.length === 0) {
        setFavoriteProducts([]);
        setLoading(false);
        return;
      }

      try {
        const resolvedProducts = await Promise.all(
          favorites.map(async (fav) => {
            if (typeof fav === "object" && fav !== null && fav.name) {
              return fav;
            }
            const id = typeof fav === "object" ? (fav._id || fav.id) : fav;
            if (!id) return null;

            try {
              const response = await axios.get(`/api/products/${id}`);
              return response.data.product || response.data;
            } catch (err) {
              console.error(`Error al obtener producto ${id}:`, err);
              return null;
            }
          })
        );

        setFavoriteProducts(resolvedProducts.filter(Boolean));
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [favorites]);

  const handleRemove = (e, productId) => {
    e.preventDefault();
    setFavoriteProducts((prev) =>
      prev.filter((item) => (item._id || item.id) !== productId)
    );
    removeFavorite(productId);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-12 text-center text-slate-500 font-lexend">
        Cargando tus favoritos...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 font-lexend">
      <h1 className="text-3xl font-bold text-slate-900">Mis Favoritos</h1>

      {favoriteProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
          <p className="text-xl text-slate-700 font-medium">
            Aún no tenés productos guardados en favoritos.
          </p>
          <p className="text-sm text-slate-500">
            Explorá el catálogo y guardá los productos que más te gusten.
          </p>
          <Link
            href="/"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteProducts.map((product, index) => {
            const id = product._id || product.id || `fav-${index}`;
            const imageSrc = getProductImageSrc(product.image);

            return (
              <article
                key={id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
                    {imageSrc ? (
                      <Image
                        alt={product.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        src={imageSrc}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center text-xs font-medium text-slate-400 bg-slate-50">
                        Sin imagen
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={(e) => handleRemove(e, id)}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-md hover:bg-red-500 hover:text-white text-slate-700 p-2 rounded-full shadow transition-all duration-200 z-10 text-xs font-bold w-8 h-8 flex items-center justify-center"
                      title="Quitar de favoritos">
                      ✕
                    </button>
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
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                    <p>Stock: {product.stock}</p>
                  </div>

                  <Link
                    href={`/products/${id}`}
                    className="w-full bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-xl transition-all hover:bg-slate-800 active:scale-[0.98] text-center shadow-sm block"
                  >
                    Ver detalle
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}