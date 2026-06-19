import Link from "next/link";
import { notFound } from "next/navigation";
import{getProductById} from "@/lib/products";
import Image from 'next/image';
export default async function DetailProductPage({params}){
    const {idproduct}=await params;
    const product= await getProductById(idproduct);
    if(!product){
        notFound();
    }
    return(
        <section className="px-15 py-10">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div>
                <h3>Descripción</h3>
                <p>{product.description}</p>
            </div>
            <p>{product.price}</p>
            <p>{product.stock}</p>
            <Image 
                src={product.image}
                width={0}
                height={0} 
                alt={product.name}
                sizes="50vw"
                priority
            /> 


        </section>
    )
}
