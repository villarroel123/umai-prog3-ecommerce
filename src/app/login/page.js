"use client";
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage(){
    const [emailUser, setEmailUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [error, setError] = useState("");
    const { setUserActive } = useAppContext();
    const router = useRouter();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
          const response= await axios.post("/api/auth/login",{
            email: emailUser,
            password: passwordUser,
          })
          setUserActive(response.data.user)//mando al context
          router.push("/");
        }catch (err) {
        console.error("Error al procesar el inicio de sesion:", err);
        const msg = "Error al procesar el inicio de sesion.";
        setError(msg);
        }
    }

    return(
      <section className="max-w-md mx-auto my-12 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Iniciar Sesión
        </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email-login" className="text-xs font-semibold text-slate-600">
            Email
          </label>
          <input type="email" id="email-login" value={emailUser} onChange={(e) => setEmailUser(e.target.value)} required placeholder="tuemail@ejemplo.com" className="p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-800"/>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password-login" className="text-xs font-semibold text-slate-600">
            Contraseña
          </label>
          <input type="password" id="password-login" value={passwordUser} onChange={(e) => setPasswordUser(e.target.value)} required placeholder="••••••••" className="p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-800"/>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button type="submit" className="w-full bg-slate-900 text-white text-xs font-semibold py-3 px-4 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all">
            Ingresar
          </button>
          <Link href="/" className="w-full text-center bg-slate-100 text-slate-600 text-xs font-semibold py-3 px-4 rounded-xl hover:bg-slate-200 transition-all">
            Cancelar
          </Link>
        </div>
      </form>
      <div className="mt-6 pt-4 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500">
          ¿Sos nuevo?{" "}
          <Link href="/register" className="font-semibold text-slate-900 hover:underline">
            Creá una cuenta acá
          </Link>
        </p>
      </div>
    </section>
    )

}