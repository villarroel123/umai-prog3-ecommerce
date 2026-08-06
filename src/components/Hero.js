import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/55 z-0"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 font-sans">
          Lume
        </h1>
        <p className="text-lg sm:text-xl text-stone-200 font-serif max-w-2xl mx-auto mb-10">
          Bienvenida a tu nuevo estudio de manicura favorito. Diseños exclusivos, reutilizables y listos para lucir cuando quieras. ¡Descubrí tu estilo ideal!
        </p>
        
        <div>
          <Link
            href="/login"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 font-sans"
          >
            Comenzar
          </Link>
        </div>
      </div>
    </section>
  );
}