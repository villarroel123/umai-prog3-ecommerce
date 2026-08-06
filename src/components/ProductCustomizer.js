"use client"
import { useState } from "react";
import CartButton from "@/components/CartButton";
import FavoriteButton from "@/components/FavoriteButton";

export default function ProductCustomizer({ product }) {
    const [design, setDesign] = useState({
        shape: "Almendra",
        color: "Nude",
        size: "S",
        style: "Liso",
        effect: "Brillante"
    });
    const [quantity, setQuantity] = useState(1);
    
    // Opciones de estilos
    const shapes = ["Almendra", "Coffin", "Stilleto", "Square"];
    const colors = ["Nude", "Milky White", "Soft Pink", "Red Classic", "Black Glossy", "Glitter Silver"];
    const sizes = ["S", "M", "L"];
    const styles = ["Liso", "Francesita", "Marmolado", "Nail Art"];
    const effects = ["Brillante", "Mate", "Cromado", "Sin efecto"];

    // Para cambiar precios
    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    let precioFinal = 7500 * quantity;

    if (design.effect !== "Sin efecto") {
        precioFinal += 2000; 
    }

    if (design.style !== "Liso") {
        precioFinal += 2000;
    }

    const customProduct = {
        name: "Set custom",
        shape: design.shape,          
        color: design.color,        
        size: design.size,
        style: design.style,
        effect: design.effect,
        price: precioFinal,
        image: product.image,
        quantity: quantity
    };

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-3 border-t border-white/20 pt-4">
                <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-1.5 font-serif">Formas</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {shapes.map((shape) => (
                            <button
                                key={shape}
                                type="button"
                                onClick={() => setDesign({ ...design, shape: shape })}
                                className={`px-2.5 py-1.5 rounded-lg border text-xs font-serif font-medium transition-all ${
                                    design.shape === shape 
                                    ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-600/20"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                {shape}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-1.5 font-serif">Colores</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {colors.map((color) => (
                            <button 
                                key={color}
                                type="button"
                                onClick={() => setDesign({ ...design, color: color })} 
                                className={`px-2.5 py-1.5 rounded-lg border text-xs font-serif font-medium transition-all ${
                                    design.color === color 
                                    ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-600/20"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-1.5 font-serif">Tamaños</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {sizes.map((size) => (
                            <button 
                                key={size}
                                type="button"
                                onClick={() => setDesign({ ...design, size: size })} 
                                className={`px-2.5 py-1.5 rounded-lg border text-xs font-serif font-medium transition-all ${
                                    design.size === size 
                                    ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-600/20"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-1.5 font-serif">Estilos</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {styles.map((style) => (
                            <button 
                                key={style}
                                type="button"
                                onClick={() => setDesign({ ...design, style: style })} 
                                className={`px-2.5 py-1.5 rounded-lg border text-xs font-serif font-medium transition-all ${
                                    design.style === style 
                                    ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-600/20"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-1.5 font-serif">Efectos</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {effects.map((effect) => (
                            <button 
                                key={effect}
                                type="button"
                                onClick={() => setDesign({ ...design, effect: effect })} 
                                className={`px-2.5 py-1.5 rounded-lg border text-xs font-serif font-medium transition-all ${
                                    design.effect === effect
                                    ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-600/20"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                {effect}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between border border-pink-200 rounded-xl bg-pink-50/40 backdrop-blur-md overflow-hidden mt-2">
                <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-pink-700 font-serif">Total estimado:</p>
                </div>
                <div className="border-l border-pink-200 px-6 py-3 bg-pink-100/50">
                    <p className="text-xl font-black text-pink-600 font-serif">${customProduct.price}</p>
                </div>
            </div>
            <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1 bg-white/50 backdrop-blur-md shrink-0">
                    <button
                        type="button"
                        onClick={handleDecrease}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 active:scale-95 transition-all">
                        -
                    </button>
                    <p className="w-6 text-center font-bold text-sm text-slate-900 font-serif">
                        {quantity}
                    </p>
                    <button
                        type="button"
                        onClick={handleIncrease}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 active:scale-95 transition-all">
                        +
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <div className="shrink-0">
                        <FavoriteButton product={product} />
                    </div>
                    <div className="shrink-0">
                        <CartButton product={customProduct} quantity={quantity} design={design} />
                    </div>
                </div>
            </div>
        </div>
    );
}