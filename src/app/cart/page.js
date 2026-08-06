"use client";

import Image from "next/image";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, userActive } = useAppContext();
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
    <section className="max-w-[95rem] mx-auto my-10 p-4 sm:p-6 font-lexend text-[#4A3525]">
      <h2 className="text-3xl font-bold text-[#4A3525] mb-8">Tu Carrito</h2>

      {!cart || cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center shadow-sm space-y-4">
          <p className="text-xl font-bold text-[#4A3525]">El carrito está vacío</p>
          <p className="text-sm text-stone-500">
            Aún no has agregado ningún producto a tu carrito de compras.
          </p>
          <div>
            <button
              onClick={() => router.push("/")}
              className="mt-3 inline-flex items-center rounded-xl bg-pink-50 border border-pink-200/60 px-6 py-3 text-sm font-semibold text-pink-700 hover:bg-pink-100 transition-colors shadow-sm"
            >
              Ver productos
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full flex flex-col gap-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center justify-between border border-stone-200 rounded-2xl p-5 bg-white shadow-sm gap-6 hover:border-pink-200 transition-all"
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="relative w-20 h-20 shrink-0">
                    <Image
                      src={getProductImageSrc(item.image)}
                      fill
                      alt={item.name}
                      priority
                      className="object-cover rounded-xl border border-stone-200 shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-[#4A3525] text-base">{item.name}</h3>
                    <p className="text-xs font-medium text-stone-500">
                      Precio unitario: <span className="text-[#4A3525] font-semibold">${item.price?.toLocaleString()}</span>
                    </p>

                    {item.customizations && (
                      <div className="text-xs text-stone-500 pt-1 space-y-0.5 bg-stone-50 p-2 rounded-lg border border-stone-100">
                        {Object.entries(item.customizations).map(([key, val]) => (
                          <span key={key} className="block capitalize">
                            • {key}: <strong className="text-stone-700">{val}</strong>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-stone-100 pt-4 md:pt-0">
                  <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50 shadow-inner">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-700 transition-colors"
                    >
                      -
                    </button>
                    <p className="px-4 text-xs font-bold text-[#4A3525]">{item.quantity}</p>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-700 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold">Subtotal</span>
                    <span className="font-black text-base text-[#4A3525]">
                      ${item.subtotal?.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-pink-600 hover:text-pink-800 text-xs font-semibold p-2 hover:bg-pink-50 rounded-lg transition-colors"
                    title="Quitar producto"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-96 h-fit bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col gap-5 sticky top-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#4A3525] border-b border-stone-200 pb-3">Resumen de compra</h2>

            <div className="flex justify-between items-center text-base font-semibold text-stone-700">
              <p>Total general:</p>
              <p className="text-2xl font-black text-[#4A3525]">${totalGeneral?.toLocaleString()}</p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#4A3525] text-white text-xs font-bold py-3.5 px-4 rounded-xl hover:bg-[#3B291C] transition-all text-center shadow-sm uppercase tracking-wider"
            >
              Continuar al Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}