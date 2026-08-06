"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [error, setError] = useState("");
  const { setUserActive } = useAppContext();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email: emailUser,
        password: passwordUser,
      });
      setUserActive(response.data.user); // mando al context
      router.push("/");
    } catch (err) {
      console.error("Error al procesar el inicio de sesion:", err);
      const msg = "Error al procesar el inicio de sesion.";
      setError(msg);
    }
  };

  return (
    <section className="max-w-xl mx-auto my-14 p-8 sm:p-10 bg-white rounded-3xl border border-stone-200 shadow-sm font-lexend text-[#4A3525] ">
      <div className="space-y-2 text-center mb-8">
        <h2 className="text-3xl font-black text-[#4A3525] tracking-tight">
          Iniciar Sesión
        </h2>
        <p className="text-xs text-stone-500">
          Ingresá tus datos para acceder a tu cuenta
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold rounded-xl text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email-login" className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            id="email-login"
            value={emailUser}
            onChange={(e) => setEmailUser(e.target.value)}
            required
            placeholder="tuemail@ejemplo.com"
            className="p-3 text-sm border border-stone-200 rounded-xl outline-none focus:border-pink-600 focus:ring-2 focus:ring-pink-100 transition-all text-[#4A3525] bg-stone-50/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password-login" className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Contraseña
          </label>
          <input
            type="password"
            id="password-login"
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
            required
            placeholder="••••••••"
            className="p-3 text-sm border border-stone-200 rounded-xl outline-none focus:border-pink-600 focus:ring-2 focus:ring-pink-100 transition-all text-[#4A3525] bg-stone-50/50"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            className="w-full bg-[#4A3525] text-white text-xs font-bold py-3.5 px-4 rounded-xl hover:bg-[#3B291C] active:scale-[0.98] transition-all text-center shadow-sm uppercase tracking-wider"
          >
            Ingresar
          </button>
          <Link
            href="/"
            className="w-full text-center bg-stone-100 text-stone-600 text-xs font-bold py-3.5 px-4 rounded-xl hover:bg-stone-200 transition-all uppercase tracking-wider"
          >
            Cancelar
          </Link>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-stone-100 text-center">
        <p className="text-xs text-stone-500">
          ¿Sos nuevo?{" "}
          <Link href="/register" className="font-bold text-pink-700 hover:underline">
            Creá una cuenta acá
          </Link>
        </p>
      </div>
    </section>
  );
}