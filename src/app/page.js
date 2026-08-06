import { getProducts } from "@/lib/products";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen">
      <Hero />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <section className="mb-12 text-center">
          <h2 className="mt-4 text-4xl font-semibold text-[#4A3525] font-serif">
            Nuestros Productos
          </h2>
        </section>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}