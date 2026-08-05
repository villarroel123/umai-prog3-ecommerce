'use client'
import { useAppContext } from "@/contexts/AppContext";
import OrderGrid from "@/components/OrderGrid";

export default function UserPage(){
    const { userActive } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const userId = userActive?._id;

    useEffect(() => {
        const handleGetItems = async () => {
            try {
                setNotFound(false);
                setLoading(true);
                const response = await axios.get(`/api/users/${userId}/orders`);
                setOrders(response.data);
            } catch (err) {
                console.error("Error al cargar órdenes:", err);
                setNotFound(true);
            }
            };

            handleGetItems();
    }, [userId]);
    return(
        <div>
            {notFound && (
                <div className="w-full flex items-center justify-center">
                <div className="w-4/5">
                    <h2 className="text-white pt-5 font-lexend">NOT FOUND</h2>
                </div>
                </div>
            )}
            {loading && (
                <div className="w-full flex items-center justify-center">
                <div className="w-4/5">
                    <p className="text-white pt-5 font-lexend">Loading orders...</p>
                </div>
                </div>
            )}
            {!userActive && !loading && (
                <p className="p-8 text-center text-white font-lexend">
                    Debes iniciar sesión para ver tus órdenes.
                </p>
            )}
            {userActive && !loading && !notFound && (
                <div className="max-w-5xl mx-auto p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-white font-lexend">My Orders</h2>
                    <OrderGrid orders={orders} />
                </div>
            )}
        </div>
    )
}

