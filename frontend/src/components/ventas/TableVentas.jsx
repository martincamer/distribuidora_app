import { useState } from "react";
import { useVentas } from "../../context/VentasContext"; // Asegúrate de tener un contexto de ventas
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Iconos para la paginación
import { IoIosMore } from "react-icons/io"; // Para el menú de acciones
import { CiCreditCard1 } from "react-icons/ci";
import { Link } from "react-router-dom"; // Para enlaces de navegación
import { Tab, Transition } from "@headlessui/react";
import { updateFecha } from "../../helpers/FechaUpdate";
import { useObtenerId } from "../../helpers/obtenerId";
import ModalEstado from "./ModalEstado";
import { useModal } from "../../helpers/modal";
import ModalConvertirVenta from "./ModalConvertirVenta";

export const TableVentas = ({ ventas }) => {
  const { deleteVenta } = useVentas(); // Asegúrate de tener la función para eliminar ventas

  const [currentPage, setCurrentPage] = useState(1);
  const [ventasPerPage] = useState(10); // Número de elementos por página
  const [searchTerm, setSearchTerm] = useState(""); // Para la búsqueda

  const {
    openModal: openModalGenerarVenta,
    closeModal: closeModalGenerarVenta,
    isOpen: isOpenGenerarVenta,
  } = useModal();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleObtenerId, idObtenida } = useObtenerId();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Índices para la paginación
  const indexOfLastVenta = currentPage * ventasPerPage;
  const indexOfFirstVenta = indexOfLastVenta - ventasPerPage;
  // Ordenar ventas por fecha de creación
  const sortedVentas = ventas
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const currentVentas = sortedVentas.slice(indexOfFirstVenta, indexOfLastVenta); // Elementos a mostrar

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Manejar búsqueda
  const handleSearch = (event) => {
    setCurrentPage(1); // Restablecer la página al buscar
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda
  };

  // Filtrar ventas por el término de búsqueda
  const filteredVentas = currentVentas.filter(
    (venta) =>
      venta.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(sortedVentas.length / ventasPerPage); // Calcular el total de páginas

  // Obtener los números de las páginas a mostrar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = Math.min(currentPage + 4, totalPages); // Hasta 5 páginas
    const startPage = Math.max(1, maxPages - 4); // Desde la página adecuada
    for (let i = startPage; i <= maxPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const tabStyle = (isSelected) => `
  py-2 px-5 font-semibold capitalize rounded-full  flex gap-2 items-center
  ${
    isSelected
      ? "bg-sky-700 text-white border-sky-700 border-[1px]"
      : "bg-white text-gray-700 border-[1px] border-gray-300"
  } transition  ease-linear outline-none
`;

  const [isOpen, setIsOpen] = useState(false);

  // Alternar la visibilidad
  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="py-5">
      <div className="flex items-center">
        {/* Botón para abrir/cerrar el campo de búsqueda */}
        <button
          onClick={toggleSearchBar}
          className="p-3 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition fixed right-4 z-[100]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        {/* Animación de transición para el campo de búsqueda */}
        <Transition
          show={isOpen}
          enter="transition-all duration-500 ease-out"
          enterFrom="w-0 opacity-0"
          enterTo="w-1/3 opacity-100"
          leave="transition-all duration-500 ease-in"
          leaveFrom="w-1/3 opacity-100"
          leaveTo="w-0 opacity-0"
        >
          <input
            type="text"
            placeholder="Buscar producto por el cliente..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2.5 ml-3 rounded-full shadow-lg outline-none focus:ring-sky-500 focus:border-sky-500 font-bold text-sm w-[400px]"
          />
        </Transition>
      </div>

      <Tab.Group>
        <Tab.List className={"gap-3 flex mt-8"}>
          <Tab className={({ selected }) => tabStyle(selected)}>
            Ver Ventas <CiCreditCard1 className="font-bold text-2xl" />
          </Tab>
          <Tab className={({ selected }) => tabStyle(selected)}>
            Ver Presupuestos <CiCreditCard1 className="font-bold text-2xl" />
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="transition-all ease-linear rounded-2xl mt-3 py-5">
              <table className="min-w-full table bg-white text-sm rounded-2xl">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-4 text-sky-700 uppercase text-sm">
                      Tipo
                    </th>
                    <th className="text-left px-4 py-4 text-sky-700 uppercase text-sm">
                      Cliente
                    </th>
                    <th className="text-left px-4 py-4 text-sky-700 uppercase text-sm">
                      Total Brs
                    </th>
                    <th className="text-left px-4 py-4 text-sky-700 uppercase text-sm">
                      Total Kgs
                    </th>
                    <th className="text-left px-4 py-4 text-sky-700 uppercase text-sm">
                      Total
                    </th>
                    <th className="text-left px-4 py-4 text-sky-700 uppercase text-sm">
                      Fecha
                    </th>
                    <th className="text-left px-4 py-4 text-sky-700 text-sm uppercase">
                      Estado de la venta
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 uppercase">
                  {filteredVentas
                    .filter((v) => v.tipo === "venta") // Filtra solo los elementos con tipo "venta"
                    .map((v) => (
                      <tr
                        key={v._id}
                        className="hover:bg-gray-100/50 cursor-pointer"
                      >
                        <td className="px-4 py-4 font-bold text-gray-700 uppercase">
                          {v.tipo}
                        </td>
                        <td className="px-4 py-4 text-gray-700 font-bold uppercase">
                          {v.cliente.nombre} {v.cliente.apellido}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex">
                            <p className="text-white bg-yellow-500/90 py-2 px-5 font-bold rounded-full">
                              {v.productos.reduce(
                                (total, producto) => total + producto.cantidad,
                                0
                              )}{" "}
                              brs
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex">
                            <p className="text-white bg-green-500/90 py-2 px-5 font-bold rounded-full">
                              {v.productos
                                .reduce(
                                  (total, producto) =>
                                    total + producto.total_kilogramos,
                                  0
                                )
                                .toFixed(2)}{" "}
                              kgs
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 ">
                          <div className="flex">
                            <p className="text-white bg-sky-700 py-2 px-5 font-bold rounded-full">
                              {v.productos
                                .reduce(
                                  (total, producto) =>
                                    total + producto.total_dinero,
                                  0
                                )
                                .toLocaleString("es-AR", {
                                  style: "currency",
                                  currency: "ARS",
                                })}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-gray-700 font-semibold">
                          {updateFecha(v.date)}
                        </td>
                        <td className="px-4 py-4 text-gray-700 font-semibold">
                          <div className="flex">
                            <p
                              className={`font-semibold py-2.5 px-5 rounded-2xl ${
                                (v.estado === "aceptada" &&
                                  "bg-green-200/90 text-green-700 ") ||
                                (v.estado === "pendiente" &&
                                  "bg-orange-200/90 text-orange-700 ") ||
                                (v.estado === "rechazada" &&
                                  "bg-red-200/90 text-red-700 ")
                              }`}
                            >
                              {(v.estado === "aceptada" && "aceptada") ||
                                (v.estado === "pendiente" && "Pendiente") ||
                                (v.estado === "rechazada" && "Rechazada")}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="dropdown dropdown-left drop-shadow-lg">
                            <div
                              tabIndex={0}
                              role="button"
                              className="py-2 px-2 transition-all hover:bg-sky-500 hover:text-white border-none rounded-full"
                            >
                              <IoIosMore className="text-2xl" />
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-1"
                            >
                              <li>
                                <Link
                                  className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                                  to={`/editar-venta/${v._id}`}
                                >
                                  Editar venta
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                                  onClick={() => {
                                    handleObtenerId(v._id), openModal();
                                  }}
                                >
                                  Editar estado
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                                  to={`/venta/${v._id}`}
                                >
                                  Ver venta/facturar
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={() => deleteVenta(v._id)} // Función para eliminar venta
                                  type="button"
                                  className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                                >
                                  Eliminar venta
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="transition-all ease-linear rounded-2xl mt-3">
              <table className="min-w-full table bg-white text-sm rounded-2xl">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-4 font-bold text-sky-700 uppercase text-sm">
                      Tipo
                    </th>
                    <th className="text-left px-4 py-4 font-bold text-sky-700 uppercase text-sm">
                      Cliente
                    </th>
                    <th className="text-left px-4 py-4 font-bold text-sky-700 uppercase text-sm">
                      Total Brs
                    </th>
                    <th className="text-left px-4 py-4 font-bold text-sky-700 uppercase text-sm">
                      Total Kgs
                    </th>
                    <th className="text-left px-4 py-4 font-bold text-sky-700 uppercase text-sm">
                      Total
                    </th>
                    <th className="text-left px-4 py-4 font-bold text-sky-700 uppercase text-sm">
                      Fecha
                    </th>
                    {/* <th className="text-left px-4 py-4 font-bold text-sky-700 uppercase text-sm">
                      Estado del presupuesto
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredVentas
                    .filter((v) => v.tipo === "presupuesto") // Filtra solo los elementos con tipo "venta"
                    .map((v) => (
                      <tr
                        key={v._id}
                        className="hover:bg-gray-100/50 cursor-pointer uppercase"
                      >
                        <td className="px-4 py-4 font-semibold text-gray-700">
                          {v.tipo}
                        </td>
                        <td className="px-4 py-4 text-gray-700 font-semibold">
                          {v.cliente.nombre} {v.cliente.apellido}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex">
                            <p className="text-white bg-yellow-500/90 py-2 px-5 font-bold rounded-full">
                              {v.productos.reduce(
                                (total, producto) => total + producto.cantidad,
                                0
                              )}{" "}
                              brs
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex">
                            <p className="text-white bg-green-500/90 py-2 px-5 font-bold rounded-full">
                              {v.productos
                                .reduce(
                                  (total, producto) =>
                                    total + producto.total_kilogramos,
                                  0
                                )
                                .toFixed(2)}{" "}
                              kgs
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 ">
                          <div className="flex">
                            <p className="text-white bg-sky-700 py-2 px-5 font-bold rounded-full">
                              {v.productos
                                .reduce(
                                  (total, producto) =>
                                    total + producto.total_dinero,
                                  0
                                )
                                .toLocaleString("es-AR", {
                                  style: "currency",
                                  currency: "ARS",
                                })}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-gray-700 font-semibold">
                          {updateFecha(v.date)}
                        </td>

                        <td className="px-4 py-4">
                          <div className="dropdown dropdown-left drop-shadow-lg">
                            <div
                              tabIndex={0}
                              role="button"
                              className="py-2 px-2 transition-all hover:bg-sky-500 hover:text-white border-none rounded-full"
                            >
                              <IoIosMore className="text-2xl" />
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-1"
                            >
                              <li>
                                <Link
                                  className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                                  to={`/editar-venta/${v._id}`}
                                >
                                  Editar venta
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    handleObtenerId(v._id),
                                      openModalGenerarVenta();
                                  }} // Función para eliminar venta
                                  type="button"
                                  className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                                >
                                  Generar venta manera rapida
                                </button>
                              </li>
                              <li>
                                <Link
                                  className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                                  to={`/venta/${v._id}`}
                                >
                                  Ver venta/facturar
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={() => deleteVenta(v._id)} // Función para eliminar venta
                                  type="button"
                                  className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                                >
                                  Eliminar venta
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* Tabla de ventas */}
      {/* Paginación */}
      <div className="flex pb-12 justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-white py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-100 cursor-pointer"
        >
          <FaArrowLeft /> {/* Icono para la flecha izquierda */}
        </button>
        <ul className="flex space-x-2">
          {getPageNumbers().map((number) => (
            <li key={number} className="cursor-pointer">
              <button
                onClick={() => paginate(number)}
                className={`${
                  currentPage === number ? "bg-white" : "bg-gray-300"
                } py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-100`}
              >
                {number} {/* Número de página */}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-white py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-100 cursor-pointer"
        >
          <FaArrowRight /> {/* Icono para la flecha derecha */}
        </button>
      </div>

      <ModalEstado
        closeModal={closeModal}
        isOpen={isModalOpen}
        idObtenida={idObtenida}
      />

      <ModalConvertirVenta
        closeModal={closeModalGenerarVenta}
        isOpen={isOpenGenerarVenta}
        idObtenida={idObtenida}
      />
    </div>
  );
};
