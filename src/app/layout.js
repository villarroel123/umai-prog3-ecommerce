import {  Poltawski_Nowy, Vollkorn } from "next/font/google";
import { AppContextProvider } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";

import "./globals.css";

const vollkorn= Vollkorn({
  variable:"--font-vollkorn",
  subsets:["latin"],
})
const poltawski= Poltawski_Nowy({
  variable:"--font-poltawski",
  subsets:["latin"],
})

export const metadata = {
  title: "CRUD de Productos",
  description: "Ejemplo simple de ecommerce con Next.js y MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poltawski.variable} ${vollkorn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFF2EF]">
        <AppContextProvider>
            <Navbar/>
            {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
