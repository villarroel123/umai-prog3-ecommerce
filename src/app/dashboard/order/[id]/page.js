"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import OrderDetailView from "@/components/OrderDetailView";

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
    async function fetchOrder() {
      try {
        console.log("Intentando buscar la orden con ID:", id); // ---> MIRA ESTO EN EL F12
        const res = await axios.get(`/api/dashboard/order/${id}`);
        
        console.log("¡Respuesta exitosa del servidor!", res.data); // ---> DATOS RECIBIDOS
        setOrder(res.data);
      } catch (err) {
        console.error("DETALLE DEL ERROR DE AXIOS:", {
          mensaje: err.message,
          codigoEstado: err.response?.status,
          datosServidor: err.response?.data,
          urlIntentada: err.config?.url
        });
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchOrder();
  }, [id]);

  if (loading) return <p className="p-8 text-black">Cargando...</p>;
  if (!order) return <p className="p-8 text-red-600">Orden no encontrada.</p>;

  return (
    <OrderDetailView
      order={order}
      isAdmin={true}
      backLink="/dashboard/orders"
      backLabel="Volver al panel de órdenes"
    />
  );
}