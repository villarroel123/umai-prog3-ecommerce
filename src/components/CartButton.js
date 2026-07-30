'use client'
import { useAppContext } from "@/contexts/AppContext";

export default function CartButton({product,quantity=1,design}){
    const { addToCart} = useAppContext();

    const handleAddToCart = () => {
    addToCart(product, quantity,design);
    alert("¡Producto agregado al carrito!");
    };
    return(
        <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-slate-900 text-white text-xs font-semibold py-3 px-8 rounded-xl transition-all hover:bg-slate-800 active:scale-[0.98]">
            Agregar al carrito
        </button>
    )
}