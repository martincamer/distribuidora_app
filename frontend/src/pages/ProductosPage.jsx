import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { ImFileEmpty } from "react-icons/im";
import { BsFolderPlus } from "react-icons/bs";
import { TableProducts } from "../components/products/TableProducts";
import { IoClose, IoFilterOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import video from "../assets/video/producto.mp4";
import ModalFormProducts from "../components/modals/ModalFormProducts";
import ModalCategorias from "../components/modals/ModalCategorias";
import ModalColores from "../components/modals/ModalColores";

export function ProductosPage() {
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenCategorias, setIsOpenCategorias] = useState(false);
  let [isOpenColor, setIsOpenColor] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalCategorias() {
    setIsOpenCategorias(false);
  }

  function openModalCategoiras() {
    setIsOpenCategorias(true);
  }

  function closeModalColores() {
    setIsOpenColor(false);
  }

  function openModalColores() {
    setIsOpenColor(true);
  }

  const { productos, getProductos } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  const [idObtenida, setObtenerId] = useState(null);

  const handleID = (id) => setObtenerId(id);

  return (
    <div>
      <div className="bg-white w-full flex justify-between items-center">
        <div className="flex max-md:hidden">
          <Link
            to={"/productos"}
            className="bg-sky-100 px-8 text-[16px] py-4 text-sky-500 font-semibold cursor-pointer"
          >
            Perfiles
          </Link>
        </div>
        <div className="mx-5 z-[0] flex gap-2 max-md:hidden">
          <Link
            to={"/colores"}
            className="text-sm font-semibold bg-green-500 py-2 px-5 rounded-2xl text-white group flex gap-3 items-center relative transition-all ease-linear duration-300 z-0"
          >
            <Link
              to={"/colores"}
              className="transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            >
              Crear nuevo color
            </Link>
            <IoIosAddCircleOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
          </Link>
          <Link
            to={"/categorias"}
            className="text-sm font-semibold bg-green-500 py-2 px-5 rounded-2xl text-white group flex gap-3 items-center relative transition-all ease-linear duration-300 z-0"
          >
            <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
              Crear categorias
            </span>
            <IoIosAddCircleOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
          </Link>
          <Link
            to={"/crear-producto"}
            className="text-sm font-semibold bg-green-500 py-2 px-5 rounded-2xl text-white group flex gap-3 items-center relative transition-all ease-linear duration-300 z-0"
          >
            <Link
              to={"/crear-producto"}
              className="transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            >
              Crear nuevo producto
            </Link>
            <IoIosAddCircleOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
          </Link>
        </div>
      </div>

      {productos.length === 0 && (
        <div className="flex flex-col gap-6 justify-center items-center p-10 bg-white w-1/3 mx-auto my-10 rounded-xl">
          <div>
            <ImFileEmpty className="text-6xl text-sky-500 m-auto my-2" />
            <h1 className="font-bold text-lg text-slate-500">
              No hay ningun producto cargado ahún, carga uno ahora
            </h1>
          </div>
          <div>
            <Link
              to={"/crear-producto"}
              className="bg-sky-500 text-white py-3 px-6 rounded-full text-sm font-semibold hover:shadow-md transition-all ease-linear flex gap-2 items-center"
              // to={"/crear-producto"}
            >
              Crear nuevo producto
              <BsFolderPlus className="text-2xl" />
            </Link>
          </div>
        </div>
      )}

      {productos.length === 0 && (
        <div className={`w-full flex justify-center`}>
          <button
            className="bg-sky-500 rounded-full text-base px-5 py-3 text-white font-bold hover:shadow-lg transition-all"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Ver tutorial de como crear un perfil de aluminio
          </button>
          <dialog
            id="my_modal_1"
            className="modal w-full max-w-none" // Ancho completo para el modal
          >
            <div
              className="modal-box w-full py-0"
              style={{ maxWidth: "1000px" }}
            >
              <div className="modal-action">
                <form method="dialog">
                  {/* Botón para cerrar el diálogo */}
                  <button className="bg-gray-100 hover:bg-gray-200 transition-all py-3 px-3 rounded-full outline-none">
                    <IoClose className="text-2xl text-sky-500" />
                  </button>
                </form>
              </div>
              <div className="py-5">
                <h3 className="text-xl text-yellow-500 font-bold">
                  Mira el video tutorial de como crear un perfil de aluminio ✋
                </h3>
                <p className="text-sm mt-2 font-medium">
                  ¡Segui todos los pasos para crear tu primer producto!
                </p>

                <video className="h-full w-full rounded-lg mt-5" controls>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </dialog>
        </div>
      )}

      {productos.length > 0 && (
        <div className="flex flex-col gap-2 mx-10 max-md:mx-5">
          <section className="py-10 grid grid-cols-4 gap-4 max-md:grid-cols-1">
            <div className="stats shadow-xl items-center scroll-bar">
              <div className="stat">
                <div className="stat-title font-semibold">
                  Total perfiles cargados
                </div>
                <div className="stat-value">{productos.length}</div>
                <div className="stat-desc font-bold text-green-500">
                  ↗︎ {productos.length % 100}%
                </div>
              </div>

              <div className="py-5 px-5 w-32 font-bold mx-auto">
                <CircularProgressbar
                  value={productos.length}
                  text={`${productos.length}%`}
                  strokeWidth={9}
                  // backgroundPadding={"#22c55e"}
                  styles={buildStyles({
                    textColor: "#0287e0",
                    pathColor: "#0287e0",
                    trailColor: "#e5e7eb",
                  })}
                />
              </div>
            </div>
          </section>
          <div className="bg-white rounded-xl py-5 px-5 transition-all ease-linear flex gap-2 text-sm max-md:hidden">
            <Link
              to={"/crear-producto"}
              className="bg-sky-500 font-semibold py-3 px-6 rounded-full text-white group flex gap-3 items-center relative transition-all"
            >
              <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                Crear nuevo producto
              </span>
              <BsFolderPlus className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
            </Link>
            <Link
              to={"/categorias"}
              className="bg-green-500/90 py-3 px-6 rounded-full text-white font-semibold group flex gap-3 items-center relative transition-all"
            >
              <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                Crear nuevas categorias
              </span>
              <IoFilterOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
            </Link>
            <Link
              to={"/colores"}
              className="bg-orange-500/90 py-3 px-6 rounded-full text-white font-semibold group flex gap-3 items-center relative transition-all"
            >
              <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                Crear nuevos colores
              </span>
              <IoFilterOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
            </Link>
          </div>
          <div className="bg-white rounded-xl py-4 px-2 text-sm md:hidden overflow-x-scroll scroll-bar">
            <div className="flex w-[630px] gap-3 text-xs">
              <Link
                to={"/crear-producto"}
                className="bg-sky-500 font-semibold py-3 px-6 rounded-full text-white group flex gap-3 items-center relative transition-all"
              >
                <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                  Crear nuevo producto
                </span>
                <BsFolderPlus className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
              </Link>
              <Link
                to={"/categorias"}
                className="bg-green-500/90 py-3 px-6 rounded-full text-white font-semibold group flex gap-3 items-center relative transition-all"
              >
                <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                  Crear nuevas categorias
                </span>
                <IoFilterOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
              </Link>
              <Link
                to={"/colores"}
                className="bg-orange-500/90 py-3 px-6 rounded-full text-white font-semibold group flex gap-3 items-center relative transition-all"
              >
                <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                  Crear nuevos colores
                </span>
                <IoFilterOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
              </Link>
            </div>
          </div>

          <TableProducts
            handleID={handleID}
            openModal={openModal}
            productos={productos}
          />
        </div>
      )}
      <ModalFormProducts
        idObtenida={idObtenida}
        isOpen={isOpen}
        closeModal={closeModal}
      />
      <ModalCategorias
        isOpen={isOpenCategorias}
        closeModal={closeModalCategorias}
        idObtenida={idObtenida}
      />
      <ModalColores
        isOpen={isOpenColor}
        closeModal={closeModalColores}
        idObtenida={idObtenida}
      />
    </div>
  );
}
