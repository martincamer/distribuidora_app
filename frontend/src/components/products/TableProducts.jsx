import { useState } from "react";
import { useProductos } from "../../context/ProductosContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importar los iconos de flecha

export const TableProducts = ({ productos, openModal, handleID }) => {
  const { deleleteProducto } = useProductos();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(
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

  const totalPages = Math.ceil(productos.length / productsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = Math.min(currentPage + 4, totalPages); // Mostrar hasta 5 páginas
    const startPage = Math.max(1, maxPages - 4); // Comenzar desde la página adecuada
    for (let i = startPage; i <= maxPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  return (
    <div className="mt-5">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={handleSearch}
        className="block px-4 py-2.5 border-gray-300 border-[1px] mb-3 w-1/3 rounded-xl hover:shadow transition-all eas focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="border-slate-300 border-[1px] hover:shadow-md transition-all ease-linear">
        <table className="min-w-full divide-y-[1px] divide-gray-300 bg-white text-sm">
          <thead>
            <tr>
              <th className="text-left px-4 py-4 font-medium text-gray-900 uppercase">
                Codigo
              </th>
              <th className="text-left px-4 py-4 font-medium text-gray-900 uppercase">
                Detalle
              </th>
              <th className="text-left px-4 py-4 font-medium text-gray-900 uppercase">
                Color
              </th>
              <th className="text-left px-4 py-4 font-medium text-gray-900 uppercase">
                Categoria
              </th>
              <th className="text-left px-4 py-4 font-medium text-gray-900 uppercase">
                Kg Estimativo
              </th>
              <th className="text-left px-4 py-4 font-medium text-gray-900 uppercase">
                Stock
              </th>
              <th className="text-left px-4 py-4 font-medium text-gray-900 uppercase">
                Stock Minimo
              </th>
              <th className="text-left px-4 py-4 font-medium text-gray-900 uppercase">
                Stock Máximo
              </th>
              <th className="text-center px-4 py-4 font-medium text-gray-900 uppercase">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {filteredProducts.map((p) => (
              <tr key={p._id}>
                <td className="px-4 py-4 font-medium text-gray-900 uppercase">
                  {p.codigo}
                </td>
                <td className="px-4 py-4 text-gray-700 uppercase">
                  {p.detalle}
                </td>
                <td className="px-4 py-4 text-gray-700 uppercase">{p.color}</td>
                <td className="px-4 py-4 text-gray-700 uppercase">
                  {p.categoria}
                </td>
                <td className="px-4 py-4 text-gray-700 uppercase">
                  {p.kg_barra_estimado}
                </td>
                <td className="px-4 py-4 text-gray-700 uppercase font-bold">
                  {p.stock}
                </td>
                <td className="px-4 py-4 text-gray-700 uppercase">
                  {p.stock_minimo}
                </td>
                <td className="px-4 py-4 text-gray-700 uppercase">
                  {p.stock_maximo}
                </td>
                <td className="px-4 py-4 text-gray-700 uppercase">
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        handleID(p._id), openModal();
                      }}
                      className="bg-orange-100 py-2 px-4 rounded-xl text-orange-600 hover:bg-orange-500/90 hover:text-white transition-all ease-linear"
                    >
                      EDITAR
                    </button>
                    <button
                      onClick={() => deleleteProducto(p._id)}
                      className="bg-red-100 py-2 px-4 rounded-xl text-red-800 hover:bg-red-500/90 hover:text-white transition-all ease-linear"
                    >
                      ELIMINAR
                    </button>
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
          className="bg-white py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
        >
          <FaArrowLeft />
        </button>
        <ul className="flex space-x-2">
          {getPageNumbers().map((number) => (
            <li key={number} className="cursor-pointer">
              <button
                onClick={() => paginate(number)}
                className={`${
                  currentPage === number ? "bg-gray-200" : "bg-white"
                } py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100`}
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
          className="bg-white py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
