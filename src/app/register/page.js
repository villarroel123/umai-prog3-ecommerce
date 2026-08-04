"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";

export default function ResgisterPage(){
    const [nameUser, setNameUser]=useState("");
    const [emailUser, setEmailUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [error, setError] = useState("");
    const { setUserActive } = useAppContext();
    const router = useRouter();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setError("");
        try{
          const response= await axios.post("/api/auth/register",{
            name:nameUser,
            email: emailUser,
            password: passwordUser,
          })
          setUserActive(response.data.user)//mando al context
          router.push("/");
        }catch (err) {
        console.error("Ocurrió un error al registrar el usuario:", err);
        const msg = "Ocurrió un error al registrar el usuario";
        setError(msg);
        }
    }

    return (
    <section className="max-w-md mx-auto my-12 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
        Crear Cuenta
      </h2>
      {error && (
        <div className="mb-4 p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name-register"
            className="text-xs font-semibold text-slate-600">
            Nombre completo
          </label>
          <input
            type="text"
            id="name-register"
            value={nameUser}
            onChange={(e) => setNameUser(e.target.value)}
            required
            className="p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-800"/>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email-register"
            className="text-xs font-semibold text-slate-600">
            Email
          </label>
          <input type="email" id="email-register" value={emailUser} onChange={(e) => setEmailUser(e.target.value)}
            required
            className="p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-800"/>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password-register"
            className="text-xs font-semibold text-slate-600">
            Contraseña
          </label>
          <input type="password" id="password-register" value={passwordUser} onChange={(e) => setPasswordUser(e.target.value)}
            required placeholder="••••••••" className="p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-800"/>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button type="submit" className="w-full bg-slate-900 text-white text-xs font-semibold py-3 px-4 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all">
            Registrarme
          </button>
          <Link href="/" className="w-full text-center bg-slate-100 text-slate-600 text-xs font-semibold py-3 px-4 rounded-xl hover:bg-slate-200 transition-all">
            Cancelar
          </Link>
        </div>
      </form>
      <div className="mt-6 pt-4 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500">
          ¿Ya tenés una cuenta?{" "}
          <Link href="/login"
            className="font-semibold text-slate-900 hover:underline">
            Iniciá sesión acá
          </Link>
        </p>
      </div>
    </section>
  );
}