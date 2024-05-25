import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io"; // Iconos de alerta y cerrar
import { useClientes } from "../../context/ClientesContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ModalClientes({
  isOpen, // Estado para indicar si el modal está abierto
  closeModal, // Función para cerrar el modal
  addToCliente,
}) {
  const { clientes, getClientes } = useClientes();

  const [currentPage, setCurrentPage] = useState(1);
  const [productosPerPage] = useState(10); // Número de elementos por página
  const [searchTerm, setSearchTerm] = useState(""); // Para la búsqueda

  // Índices para la paginación
  const indexOfLastVenta = currentPage * productosPerPage;
  const indexOfFirstVenta = indexOfLastVenta - productosPerPage;
  const currentProductos = clientes.slice(indexOfFirstVenta, indexOfLastVenta); // Elementos a mostrar

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Manejar búsqueda
  const handleSearch = (event) => {
    setCurrentPage(1); // Restablecer la página al buscar
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda
  };

  // Filtrar ventas por el término de búsqueda
  const filteredVentas = currentProductos.filter(
    (venta) =>
      venta?.nombre?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      venta?.apellido?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const totalPages = Math.ceil(clientes.length / productosPerPage); // Calcular el total de páginas

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

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as="div"
          enter="transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <div className="fixed inset-0 bg-black/10" /> {/* Fondo oscuro */}
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end py-2">
                  <IoMdClose
                    onClick={closeModal} // Cierra el modal al hacer clic
                    className="hover:text-sky-700 hover:bg-gray-100 transition-all cursor-pointer text-4xl text-slate-800 bg-gray-200 py-2 px-2 rounded-full"
                  />
                </div>

                <div className="flex justify-center flex-col gap-4 items-center">
                  <div>
                    <p className="font-semibold text-slate-700">
                      Seleccionar el cliente de la venta
                    </p>
                  </div>

                  <div className="w-full">
                    {" "}
                    <input
                      type="text"
                      placeholder="Buscar cliente por el nombre o apellido..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="px-4 py-2.5 ml-3 rounded-full shadow-lg outline-none focus:ring-sky-500 focus:border-sky-500 font-bold text-sm w-[400px] border"
                    />
                  </div>

                  <div className="overflow-x-auto w-full capitalize">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th className="text-slate-500 text-sm uppercase">
                            Nombre
                          </th>
                          <th className="text-slate-500 text-sm uppercase">
                            Apellido
                          </th>
                        </tr>
                      </thead>
                      <tbody className="uppercase">
                        {filteredVentas.map((c) => (
                          <tr>
                            <th>{c.nombre}</th>
                            <th>{c.apellido}</th>
                            <td>
                              <button
                                onClick={() => {
                                  {
                                    addToCliente(
                                      c._id,
                                      c.nombre,
                                      c.apellido,
                                      c.email,
                                      c.dni,
                                      c.telefono,
                                      c.localidad,
                                      c.provincia
                                    ),
                                      closeModal();
                                  }
                                }}
                                className="bg-sky-700 py-2 px-6 rounded-full text-white font-semibold"
                              >
                                Seleccionar este cliente
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-3 flex justify-center items-center space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
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
                              currentPage === number
                                ? "bg-white"
                                : "bg-gray-300"
                            } py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-100 font-bold`}
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
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
