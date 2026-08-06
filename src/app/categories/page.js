import Link from "next/link";
import { getCategories } from "@/lib/categories";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="relative min-h-screen px-6 py-12 bg-[url('/images/login.jpg')] bg-cover bg-center bg-no-repeat text-slate-100">
      <div className="absolute inset-0 bg-black/35 z-0"></div>
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <section className="mb-12">
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4 font-serif">
            Nuestras categorías
          </h2>
          <p className="text-lg text-stone-200 max-w-xl mx-auto font-serif">
            Descubrí los diferentes productos para vos y encontrá tu estilo ideal.
          </p>
        </section>

        {categories.length === 0 ? (
          <p className="rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-md p-12 text-center text-lg text-stone-200 font-serif shadow-sm">
            Todavía no hay categorías cargadas.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                className="group overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-pink-400 hover:bg-white/20 p-6 w-full sm:w-[calc(33.333%-1rem)] min-w-[260px] text-center block"
                href={`/category/${category._id}`}
              >
                <h2 className="text-lg font-bold text-white tracking-tight font-serif mb-2 text-center">
                  {category.name}
                </h2>
                <p className="text-sm text-stone-300 leading-relaxed font-serif text-center">
                  {category.description || "Sin descripción"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}