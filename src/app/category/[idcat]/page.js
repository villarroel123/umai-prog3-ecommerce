import Link from "next/link";
import { notFound } from "next/navigation";

import ProductGrid from "@/components/ProductGrid";
import { getCategoryById } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function CategoryProductsPage({ params }) {
  const { idcat } = await params;
  const category = await getCategoryById(idcat);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category._id);

  return (
    <main className="min-h-screen bg-slate-50 py-20 text-slate-900">
    
      <div className="mx-auto max-w-5xl px-6">

        <section className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight font-serif mb-4">
            {category.name}
          </h2>
          {category.description ? (
            <p className="text-lg text-slate-600 max-w-xl mx-auto font-serif">
              {category.description}
            </p>
          ) : null}
        </section>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}