'use client'
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
export default function Navbar() {
  const { userActive } = useAppContext();
  const links = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/favorites", label: "Favorites" },
    { href: "/cart", label: "Cart" }
  ];

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 text-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <Link className="text-lg font-semibold" href="/">
          Ecommerce TP
        </Link>

        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          {/* if ternario */}
          {userActive?.name ? (
            <Link
              href="/user" className="rounded-lg px-3 py-2 text-sm font-medium bg-slate-100 text-slate-900 hover:bg-slate-200">
              {userActive.name}
            </Link>
          ) : (
            <Link
              href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950">
                Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
