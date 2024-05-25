import { useState } from "react";
import { useProductos } from "../../context/ProductosContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importar los iconos de flecha
import { IoIosMore } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

export const TableProducts = ({ productos }) => {
  const { deleleteProducto } = useProductos();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");

  // Aquí ordenamos los productos por stock de mayor a menor
  const sortedProducts = productos.slice().sort((a, b) => b.stock - a.stock);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  };

  const filteredProducts = currentProducts.filter((product) =>
    product.detalle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

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
    <div className="">
      <div className="flex items-center max-md:mb-4 max-md:mt-2 mt-5 mb-6">
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
            placeholder="Buscar producto por codigo o detalle..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2.5 ml-3 rounded-full shadow-lg outline-none focus:ring-sky-500 focus:border-sky-500 font-bold text-sm w-[400px] max-md:w-[350px]"
          />
        </Transition>
      </div>
      <div className="flex flex-col gap-4 md:hidden">
        {filteredProducts.map((p) => (
          <div className="bg-white rounded-xl py-5 px-5 flex items-start justify-between">
            <div>
              <p className="font-semibold text-xs uppercase">
                Codigo{" "}
                <span className="text-sky-500 font-bold">{p.codigo}</span>
              </p>
              <p className="font-semibold text-xs uppercase">
                Detalle{" "}
                <span className="text-sky-500 font-bold">{p.detalle}</span>
              </p>
              <p className="font-semibold text-xs uppercase">
                Color <span className="text-sky-500 font-bold">{p.color}</span>
              </p>
              <p className="font-semibold text-xs uppercase">
                Categoria{" "}
                <span className="text-sky-500 font-bold">{p.categoria}</span>
              </p>
              <p className="font-semibold text-xs uppercase">
                Kg estimado{" "}
                <span className="text-sky-500 font-bold">
                  {Number(p.kg_barra_estimado).toFixed(2)}
                </span>
              </p>
              <div className="flex font-semibold text-xs uppercase items-center gap-2">
                Stock{" "}
                <p
                  className={`py-1 px-2 ${
                    (p.stock > 0 && "text-sky-700 bg-sky-500/10") ||
                    (p.stock <= 0 && "text-red-700 bg-red-500/10")
                  } rounded-xl`}
                >
                  {p.stock}
                </p>
              </div>
            </div>
            <div>
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
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link
                      className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700 text-xs"
                      to={`/editar-producto/${p._id}`}
                    >
                      Editar el producto
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700 text-xs"
                      to={`/producto/${p._id}`}
                    >
                      Ver el producto
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => deleleteProducto(p._id)}
                      type="button"
                      className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700 text-xs"
                    >
                      Eliminar el producto
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="transition-all ease-linear rounded-2xl mt-6 z-0 max-md:hidden">
        <table className="min-w-full divide-y-[1px] divide-slate-200 bg-white text-sm rounded-2xl table">
          <thead>
            <tr>
              <th className="text-left px-4 py-4 font-semibold text-sky-700 uppercase text-sm">
                Codigo
              </th>
              <th className="text-left px-4 py-4 font-semibold text-sky-700 uppercase text-sm">
                Detalle
              </th>
              <th className="text-left px-4 py-4 font-semibold text-sky-700 uppercase text-sm">
                Color
              </th>
              <th className="text-left px-4 py-4 font-semibold text-sky-700 uppercase text-sm">
                Categoria
              </th>
              <th className="text-left px-4 py-4 font-semibold text-sky-700 uppercase text-sm">
                Kg Estimativo
              </th>
              <th className="text-left px-4 py-4 font-semibold text-sky-700 uppercase text-sm">
                Stock
              </th>
              <th className="text-left px-4 py-4 font-semibold text-sky-700 uppercase text-sm">
                Stock Minimo
              </th>
              <th className="text-left px-4 py-4 font-semibold text-sky-700 uppercase text-sm">
                Stock Máximo
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {filteredProducts.map((p) => (
              <tr className="hover:bg-gray-100/50 cursor-pointer" key={p._id}>
                <th className="px-4 py-4 font-medium text-gray-900 uppercase text-sm">
                  {p.codigo}
                </th>
                <th className="px-4 py-4 text-gray-700 uppercase text-sm">
                  {p.detalle}
                </th>
                <th className="px-4 py-4 text-gray-700 uppercase text-sm">
                  {p.color}
                </th>
                <th className="px-4 py-4 text-gray-700 uppercase text-sm">
                  {p.categoria}
                </th>
                <th className="px-4 py-4 text-gray-700 uppercase text-sm">
                  {p.kg_barra_estimado}
                </th>
                <th className="px-4 py-4 font-bold uppercase text-sm flex">
                  <p
                    className={`py-2 px-2.5 ${
                      (p.stock > 0 && "text-sky-700 bg-sky-500/10") ||
                      (p.stock <= 0 && "text-red-700 bg-red-500/10")
                    } rounded-xl`}
                  >
                    {p.stock}
                  </p>
                </th>
                <th className="px-4 py-4 text-sky-700 font-bold uppercase text-sm">
                  {p.stock_minimo}
                </th>
                <th className="px-4 py-4 text-sky-700 font-bold uppercase text-sm">
                  {p.stock_maximo}
                </th>
                <th className="px-4 py-4 text-gray-700 uppercase text-sm">
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
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link
                          className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                          to={`/editar-producto/${p._id}`}
                        >
                          Editar el producto
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                          to={`/producto/${p._id}`}
                        >
                          Ver el producto
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => deleleteProducto(p._id)}
                          type="button"
                          className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                        >
                          Eliminar el producto
                        </button>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-center items-center space-x-2 max-md:pb-10">
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

      <div className="rounded-full fixed bottom-3 bg-sky-700 py-2 text-white text-2xl px-2 right-3 cursor-pointer">
        <FiPlus />
      </div>
    </div>
  );
};
