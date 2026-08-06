"use client";

import { useAppContext } from "@/contexts/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

export default function FavoriteButton({ product }) {
  const { favorites = [], toggleFavorite } = useAppContext();
  
  const productId = product._id || product.id;
  const isFavorite = favorites.some((item) => (item._id || item.id) === productId);

  return (
    <button
      onClick={() => toggleFavorite(product)}
      title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      aria-label="Favorito"
      className={`p-3 rounded-xl border text-xs transition-all ${
        isFavorite
          ? "bg-pink-50 border-pink-200 text-pink-600"
          : "border-slate-200 text-slate-400 hover:text-pink-600 hover:border-pink-200"
      }`}
    >
      <FontAwesomeIcon 
        icon={isFavorite ? faHeartSolid : faHeartRegular} 
        className="text-base text-pink-600"
      />
    </button> 
  );
}