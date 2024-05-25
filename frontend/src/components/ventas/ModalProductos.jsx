import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { useProductos } from "../../context/ProductosContext";
import { generateRandomNumericId } from "../../helpers/generateId";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ModalProductos({ isOpen, closeModal, addToProducto }) {
  const { productos, getProductos } = useProductos();
  const [productoData, setProductoData] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [productosPerPage] = useState(10); // Número de elementos por página
  const [searchTerm, setSearchTerm] = useState(""); // Para la búsqueda

  // Índices para la paginación
  const indexOfLastVenta = currentPage * productosPerPage;
  const indexOfFirstVenta = indexOfLastVenta - productosPerPage;
  const currentProductos = productos.slice(indexOfFirstVenta, indexOfLastVenta); // Elementos a mostrar

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
      venta?.codigo?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      venta?.detalle?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const totalPages = Math.ceil(productos.length / productosPerPage); // Calcular el total de páginas

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
    getProductos();
  }, []);

  dayjs.extend(utc);
  const fechaActual = dayjs().utc().format();

  const handleInputChange = (index, field, value) => {
    setProductoData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const handleAddProducto = (index, producto) => {
    const data = productoData[index] || {};

    addToProducto(
      producto._id,
      generateRandomNumericId(),
      producto.codigo,
      producto.detalle,
      producto.imagen,
      producto.color,
      producto.categoria,
      producto.kg_barra_estimado,
      parseFloat(
        data.kilogramos || producto.kg_barra_estimado * data.cantidad
      ) || 0,
      parseFloat(data.precio) || 0,
      Number(
        (parseFloat(data.kilogramos || producto.kg_barra_estimado) || 0) *
          (parseFloat(data.cantidad) || 0)
      ) * (parseFloat(data.precio) || 0),
      parseFloat(data.cantidad) || 0,
      fechaActual
    );

    setProductoData({});
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[103]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform h-full overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end py-2">
                  <IoMdClose
                    onClick={closeModal}
                    className="hover:text-sky-700 rounded-full transition-all cursor-pointer text-4xl py-1.5 text-slate-800 bg-gray-200"
                  />
                </div>

                <div className="flex flex-col gap-5 items-center">
                  <p className="font-semibold text-slate-700 text-lg">
                    Seleccionar productos 👋
                  </p>

                  <div className="w-full">
                    {" "}
                    <input
                      type="text"
                      placeholder="Buscar producto por el codigo o detalle..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="px-4 py-2.5 ml-3 rounded-full shadow-lg outline-none focus:ring-sky-500 focus:border-sky-500 font-bold text-sm w-[400px] border"
                    />
                  </div>

                  <div className="overflow-x-auto w-full capitalize">
                    <table className="table table-auto w-full">
                      <thead>
                        <tr>
                          <th className="font-bold text-sm uppercase">
                            Código
                          </th>
                          <th className="font-bold text-sm uppercase">
                            Detalle
                          </th>
                          <th className="font-bold text-sm uppercase">
                            Categoria
                          </th>
                          <th className="font-bold text-sm uppercase">Color</th>
                          <th className="font-bold text-sm uppercase">
                            Stock/Fabrica
                          </th>
                          <th className="font-bold text-sm uppercase">
                            Kilogramos/peso barra
                          </th>
                          <th className="font-bold text-sm uppercase">
                            Cantidad
                          </th>
                          <th className="font-bold text-sm uppercase">
                            Precio del kg
                          </th>
                          <th className="font-bold text-sm uppercase">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVentas.map((producto, index) => (
                          <tr key={index}>
                            <th className="text-sm">{producto.codigo}</th>
                            <th className="text-sm uppercase">
                              {producto.detalle}
                            </th>
                            <th className="text-sm uppercase">
                              {producto.categoria}
                            </th>
                            <th className="text-sm">{producto.color}</th>
                            <th className="text-sm text-sky-500">
                              {producto.stock}
                            </th>
                            <th className="text-sm">
                              <input
                                type="text"
                                placeholder="PESO BARRA KG"
                                value={
                                  productoData[index]?.kilogramos ||
                                  producto.kg_barra_estimado
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "kilogramos",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-200 rounded-xl py-2 px-3 placeholder:font-bold placeholder:text-slate-400 text-gray-700 outline-none focus:outline-sky-500"
                              />
                            </th>
                            <th>
                              <input
                                type="text"
                                placeholder="CANTIDAD BARRAS"
                                value={productoData[index]?.cantidad || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "cantidad",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-200 rounded-xl py-2 px-3 placeholder:font-bold placeholder:text-slate-400 text-gray-700 outline-none focus:outline-sky-500"
                              />
                            </th>
                            <th>
                              <input
                                type="text"
                                placeholder="$ PRECIO ARS"
                                value={productoData[index]?.precio || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "precio",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-200 rounded-xl py-2 px-3 placeholder:font-bold placeholder:text-slate-400 text-gray-700 outline-none focus:outline-sky-500"
                              />
                            </th>
                            <td>
                              <button
                                className="bg-sky-700 text-white py-2 px-6 rounded-full font-semibold"
                                onClick={() =>
                                  handleAddProducto(index, producto)
                                }
                              >
                                Agregar
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
