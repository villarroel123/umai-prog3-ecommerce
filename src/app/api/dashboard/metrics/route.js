import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const [recentOrders, monthSales, recentUsers, lowStockProducts] = await Promise.all([
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "email")
        .lean(),
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
            total: { $sum: "$total" },
          },
        },
      ]),
      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email createdAt")
        .lean(),
      Product.find({ stock: { $lte: 1 } })
        .select("name stock price")
        .lean(),
    ]);

    return NextResponse.json({
      recentOrders,
      totalMonthSales: monthSales[0]?.total || 0,
      recentUsers,
      lowStockProducts,
    });
  } catch (error) {
    console.error("Error en GET /api/admin/metrics:", error);
    return NextResponse.json(
      { error: "Error al obtener métricas" },
      { status: 500 }
    );
  }
}