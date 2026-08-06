'use client'
import { useAppContext } from "@/contexts/AppContext";
import OrderGrid from "@/components/OrderGrid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserPage() {
    const { userActive } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = userActive?._id || userActive?.id || userActive?.user?._id;

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        async function fetchOrders() {
            try {
                setLoading(false);
                setError(null);
                const res = await axios.get(`/api/users/${userId}/orders`);
                setOrders(res.data);
            } catch (err) {
                setError("Ocurrió un error al cargar tus órdenes.");
            } 
        }

        fetchOrders();
    }, [userId]);

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6 font-lexend text-white">
            <h2 className="text-3xl font-bold">Mis Órdenes</h2>

            {loading && <p className="text-gray-300">Cargando órdenes...</p>}

            {error && <p className="text-red-400">{error}</p>}

            {!loading && !error && orders.length === 0 && (
                <p className="text-gray-400">No se encontraron órdenes para este usuario.</p>
            )}

            {!loading && !error && orders.length > 0 && (
                <OrderGrid orders={orders} />
            )}
        </div>
    );
}
