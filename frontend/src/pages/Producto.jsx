import { Link, useParams } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useObtenerId } from "../helpers/obtenerId";
import { useModal } from "../helpers/modal";
import ModalEliminarProducto from "../components/products/ModalEliminarProducto";
import dayjs from "dayjs";

export function Producto() {
  const { getProducto } = useProductos();

  const { handleObtenerId, idObtenida } = useObtenerId();
  const { openModal, closeModal, isOpen } = useModal();

  const [producto, setProducto] = useState([]);

  const params = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getProducto(params.id); // Usa await correctamente
        setProducto(res);
        console.log("Producto cargado:", res);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };

    loadData(); // Llama a la función asíncrona
  }, [params.id]); // Asegúrate de incluir las dependencias necesarias

  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY"); // Formato de fecha
  };

  const handleEdit = () => {
    // Implementa la lógica para editar el gasto
    console.log("Editando gasto:", expense._id);
  };

  const handleDelete = () => {
    // Implementa la lógica para eliminar el gasto
    console.log("Eliminando gasto:", expense._id);
  };

  return (
    <div>
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex">
          <Link
            to={"/productos"}
            className="bg-gray-100/50 px-8 text-base py-4 text-gray-700 font-medium hover:text-sky-500 transition-all"
          >
            Perfiles
          </Link>
          <Link
            to={"/producto"}
            className="bg-sky-500/10 px-8 text-base py-4 text-sky-500 font-medium hover:bg-gray-100 transition-all"
          >
            Detalle del perfil
          </Link>
        </div>
        <div className="flex mx-9">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link
                  className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl cursor-pointer font-semibold"
                  to={"/home"}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="bg-sky-100 text-sky-700 py-2 px-4 rounded-xl cursor-pointer font-semibold"
                  to={"/productos"}
                >
                  Perfiles
                </Link>
              </li>
              <li>
                <Link
                  className="bg-sky-100 text-sky-700 py-2 px-4 rounded-xl cursor-pointer font-semibold"
                  to={"/crear-producto"}
                >
                  Crear perfil
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-10 py-10">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-slate-700 text-xl">
            Producto obtenido{" "}
            <span className="text-sky-500">{producto.codigo}</span>
          </p>
          <p className="text-slate-600 font-medium text-sm">
            En esta sección podras crear nuevos productos.
          </p>
        </div>

        <div className="flex gap-10 mt-10">
          <div className="bg-white rounded-xl shadow-lg w-1/2">
            <div className="py-10 px-10 bg-gray-100/80 rounded-t-xl flex justify-between">
              <div className="flex flex-col gap-5">
                <p>
                  Fecha de creación{" "}
                  <span className="text-slate-600 font-bold">
                    {formatDate(producto.date)}
                  </span>
                </p>
                <p>
                  Codigo del producto{" "}
                  <span className="text-slate-600 font-bold">
                    {producto.codigo}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <p>
                  Estado{" "}
                  <span
                    className={`py-2 px-5 rounded-2xl ${
                      producto.stock === 0
                        ? "bg-red-200 text-red-600" // Para cuando el stock es 0
                        : producto.stock < producto.stock_minimo
                        ? "bg-orange-200 text-orange-600" // Para cuando el stock es menor al mínimo
                        : "bg-green-200 text-green-600" // Para cuando el stock es mayor o igual al mínimo
                    }`}
                  >
                    {producto.stock === 0
                      ? "No hay stock" // Mensaje cuando el stock es 0
                      : producto.stock < producto.stock_minimo
                      ? "Poco stock" // Mensaje cuando el stock es menor al mínimo
                      : "Mucho stock"}{" "}
                  </span>
                </p>
                <p>
                  Total del stock cargado{" "}
                  <span
                    className={`py-2 px-3 rounded-lg ${
                      producto.stock === 0
                        ? "bg-red-200 text-red-600" // Fondo rojo para stock cero
                        : producto.stock < producto.stock_minimo
                        ? "bg-orange-200 text-orange-600" // Fondo naranja para stock bajo
                        : "bg-green-200 text-green-600" // Fondo verde para stock suficiente
                    }`}
                  >
                    <span className="font-bold">{producto.stock}</span>{" "}
                    {/* Valor de stock */}
                  </span>
                </p>
              </div>
            </div>
            <div className="py-5 px-5 bg-sky-100 text-center text-sky-500 font-bold">
              Descripción del producto
            </div>
            <div className="py-10 px-10 bg-white  grid grid-cols-3 gap-6">
              <p className="font-bold flex flex-col">
                Categoria del producto{" "}
                <span className="text-gray-400 font-normal">
                  {producto.categoria}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Descripcioń del producto{" "}
                <span className="text-gray-400 font-normal">
                  {producto.detalle}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Color del producto{" "}
                <span className="text-gray-400 font-normal">
                  {producto.color}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Kg por metro del producto{" "}
                <span className="text-gray-400 font-normal">
                  {producto.kg_barra_estimado}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Stock minimo del producto{" "}
                <span className="text-gray-400 font-normal">
                  {producto.stock_minimo}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Stock maximo del producto{" "}
                <span className="text-gray-400 font-normal">
                  {producto.stock_maximo}
                </span>
              </p>
            </div>
            <div className="py-10 px-10 bg-white rounded-b-xl">
              <p className="font-bold flex flex-col">Imagen del producto </p>

              <img src={producto.imagen} className="w-[300px]" />

              <div className="flex justify-end gap-6 my-4">
                <button
                  onClick={() => {
                    handleObtenerId(producto._id), openModal();
                  }}
                  type="button"
                  className="hover:bg-orange-100 text-orange-400 hover:text-orange-400 transition-all font-semibold text-[15px] px-6 py-2 rounded-full"
                >
                  Eliminar producto
                </button>

                <Link
                  to={`/editar-producto/${producto._id}`}
                  type="button"
                  className="bg-sky-500 text-white font-semibold text-[15px] px-6 py-3 rounded-full transition-all flex items-center gap-2 hover:bg-sky-600"
                >
                  Editar producto
                  <FaPencilAlt className="w-4 h-4" />{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalEliminarProducto
        closeModal={closeModal}
        isOpen={isOpen}
        idObtenida={idObtenida}
      />
    </div>
  );
}
