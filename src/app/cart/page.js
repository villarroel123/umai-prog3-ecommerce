'use client'
import Image from "next/image"
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";

export default function CartPage(){
    const {  cart, updateQuantity,removeFromCart, clearCart,userActive } = useAppContext();
    const router = useRouter();
    let totalGeneral = 0;

    cart?.forEach((item) => {
    totalGeneral += item.subtotal;
    });
    const handleCheckout = () => {
    if (!userActive?.name) {
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };
 function getProductImageSrc(image) {
  if (!image) {
    return "/images/placeholder.png"; 
  }
  if (image.startsWith("/")) {
    return image;
  }
  return `/images/products/${image}`;
}
  return (
    <section className="max-w-4xl mx-auto my-10 p-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Tu Carrito</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
              <div className="flex items-center gap-4">
    
                <Image 
                    src={getProductImageSrc(item.image)}
                    width={350}
                    height={350} 
                    alt={item.name}
                    priority
                    className="w-16 h-16 object-cover rounded-xl border"
                /> 
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                  <p className="text-xs text-slate-500">${item.price} c/u</p>

                  {item.customizations && (
                    <div className="text-xs text-slate-500 mt-1">
                      {Object.entries(item.customizations).map(([key, val]) => (
                        <span key={key} className="block capitalize">
                          • {key}: <strong className="text-slate-700">{val}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-xs font-bold">
                    -
                  </button>
                  <p className="px-3 text-xs font-semibold">{item.quantity}</p>
                  <button onClick={() => updateQuantity(index, item.quantity + 1)} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-xs font-bold">
                    +
                  </button>
                </div>
                <p className="font-bold text-sm text-slate-900 min-w-[70px] text-right">
                  ${item.subtotal}
                </p>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 text-xs font-semibold hover:underline">
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-80 h-fit bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-slate-900">Resumen de compra</h2>

          <div className="flex justify-between text-sm font-semibold text-slate-700">
            <p>Total:</p>
            <p className="text-lg font-bold text-slate-900">${totalGeneral}</p>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-slate-900 text-white text-xs font-semibold py-3 px-4 rounded-xl hover:bg-slate-800 transition-all text-center">
            Continuar al Checkout
          </button>
        </div>
      </div>
    </section>
    )
}