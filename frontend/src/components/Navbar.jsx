import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutRequest } from "../api/auth";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="flex justify-between items-center py-5 px-10 container mx-auto">
      <h1 className="text-2xl font-bold">
        <Link
          className="text-orange-400 relative z-100"
          to={isAuthenticated ? "/home" : "/"}
        >
          Gestión Prisma Aluminox
          <div className="bg-orange-100/60 py-6 absolute px-8 top-[-10px] left-[-10px] rounded-xl z-[-1]"></div>
          <div className="bg-violet-100 py-6 absolute px-8 top-[1px] left-[-30px] rounded-xl z-[-1]"></div>
        </Link>
      </h1>
      {!isAuthenticated && (
        <ul className="flex items-center gap-4 text-lg">
          <Link
            className="hover:bg-teal-500 py-2 px-4 rounded-xl hover:shadow hover:text-white transition-all ease-in-out"
            to={"/funcionalidades"}
          >
            Funcionalidades
          </Link>
          <Link
            className="hover:bg-teal-500 py-2 px-4 rounded-xl hover:shadow hover:text-white transition-all ease-in-out"
            to={"/funcionalidades"}
          >
            Precios
          </Link>
          <Link
            className="hover:bg-teal-500 py-2 px-4 rounded-xl hover:shadow hover:text-white transition-all ease-in-out"
            to={"/funcionalidades"}
          >
            Asesorías
          </Link>
          <Link
            className="hover:bg-teal-500 py-2 px-4 rounded-xl hover:shadow hover:text-white transition-all ease-in-out"
            to={"/funcionalidades"}
          >
            Preguntas frecuentes
          </Link>
          <Link
            className="hover:bg-teal-500 py-2 px-4 rounded-xl hover:shadow hover:text-white transition-all ease-in-out"
            to={"/funcionalidades"}
          >
            Nosotros
          </Link>
        </ul>
      )}
      <ul className="flex gap-x-4">
        {isAuthenticated ? (
          <div className="flex justify-between items-center gap-36 w-full">
            {/* <div className="flex gap-4 items-center text-sm">
              <li>
                <ButtonLink to="/home">Inicio</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/productos">Ver Productos</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/ventas">Crear Nuevas Ventas</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/estadistica">
                  Filtrar datos o estadisticas
                </ButtonLink>
              </li>
            </div> */}
            <div className="flex gap-4 items-center">
              <li>
                <button
                  className="bg-violet-100 hover:shadow transition-all ease-linear px-4 py-2 text-violet-500 rounded-xl hover:bg-violet-500/80 hover:text-white flex items-center gap-2"
                  to="/"
                  onClick={() => logout()}
                >
                  Salir de la app
                  <IoLogOutOutline className="text-3xl" />
                </button>
              </li>
              <li className="text-orange-500 underline">
                Bienvenido {user.username}
              </li>
            </div>{" "}
          </div>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
