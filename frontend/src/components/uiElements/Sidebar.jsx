import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { AiOutlineDatabase } from "react-icons/ai";
import {
  CiDatabase,
  CiHome,
  CiUser,
  CiViewBoard,
  CiViewList,
} from "react-icons/ci";
import { FaMoneyCheckAlt } from "react-icons/fa";

export const SideBar = () => {
  const { logout, user } = useAuth();

  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Aquí podrías implementar la lógica para cerrar sesión
    console.log("Cerrando sesión...");
  };

  const params = useParams();

  return (
    <div
      className={`${
        isOpen ? "w-64 opacity-1" : "w-16 opacity-"
      } transition-all ease-linear flex flex-col bg-white min-h-screen max-h-full h-full z-[999] max-md:hidden`}
    >
      {/* Botón de menú */}
      <div
        className={`${
          isOpen ? "flex justify-between" : ""
        } transition-all ease-linear duration-300 py-[10px] px-4`}
      >
        <button className="text-3xl text-sky-700" onClick={handleToggle}>
          {isOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
        {isOpen && (
          <p className="bg-sky-700 py-1 px-2 rounded-xl text-sm text-white capitalize">
            {user?.username}
          </p>
        )}
      </div>
      {isOpen ? (
        <div className="w-full flex flex-col gap-0">
          <Link
            to={"/home"}
            className={`${
              location.pathname === "/home" ? "bg-sky-100" : "bg-none"
            } hover:text-sky-700 text-slate-700 text-sm transition-all py-3 px-3`}
          >
            Inicio
          </Link>
          <Link
            to={"/productos"}
            className={`${
              location.pathname === "/productos" ? "bg-sky-100" : "bg-none"
            } hover:text-sky-700 text-slate-700 text-sm transition-all py-3 px-3`}
          >
            Productos/crear/editar
          </Link>
          <Link
            to={"/clientes"}
            className="hover:text-sky-700 text-slate-700 text-sm transition-all py-3 px-3"
          >
            Clientes/Editar/Crear
          </Link>
          <Link
            to={"/ventas"}
            className="hover:text-sky-700 text-slate-700 text-sm transition-all py-3 px-3"
          >
            Crear nuevas ventas/presupuestos
          </Link>{" "}
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <div
            className={`${
              location.pathname === "/home" ? "bg-sky-100" : "bg-none"
            } w-full text-center py-2 items-center transition-all`}
          >
            <div
              className="tooltip tooltip-right"
              data-tip="VER ESTADISTICAS MENSUALES,VENTAS,ETC."
            >
              <Link to={"/home"}>
                <CiHome className="text-4xl text-sky-700" />
              </Link>
            </div>
          </div>
          <div
            className={`${
              location.pathname === "/productos" ||
              location.pathname === "/categorias" ||
              location.pathname === "/crear-producto" ||
              location.pathname === "/categorias" ||
              location.pathname === "/colores" ||
              location.pathname === `/editar-producto/${params.id}` ||
              location.pathname === `/producto/${params.id}`
                ? "bg-sky-100"
                : "bg-none"
            } w-full text-center py-2 items-center transition-all`}
          >
            <div
              className="tooltip tooltip-right"
              data-tip="VER LOS PERFILES/CREAR/ETC"
            >
              <Link to={"/productos"}>
                <CiViewList className="text-4xl text-sky-700" />
              </Link>
            </div>
          </div>

          <div
            className={`${
              location.pathname === "/clientes" ||
              location.pathname === `/editar-cliente/${params.id}` ||
              location.pathname === `/cliente/${params.id}` ||
              location.pathname === `/crear-cliente`
                ? "bg-sky-100"
                : "bg-none"
            } w-full text-center py-2 items-center transition-all`}
          >
            <div
              className="tooltip tooltip-right"
              data-tip="VER LOS CLIENTES/CREAR/CARGAR COMPROBANTES,ETC"
            >
              <Link to={"/clientes"}>
                <CiUser className="text-4xl text-sky-700" />
              </Link>
            </div>
          </div>

          <div
            className={`${
              location.pathname === "/ventas" ||
              location.pathname === `/crear-venta` ||
              location.pathname === `/venta/${params.id}` ||
              location.pathname === `/editar/${params.id}`
                ? "bg-sky-100"
                : "bg-none"
            } w-full text-center py-2 items-center transition-all`}
          >
            <div
              className="tooltip tooltip-right"
              data-tip="CREAR VENTAS/PRESUPUESTOS"
            >
              <Link to={"/ventas"}>
                <CiViewBoard className="text-4xl text-sky-700" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
