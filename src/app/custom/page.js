"use client"
import {useState} from "react";

export default function CustomPage(){

    const [design, setDesign]= useState({
        shape:"Almendra",
        color:"Natural",
        size:"S",
        style:"Liso",
        effect:"Brillante"
    });

    const images={
        "Almendra-Nude":"",
        "Almendra-Milky White": "",
        "Almendra-Soft Pink": "",
        "Almendra-Red Classic": "",
        "Almendra-Black Glossy": "",
        "Almendra-Glitter Silver": "",
        //coffin
        "Coffin-Nude":"",
        "Coffin-Milky White": "",
        "Coffin-Soft Pink": "",
        "Coffin-Red Classic": "",
        "Coffin-Black Glossy": "",
        "Coffin-Glitter Silver": "",
        //stilleto
        "Stilleto-Nude":"",
        "Stilleto-Milky White": "",
        "Stilleto-Soft Pink": "",
        "stilleto-Red Classic": "",
        "Stilleto-Black Glossy": "",
        "Stilleto-Glitter Silver": "",
        //square
        "Square-Nude":"",
        "Square-Milky White": "",
        "Square-Soft Pink": "",
        "Square-Red Classic": "",
        "Square-Black Glossy": "",
        "Square-Glitter Silver": "",
    }
    const currentImageKey = `${design.shape}-${design.color}`;
    const currentImageSrc = images[currentImageKey]

    //Opciones de estilos
    const shapes=["Almendra","Coffin","Stilleto","Square"];
    const colors=["Nude","Milky White","Soft Pink","Red Classic","Black Glossy","Glitter Silver"];
    const sizes=["S","M","L","Custom"];
    const styles=["Liso","Francesita","Marmorado","Nail Art"];
    const effects=["Brillante","Mate","Cromado","Sin efecto"]
    //para cambiar precios
    let precioFinal = 7500;

    if (design.effect !== "Sin efecto") {
    precioFinal += 2000; 
    }

    if (design.style !== "Liso") {
    precioFinal += 2000;
    }
    const customProduct={
        name:"Set custom",
        shape: design.shape,       
        color: design.color,        
        size: design.size,
        style: design.style,
        effect: design.effect,
        price: precioFinal,
        // image: currentImageSrc,
        quantity: 1
    }

    

    return(
        <section className="w-full  min-h-screen flex items-center">
            <div className="max-w-[90%] w-full mx-auto bg-white p-8 flex justify-between">
                <div className="flex flex-col w-full" >
                    <div className="mb-6 ">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Formas</h4>
                    <div className="flex flex-wrap gap-1">
                    {shapes.map((shape) => (
                        <button
                        key={shape}
                        onClick={() => setDesign({ ...design, shape: shape })}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                            design.shape === shape 
                            ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10"
                            : "bg-white text-black border-slate-200 hover:bg-slate-50"
                        }`}
                        >
                        {shape}
                        </button>
                    ))}
                    </div>
                    </div>
                    <div className="mb-6 ">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Colores</h4>
                        <div className="flex flex-wrap gap-1">
                        {colors.map((color)=>(
                            <button 
                            key={color}
                            onClick={() => setDesign({ ...design, color: color })} 
                            className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                                design.color === color 
                                ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10"
                                : "bg-white text-black border-slate-200 hover:bg-slate-50"
                            }`}
                            >
                            {color}
                            </button>
                        ))}
                        </div>
                    </div>
                    <div className="mb-6 ">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Tamaños</h4>
                        <div className="flex flex-wrap gap-1">
                        {sizes.map((size)=>(
                            <button 
                            key={size}
                            onClick={() => setDesign({ ...design, size: size })} 
                            className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                                design.size === size 
                                ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10"
                                : "bg-white text-black border-slate-200 hover:bg-slate-50"
                            }`}
                            >
                            {size}
                            </button>
                        ))}
                        </div>
                    </div>
                    <div className="mb-6 ">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Estilos</h4>
                        <div className="flex flex-wrap gap-1">
                        {styles.map((style)=>(
                            <button 
                            key={style}
                            onClick={() => setDesign({ ...design, style: style })} 
                            className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                                design.style === style 
                                ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10"
                                : "bg-white text-black border-slate-200 hover:bg-slate-50"
                            }`}
                            >
                                {style}
                            </button>
                        ))}
                        </div>
                    </div>
                    <div className="mb-6 ">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Efectos</h4>
                        <div className="flex flex-wrap gap-1">
                        {effects.map((effect)=>(
                            <button 
                            key={effect}
                            onClick={() => setDesign({ ...design, effect: effect })} 
                            className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                                design.effect === effect
                                ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10"
                                : "bg-white text-black border-slate-200 hover:bg-slate-50"
                            }`}
                            >
                                {effect}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>
                
                <article className="mb-6 rounded-2xl shadow-md border border-slate-200/60 bg-white p-6 flex flex-col justify-between w-[40%] transition-all hover:shadow-lg"> 
                    <div className="mb-4">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Producto Personalizado</p>
                        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{customProduct.name}</h3>
                    </div>
                    <div className="space-y-2.5 text-sm text-slate-600 border-t border-b border-slate-100 py-4 my-2">
                        <div className="flex justify-between items-center">
                            <p className="text-slate-400">Color</p>
                            <p className="font-semibold text-slate-800">{customProduct.color}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-slate-400">Tamaño</p>
                            <p className="font-semibold text-slate-800">{customProduct.size}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-slate-400">Estilo</p>
                            <p className="font-semibold text-slate-800">{customProduct.style}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-slate-400">Efecto</p>
                            <p className="font-semibold text-slate-800">{customProduct.effect}</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-2 flex flex-col gap-3">
                        <div className="flex justify-between items-baseline">
                            <p className="text-xs font-medium text-slate-400">Total estimado:</p>
                            <p className="text-2xl font-black text-slate-950">${customProduct.price}</p>
                        </div>
                        <button className="w-full bg-slate-900 text-white text-xs font-semibold py-3 px-4 rounded-xl transition-all hover:bg-slate-800 active:scale-[0.98] shadow-sm">
                            Agregar al carrito
                        </button>
                    </div>
                </article>
                
            </div>
        </section>
    )
}