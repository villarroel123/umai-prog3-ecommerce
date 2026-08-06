"use client";
import { useAppContext } from "@/contexts/AppContext";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function Checkout(){

  const { cart, userActive } = useAppContext();
  const [form, setForm] = useState(() => ({
    name: userActive?.name ?? "",
    email: userActive?.email ?? "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  }));
    const [createOrder, setCreateOrder] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
        const response = await axios.post("/api/orders", {
            user: userActive,
            shippingData: form,
            cart: cart,
            total: total
        });
        setCreateOrder(response.data);
        } catch (err) {
        console.error("Error al procesar la orden:", err);
        console.log("Respuesta exacta del error 400:", err.response?.data);
        const msg = "Ocurrió un error al procesar tu compra. Intentalo de nuevo.";
        setError(msg);
        } finally {
          setLoading(false);
        }
    };

    const handleChange = ((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    });

    if (createOrder) {
        return (
            <section className="max-w-xl mx-auto p-8 my-16 text-center bg-white border border-stone-200 rounded-3xl shadow-sm">
                <h2 className="text-3xl font-extrabold text-[#4A3525] mb-3">¡Gracias por tu compra!</h2>
                <p className="text-stone-600 mb-6 font-serif">Tu pedido ha sido registrado con éxito.</p>
                {createOrder.orderNumber && (
                    <p className="text-lg font-semibold text-stone-800 mb-8">
                        Número de orden: <span className="text-pink-600 font-bold">{createOrder.orderNumber}</span>
                    </p>
                )}
                <Link href="/" className="inline-block bg-[#4A3525] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3B291C] transition-all shadow-sm">
                    Volver al inicio
                </Link>
            </section>
        );
    }

    return(
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-extrabold mb-8 text-[#4A3525]">Finalizar Compra</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-[#4A3525]">
            Datos de Envío y Contacto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Nombre y Apellido 
              </label>
              <input type="text" name="name" required value={form.name} onChange={handleChange} className="w-full border border-stone-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition text-stone-800"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Teléfono 
              </label>
              <input type="tel" name="phone" required value={form.phone} onChange={handleChange} className="w-full border border-stone-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition text-stone-800"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Email 
            </label>
            <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full border border-stone-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition text-stone-800"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Dirección 
              </label>
              <input type="text" name="address" required value={form.address} onChange={handleChange} className="w-full border border-stone-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition text-stone-800"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Ciudad / Localidad 
              </label>
              <input type="text" name="city" required value={form.city} onChange={handleChange} className="w-full border border-stone-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition text-stone-800"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Notas adicionales (Opcional)
            </label>
            <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} className="w-full border border-stone-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition text-stone-800"></textarea>
          </div>
          <button type="submit" disabled={loading || cart.length === 0} className="w-full bg-[#4A3525] text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-[#3B291C] transition shadow-sm disabled:opacity-50 mt-6">
            {loading ? "Procesando orden..." : `Confirmar Compra ($${total})`}
          </button>
        </form>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 h-fit shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-[#4A3525]">
            Resumen del Pedido
          </h3>
          {cart.length === 0 ? (
            <p className="text-stone-500 text-sm font-serif">El carrito está vacío.</p>
          ) : (
            <div className="space-y-3 divide-y divide-stone-100">
              {cart.map((item, index) => (
                <div key={index} className="pt-3 flex justify-between text-sm">
                  <div>
                    <p className="font-medium text-stone-800">{item.name}</p>
                    <p className="text-stone-500 text-xs mt-0.5">
                      Cant: {item.quantity} x ${item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-stone-700">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="pt-4 flex justify-between font-bold text-base text-[#4A3525]">
                <p>Total:</p>
                <p>${total}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    );
}