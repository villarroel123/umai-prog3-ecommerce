"use client";
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
export default function LoginPage(){
    //inicializo los datos
    const [nameUser, setNameUser]=useState("");
    const[emailUser, setEmailUser]= useState("");
    const[passwordUser, setPasswordUser]=useState("");

    const { setUserActive } = useAppContext();


    const handleSubmit=((e)=>{
        e.preventDefault();
    
        const user={
            name: nameUser,
            email: emailUser,
            password:passwordUser
        }

        setUserActive(user)//envio al context
    })

    return(
      <section className="max-w-md mx-auto my-12 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
        Iniciar Sesión
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
            <label htmlFor="name-login" className="text-xs font-semibold text-slate-600">
                Nombre
            </label>
            <input type="text" id="name-login" value={nameUser} onChange={(e) => setNameUser(e.target.value)} required placeholder="Tu nombre completo" className="p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-800"/>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email-login" className="text-xs font-semibold text-slate-600">
            Email
          </label>
          <input type="email" id="email-login" value={emailUser} onChange={(e) => setEmailUser(e.target.value)}required placeholder="tuemail@ejemplo.com" className="p-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-slate-800"/>
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
    </section>
    )

}