import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";

export async function getDashboardData() {
  await connectDB();
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const [lastOrders, monthSales, lastUsers, lowStockProducts] = await Promise.all([
    Order.find().sort({ createdAt: -1 }).limit(5).lean(),
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
          status: { $ne: "cancelled" }, 
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]),

    User.find().sort({ createdAt: -1 }).limit(5).select("name email createdAt").lean(),
    Product.find({ stock: { $lte: 1 } }).select("name stock price").lean(),
  ]);

  return {
    lastOrders: JSON.parse(JSON.stringify(lastOrders)),
    totalMonthSales: monthSales[0]?.total || 0,
    lastUsers: JSON.parse(JSON.stringify(lastUsers)),
    lowStockProducts: JSON.parse(JSON.stringify(lowStockProducts)),
  };
}