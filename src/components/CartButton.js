'use client'
import { useAppContext } from "@/contexts/AppContext";

export default function CartButton({product}){
    const { addToCart, favoritos, toggleFavorite } = useAppContext();
    const isFavorite = favoritos.includes(product._id || product.id);
    return(
        <div className="flex items-center gap-3 mt-2">
            <button
                onClick={() => addToCart(product, 1)}
                className="w-full md:w-auto bg-slate-900 text-white text-xs font-semibold py-3 px-8 rounded-xl transition-all hover:bg-slate-800 active:scale-[0.98]">
                Agregar al carrito
            </button>
            <button
                onClick={() => toggleFavorite(product._id || product.id)}
                className={`p-3 rounded-xl border text-xs transition-all ${
                isFavorite
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "border-slate-200 text-slate-400 hover:text-slate-600"
                }`}>
                {isFavorite ? "♥ Favorito" : "♡ Guardar"}
            </button>
        </div>
        
    )

}