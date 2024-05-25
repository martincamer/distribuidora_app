import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  const handleLinkClick = () => {
    document.getElementById("my-drawer").checked = false;
  };

  return (
    <header
      className={`${isAuthenticated ? "bg-sky-500" : "bg-white"} z-[-100]`}
    >
      <nav className="flex justify-between items-center py-2 px-10 max-md:flex-row max-md:gap-1 max-md:items-center max-md:justify-between max-md:w-full">
        <h1 className="text-2xl font-bold">
          <Link className="relative" to={isAuthenticated ? "/home" : "/"}>
            <p
              className={`${
                isAuthenticated ? "text-white" : "text-sky-500 py-3"
              } z-[-100]`}
            >
              Gestión Prisma
            </p>
          </Link>
        </h1>
        {!isAuthenticated && (
          <ul className="items-center gap-4 text-lg hidden">
            <Link
              className="hover:bg-sky-500/10 py-1.5 text-sm font-medium px-6 rounded-xl hover:text-sky-500 transition-all ease-in-out"
              to={"/funcionalidades"}
            >
              Funcionalidades
            </Link>
            <Link
              className="hover:bg-sky-500/10 py-1.5 text-sm font-medium px-6 rounded-xl hover:text-sky-500 transition-all ease-in-out"
              to={"/funcionalidades"}
            >
              Precios
            </Link>
            <Link
              className="hover:bg-sky-500/10 py-1.5 text-sm font-medium px-6 rounded-xl hover:text-sky-500 transition-all ease-in-out"
              to={"/funcionalidades"}
            >
              Asesorías
            </Link>
            <Link
              className="hover:bg-sky-500/10 py-1.5 text-sm font-medium px-6 rounded-xl hover:text-sky-500 transition-all ease-in-out"
              to={"/funcionalidades"}
            >
              Preguntas frecuentes
            </Link>
            <Link
              className="hover:bg-sky-500/10 py-1.5 text-sm font-medium px-6 rounded-xl hover:text-sky-500 transition-all ease-in-out"
              to={"/funcionalidades"}
            >
              Nosotros
            </Link>
          </ul>
        )}
        <ul className="flex gap-x-4 max-md:hidden">
          {isAuthenticated ? (
            <div className="flex justify-between items-center gap-36 w-full">
              <div className="dropdown dropdown-end z-[100]">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-16 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user?.imagen ||
                        "https://ppstatic.s3.amazonaws.com/expenses/uploads/people/default.png"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-60"
                >
                  <div className="py-2 px-2">
                    <img
                      className="rounded-full w-28 mx-auto"
                      src={
                        user.imagen ||
                        "https://ppstatic.s3.amazonaws.com/expenses/uploads/people/default.png"
                      }
                      alt=""
                    />
                    <div className="py-2 ">
                      <p className="font-semibold text-sky-500 capitalize text-center">
                        {user.username}
                      </p>
                      <p className="font-semibold text-gray-500 text-xs capitalize text-center">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <li className="mb-1">
                    <Link
                      to={"/perfil"}
                      className="justify-between hover:bg-sky-500 py-2 transition-all hover:text-white font-semibold"
                    >
                      Perfil
                      <span className="badge">Nuevo</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => logout()}
                      type="button"
                      className="justify-between hover:bg-sky-500 py-2 transition-all hover:text-white font-semibold"
                    >
                      Salir de la aplicación
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 max-md:hidden">
              <li>
                <Link
                  className="font-semibold text-white bg-sky-500 py-2 px-6 rounded-full text-sm hover:shadow-md  transition-all"
                  to="/login"
                >
                  Iniciar Sesion
                </Link>
              </li>
              <li>
                <Link
                  className="font-semibold text-white bg-sky-500 py-2 px-6 rounded-full text-sm hover:shadow-md  transition-all"
                  to="/register"
                >
                  Registrarte ahora
                </Link>
              </li>
            </div>
          )}
        </ul>
        {isAuthenticated ? (
          ""
        ) : (
          <div className="drawer w-auto md:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-circle swap swap-rotate drawer-button text-sky-500"
            >
              <input type="checkbox" />

              {/* hamburger icon */}
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* close icon */}
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-2">
                {/* Sidebar content here */}
                <li>
                  <Link
                    to="/register"
                    className="bg-sky-500 text-white font-bold"
                    onClick={handleLinkClick}
                  >
                    Registrate ahora.
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="bg-sky-500 text-white font-bold"
                    onClick={handleLinkClick}
                  >
                    Ya tienes una cuenta? Inicia Sesión.
                  </Link>
                </li>
                <div className="font-bold text-lg text-orange-500 w-full text-center">
                  Gestión Prisma
                </div>
              </ul>
            </div>
          </div>
        )}
        {isAuthenticated && (
          <div className="drawer w-auto z-[999] p-0 md:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
              <label htmlFor="my-drawer" className=" btn-primary drawer-button">
                <div className="swap swap-rotate">
                  {/* this hidden checkbox controls the state */}
                  <input type="checkbox" />

                  {/* hamburger icon */}
                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  {/* close icon */}
                  <svg
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </div>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-8 w-80 min-h-full text-base-content bg-white gap-2">
                {/* Sidebar content here */}
                <Link
                  onClick={() => handleLinkClick()}
                  to={"/home"}
                  className="font-semibold text-xl text-sky-500"
                >
                  Inicio
                </Link>{" "}
                <Link
                  onClick={() => handleLinkClick()}
                  to={"/productos"}
                  className="font-semibold text-xl text-sky-500"
                >
                  Perfiles
                </Link>
                <Link
                  onClick={() => handleLinkClick()}
                  to={"/clientes"}
                  className="font-semibold text-xl text-sky-500"
                >
                  Clientes
                </Link>
                <Link
                  onClick={() => handleLinkClick()}
                  to={"/ventas"}
                  className="font-semibold text-xl text-sky-500"
                >
                  Ventas/Presupuestos
                </Link>
              </ul>
            </div>
          </div>
        )}{" "}
      </nav>
    </header>
  );
}
