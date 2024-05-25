import React from "react";
import ReactWhatsapp from "react-whatsapp";
import { useAuth } from "../context/authContext";

export function CuentaInactivaHome() {
  const { user } = useAuth();

  return (
    <section className="mx-10 my-10 h-screen">
      <div className="flex justify-center items-center bg-white py-5 px-5 mx-auto w-1/2 rounded-xl shadow-xl flex-col gap-5">
        <p className="font-bold text-3xl text-slate-500">
          Activa tu cuenta para usar el sistema.
        </p>

        <ReactWhatsapp
          className="bg-sky-500 py-4 px-8 rounded-full text-white font-semibold"
          number="3462693961"
          message={`¡Hola, mi nombre es ${user?.username}! Quiero activar el sistema de gestión prisma.`}
        >
          Comunicarse ahora..
        </ReactWhatsapp>
      </div>
    </section>
  );
}
