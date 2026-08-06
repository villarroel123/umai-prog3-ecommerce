
"use client";

import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";

export default function Navbar() {
  const { userActive, cart, favorites } = useAppContext();
  
  const totalCartItems = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalFavorites = favorites?.length || 0;

  const links = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categorías" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/favorites", label: "Favoritos", count: totalFavorites },
    { href: "/cart", label: "Carrito", count: totalCartItems }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-20 py-4">
        <Link 
          className="text-2xl font-black tracking-tight text-[#4A3525] hover:opacity-90 transition-opacity" 
          href="/"
        >
          Lume
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              className="rounded-xl px-4 py-2 text-sm font-medium text-stone-600 hover:text-pink-700 hover:bg-pink-50/60 transition-all duration-200"
              href={link.href}
            >
              {link.label} {link.count > 0 && `(${link.count})`}
            </Link>
          ))}

          <div className="h-5 w-[1px] bg-stone-200 mx-2"></div>

          {userActive?.name ? (
            <Link
              href="/user" 
              className="rounded-xl px-4 py-2 text-sm font-bold bg-pink-50 border border-pink-200/60 text-pink-700 hover:bg-pink-100/70 transition-all shadow-sm"
            >
              {userActive.name}
            </Link>
          ) : (
            <Link
              href="/login" 
              className="rounded-xl px-5 py-2 text-sm font-semibold bg-[#4A3525] text-white hover:bg-[#3B291C] transition-all shadow-sm"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}