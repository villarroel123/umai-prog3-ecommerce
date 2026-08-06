import ProductDashboardContainer from "@/containers/ProductDashboardContainer";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ProductsDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8 text-slate-900 font-lexend">
      <div className="mx-auto max-w-[90rem] space-y-6">
        <header className="rounded-2xl bg-[#4A3525] p-8 text-white shadow-lg flex flex-col items-start gap-4">
          <Link
            href="/dashboard"
            className="text-xs font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg border border-white/10 transition-colors w-fit"
          >
            Volver 
          </Link>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-300">
              Panel Administrativo
            </span>
            <h1 className="text-3xl font-bold mt-1">
              Gestión de Productos y Categorías
            </h1>
          </div>
        </header>
        <ProductDashboardContainer />
      </div>
    </main>
  );
}