import Link from "next/link";
import { notFound } from "next/navigation";
import{getProductById} from "@/lib/products";
import Image from 'next/image';

function getProductImageSrc(image) {
  if (!image) {
    return "";
  }
  if (image.startsWith("/")) {
    return image;
  }
  return `/images/products/${image}`;
}

export default async function DetailProductPage({params}){
    const {idproduct}=await params;
    const product= await getProductById(idproduct);
    if(!product){
        notFound();
    }
    const {description, price, stock, image, name}=product;
    return(
       <section className="w-full py-10 px-10 flex justify-center">
        <div className="w-[80%] flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                <Image 
                    src={getProductImageSrc(image)}
                    width={350}
                    height={350} 
                    alt={name}
                    sizes=""
                    priority
                    className="object-contain"
                /> 
            </div>
            <div className="flex flex-col gap-3 max-w-xl">
                <h1 className="text-3xl font-bold text-slate-900">{name}</h1>
                
                <div className="my-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Descripción</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
                </div>
                
                <div className="flex gap-6 items-center text-sm my-1">
                    <p className="text-2xl font-bold text-slate-900">${price}</p>
                    <p className="text-slate-500">Stock: {stock}</p>
                </div>

                <button className="w-full md:w-auto bg-slate-900 text-white text-xs font-semibold py-3 px-8 rounded-xl transition-all hover:bg-slate-800 active:scale-[0.98] mt-2">
                    Agregar al carrito
                </button>
            </div>
        </div>
</section>
    )
}
