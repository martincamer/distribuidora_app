import { useState } from "react";
import { useClientes } from "../../context/ClientesContext"; // Cambia al contexto de clientes
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Iconos de flecha para paginación
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

export const TableClients = ({ clientes }) => {
  const { deleteCliente } = useClientes(); // Cambia al método para eliminar cliente

  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");

  // Aquí ordenamos los clientes por total de mayor a menor
  const sortedClients = clientes.slice().sort((a, b) => b.total - a.total);

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = sortedClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  };

  const filteredClients = currentClients.filter((client) =>
    client.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(clientes.length / clientsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = Math.min(currentPage + 4, totalPages); // Mostrar hasta 5 páginas
    const startPage = Math.max(1, maxPages - 4); // Comenzar desde la página adecuada
    for (let i = startPage; i <= maxPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const [isOpen, setIsOpen] = useState(false);

  // Alternar la visibilidad
  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-5">
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
            placeholder="Buscar el cliente por el nombre o apellido..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2.5 ml-3 rounded-full shadow-lg outline-none focus:ring-sky-500 focus:border-sky-500 font-bold text-sm w-[400px]"
          />
        </Transition>
      </div>

      <div className="transition-all ease-linear rounded-2xl mt-6">
        <table className="min-w-full bg-white text-sm rounded-2xl table">
          <thead>
            <tr>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Nombre
              </th>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Apellido
              </th>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Localidad
              </th>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Provincia
              </th>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                DNI
              </th>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Teléfono
              </th>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Email
              </th>
              <th className="text-left px-4 py-4 text-sky-500 text-sm uppercase">
                Deuda
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {filteredClients.map((c) => (
              <tr className="hover:bg-gray-100/50 cursor-pointer" key={c._id}>
                <th className="px-4 py-4 text-gray-900 uppercase text-sm">
                  {c.nombre}
                </th>
                <th className="px-4 py-4 uppercase text-sm">{c.apellido}</th>
                <th className="px-4 py-4 uppercase text-sm">{c.localidad}</th>
                <th className="px-4 py-4 uppercase text-sm">{c.provincia}</th>
                <th className="px-4 py-4 uppercase text-sm">{c.dni}</th>
                <th className="px-4 py-4 uppercase text-sm">{c.telefono}</th>
                <th className="px-4 py-4 uppercase text-sm">{c.email}</th>
                <th className="px-4 py-4 uppercase text-sm flex">
                  <p
                    className={` py-2 px-3 rounded-full  font-extrabold ${
                      c.total > 0
                        ? "bg-orange-100 text-orange-500"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {c.total.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2, // Mínimo dos decimales
                      maximumFractionDigits: 2, // Máximo dos decimales
                    })}
                  </p>
                </th>
                <td className="px-4 py-4 text-gray-500 uppercase text-sm">
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
                          to={`/editar-cliente/${c._id}`}
                        >
                          Editar el cliente
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                          to={`/cliente/${c._id}`}
                        >
                          Ver el cliente
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => deleteCliente(c._id)}
                          type="button"
                          className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                        >
                          Eliminar el cliente
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

      <div className="mt-3 flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-white py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-100 cursor-pointer"
        >
          <FaArrowLeft />
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
                {number}
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
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
