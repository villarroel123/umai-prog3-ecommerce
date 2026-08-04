'use client'
import { useAppContext } from "@/contexts/AppContext";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Checkout(){

  const{cart,userActive}=useAppContext();
  const [form, setForm] = useState(() => ({
    name: userActive?.name ?? "",
    email: userActive?.email ?? "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  }));
    const [createOrder, setCreateOrder]= useState(null);
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
        setCreateOrder(response.data)//guardo en la variable form
        } catch (err) {
        console.error("Error al procesar la orden:", err);
        console.log("Respuesta exacta del error 400:", err.response?.data);
        const msg = "Ocurrió un error al procesar tu compra. Intentalo de nuevo.";
        setError(msg);
        }
    };

     const handleChange=((e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    })

    if (createOrder) {
        return (
            <section className="max-w-xl mx-auto p-6 my-12 text-center border rounded-lg bg-white shadow-sm">
                <h2 className="text-2xl font-bold text-green-600 mb-2">¡Gracias por tu compra!</h2>
                <p className="text-gray-600 mb-4">Tu pedido ha sido registrado con éxito.</p>
                {createOrder.orderNumber && (
                    <p className="text-lg font-semibold text-gray-800 mb-6">
                        Número de orden: <span className="text-indigo-600">{createOrder.orderNumber}</span>
                    </p>
                )}
                <Link href="/" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                    Volver al inicio
                </Link>
            </section>
        );
    }


    return(
    <section className="max-w-4xl mx-auto p-6 my-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Finalizar Compra</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Datos de Envío y Contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre y Apellido 
              </label>
              <input type="text" name="name" required value={form.name } onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono 
              </label>
              <input type="tel" name="phone" required value={form.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email 
            </label>
            <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección 
              </label>
              <input type="text" name="address" required value={form.address} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ciudad / Localidad 
              </label>
              <input type="text" name="city" required value={form.city} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas adicionales (Opcional)
            </label>
            <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
          </div>
          <button type="submit" disabled={loading || cart.length === 0} className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-indigo-700 transition disabled:opacity-50 mt-6">
            {loading ? "Procesando orden..." : `Confirmar Compra ($${total})`}
          </button>
        </form>
        <div className="bg-gray-50 p-6 rounded-lg border h-fit">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            Resumen del Pedido
          </h3>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">El carrito está vacío.</p>
          ) : (
            <div className="space-y-3 divide-y">
              {cart.map((item, index) => (
                <div key={index} className="pt-3 flex justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500">
                      Cant: {item.quantity} x ${item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-700">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="pt-4 flex justify-between font-bold text-base text-gray-900">
                <p>Total:</p>
                <p>${total}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    )
}