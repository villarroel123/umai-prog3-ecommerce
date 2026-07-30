'use client'
import { useAppContext } from "@/contexts/AppContext";

export default function FavoriteButton({product}){
     const { favoritos, toggleFavorite } = useAppContext();
      const isFavorite = favoritos.includes(product._id || product.id);

      return(
        <button
            onClick={() => toggleFavorite(product._id || product.id)}
            title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            aria-label="Favorito"
            className={`p-3 rounded-xl border text-xs transition-all ${
            isFavorite
                ? "bg-red-50 border-red-200 text-red-500"
                : "border-slate-200 text-slate-400 hover:text-slate-600"
            }`}>
            {isFavorite ? "♥" : "♡"}
        </button> 
      )
}