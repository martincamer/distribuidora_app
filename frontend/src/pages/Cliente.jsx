import { Link, useParams } from "react-router-dom";
import { useClientes } from "../context/ClientesContext"; // Contexto de clientes
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPencilAlt } from "react-icons/fa"; // Icono para editar
import { useModal } from "../helpers/modal"; // Para el uso de modales
import { useObtenerId } from "../helpers/obtenerId";
import ModalEliminarCliente from "../components/clients/ModalEliminarCliente"; // El modal para eliminar clientes
import ModalNuevoComprobante from "../components/clients/ModalNuevoComprobante";
import dayjs from "dayjs"; // Para formatear fechas
import instance from "../api/axios";
import { IoIosMore } from "react-icons/io";

export function Cliente() {
  const { getCliente } = useClientes(); // Función para obtener un cliente
  const [comprobante, setComprobante] = useState([]);
  const { openModal, closeModal, isOpen } = useModal(); // Para abrir y cerrar el modal

  const {
    openModal: openModalComprobante,
    closeModal: closeModalComprobante,
    isOpen: isOpenComprobante,
  } = useModal(); // Para abrir y cerrar el modal
  const { handleObtenerId, idObtenida } = useObtenerId();

  const [cliente, setCliente] = useState({}); // Estado para almacenar el cliente
  const params = useParams(); // Para obtener el ID del cliente desde la URL

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getCliente(params.id); // Obtiene el cliente por ID
        setCliente(res); // Establece el estado del cliente
      } catch (error) {
        console.error("Error al cargar el cliente:", error); // Manejo de errores
      }
    };

    loadData(); // Carga los datos del cliente cuando el componente se monta
  }, [params.id, getCliente]); // Asegúrate de incluir las dependencias necesarias

  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY"); // Formato de fecha
  };

  const getComprobantesDelMesRequest = async () => {
    try {
      const response = await instance.get(
        `/clientes/${params.id}/comprobantes-mes`
      );

      // Llama a la función para actualizar el cliente en el backend

      return setComprobante(response.data); // Devuelve los comprobantes del mes actual
    } catch (error) {
      console.error("Error al obtener comprobantes del mes:", error);
      throw error; // Re-lanza el error para manejo posterior
    }
  };

  useEffect(() => {
    getComprobantesDelMesRequest();
  }, [params.id]);

  const [isModalVisible, setModalVisible] = useState(false); // Estado para la visibilidad del modal
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada

  // Abre el modal y establece la imagen seleccionada
  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  // Cierra el modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Ordenar comprobantes por fecha de mayor a menor
  const sortedComprobantes = [...comprobante].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentComprobantes = sortedComprobantes.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  };

  const totalPages = Math.ceil(comprobante.length / productsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = Math.min(currentPage + 4, totalPages); // Mostrar hasta 5 páginas
    const startPage = Math.max(1, maxPages - 4); // Comenzar desde la página adecuada
    for (let i = startPage; i <= maxPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const totalComprobantes = cliente?.comprobantes?.reduce(
    (acc, comprobante) => {
      return acc + Number(comprobante.total); // Suma el campo total
    },
    0
  ); // Valor inicial de acumulador es 0

  // Formatear el total como moneda argentina
  const totalFormateado = totalComprobantes?.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <div className="pb-12">
      <div className="bg-white w-full flex justify-between items-center">
        <div className="flex">
          <Link
            to={"/clientes"}
            className="px-8 text-base py-4 text-gray-700 font-medium hover:text-sky-700 transition-all"
          >
            Clientes
          </Link>
          <Link
            to={`/cliente/${params.id}`}
            className="bg-sky-100 px-8 text-base py-4 text-sky-700 font-medium hover:bg-gray-100 transition-all"
          >
            Detalle del cliente
          </Link>
        </div>
        <div className="flex mx-9">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link
                  className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl cursor-pointer font-bold"
                  to={"/home"}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="bg-sky-100 text-sky-700 py-2 px-4 rounded-xl cursor-pointer font-bold"
                  to={"/clientes"}
                >
                  Clientes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-10 py-10">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-slate-700 text-xl">
            Datos del cliente{" "}
            <span className="text-sky-700 capitalize">
              {cliente.nombre} {cliente.apellido}
            </span>
          </p>
          <p className="text-slate-600 font-medium text-sm">
            Aquí puedes ver información detallada del cliente.
          </p>
        </div>

        <div className="flex gap-10 mt-10">
          <div className="bg-white rounded-xl w-4/5">
            <div className="py-10 px-10 bg-gray-100/80 rounded-t-xl flex justify-between">
              <div className="flex flex-col gap-5">
                <p>
                  Fecha de creación{" "}
                  <span className="text-slate-600 font-bold">
                    {formatDate(cliente.date)} {/* Fecha de creación */}
                  </span>
                </p>
                <p>
                  Nombre completo{" "}
                  <span className="text-slate-600 font-bold capitalize">
                    {cliente.nombre} {cliente.apellido}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <p>
                  Localidad{" "}
                  <span className="text-slate-600 font-bold capitalize">
                    {cliente.localidad}
                  </span>
                </p>
                <p>
                  Provincia{" "}
                  <span className="text-slate-600 font-bold capitalize">
                    {cliente.provincia}
                  </span>
                </p>
              </div>
            </div>
            <div className="py-5 px-5 bg-sky-100 text-center text-sky-500 font-bold">
              Información del cliente
            </div>
            <div className="py-10 px-10 bg-white grid grid-cols-2 gap-6">
              <p className="font-bold flex flex-col">
                DNI{" "}
                <span className="text-gray-400 font-normal">{cliente.dni}</span>
              </p>
              <p className="font-bold flex flex-col">
                Teléfono{" "}
                <span className="text-gray-400 font-normal">
                  {cliente.telefono}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Email{" "}
                <span className="text-gray-400 font-normal">
                  {cliente.email}
                </span>
              </p>
            </div>

            <div className="py-10 px-10 bg-white rounded-b-xl">
              <div className="flex justify-end gap-6 my-4">
                <button
                  onClick={() => {
                    {
                      handleObtenerId(cliente._id), openModal();
                    } // Abre el modal para eliminar el cliente
                  }}
                  type="button"
                  className="hover:bg-orange-100 text-orange-400 transition-all font-semibold text-[15px] px-6 py-2 rounded-full"
                >
                  Eliminar cliente
                </button>

                <Link
                  to={`/editar-cliente/${params.id}`}
                  type="button"
                  className="bg-sky-700 text-white font-semibold text-[15px] px-6 py-3 rounded-full transition-all flex items-center gap-2 hover:bg-sky-700/90"
                >
                  Editar cliente
                  <FaPencilAlt className="w-4 h-4" /> {/* Icono para editar */}
                </Link>
              </div>
            </div>
          </div>
          <div class="w-full mx-auto">
            <div class="grid grid-cols-3 gap-4">
              <div
                id="jh-stats-positive"
                class="flex flex-col justify-center px-4 py-4 bg-white border rounded-xl"
              >
                <div>
                  <div>
                    <p class="flex items-center justify-end text-green-500 text-md">
                      <span class="font-bold">
                        {Number(totalComprobantes & 100).toFixed(2)}%
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          class="heroicon-ui"
                          d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"
                        />
                      </svg>
                    </p>
                  </div>
                  <p class="text-3xl font-semibold text-center text-gray-800">
                    {totalFormateado}
                  </p>
                  <p class="text-base text-center text-gray-500">
                    Total cargado en comprobantes
                  </p>
                </div>
              </div>

              <div
                id="jh-stats-negative"
                class="flex flex-col justify-center px-4 py-4 bg-white border rounded-xl"
              >
                <div>
                  <div>
                    <p class="flex items-center justify-end text-red-500 text-md">
                      <span class="font-bold">
                        {Number(cliente.total & 100).toFixed(2)}%
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          class="heroicon-ui"
                          d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"
                        />
                      </svg>
                    </p>
                  </div>
                  <p class="text-3xl font-semibold text-center text-gray-800">
                    {cliente?.total?.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </p>
                  <p class="text-base text-center text-gray-500">
                    Total deuda cliente
                  </p>
                </div>
              </div>

              <div
                id="jh-stats-neutral"
                class="flex flex-col justify-center px-4 py-4  bg-white rounded-xl sm:mt-0"
              >
                <div>
                  <div>
                    <p class="flex items-center justify-end text-gray-500 text-md">
                      <span class="font-bold">{comprobante.length & 100}%</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          class="heroicon-ui"
                          d="M17 11a1 1 0 010 2H7a1 1 0 010-2h10z"
                        />
                      </svg>
                    </p>
                  </div>
                  <p class="text-3xl font-semibold text-center text-gray-800">
                    {comprobante.length}
                  </p>
                  <p class="text-base text-center text-gray-500">
                    Total comprobantes cargados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 flex justify-between mx-10">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-gray-700 text-xl">
            Comprobantes mensuales{" "}
          </p>
          <p className="text-gray-600 font-medium text-sm">
            Aquí puedes ver información detallada de los comprobantes del mes.
          </p>
        </div>
        <div>
          <Link
            className="text-white bg-green-500/90 py-4 px-6 rounded-full font-semibold"
            // to={"/cargar-comprobante"}
            onClick={() => openModalComprobante()}
          >
            Cargar nuevo comprobante o total $
          </Link>
        </div>
      </div>

      <div className="mb-10 mx-10 rounded-xl">
        <table className="table bg-white uppercase">
          {/* head */}
          <thead>
            <tr>
              <th className="py-4 text-sky-500 text-base">Fecha de emisión</th>
              <th className="py-4 text-sky-500 text-base">
                Total del comprobante/$
              </th>
            </tr>
          </thead>
          <tbody>
            {currentComprobantes.map((c) => (
              <tr key={c.id}>
                <th className="py-5 text-slate-600">{c.date}</th>
                <td className="py-5 text-sky-500 font-bold">
                  {Number(c.total).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </td>
                <td className="py-5">
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
                        <button
                          className="capitalize hover:bg-sky-500 hover:text-white font-semibold text-gray-700"
                          onClick={() => handleViewImage(c.imagen)} // Abre el modal con la imagen
                        >
                          Ver comprobante
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

      <ModalEliminarCliente
        closeModal={closeModal}
        isOpen={isOpen}
        clienteId={idObtenida} // Pasa el ID del cliente al modal para eliminarlo
      />
      <ModalNuevoComprobante
        setCliente={setCliente}
        setComprobante={setComprobante}
        closeModal={closeModalComprobante}
        isOpen={isOpenComprobante}
        idObtenida={params.id}
      />
      <ImageModal
        isVisible={isModalVisible}
        onClose={handleCloseModal} // Cierra el modal
        imageUrl={selectedImage} // URL de la imagen seleccionada
      />
    </div>
  );
}

const ImageModal = ({ isVisible, onClose, imageUrl }) => {
  if (!isVisible) return null; // Si el modal no está visible, no renderizar nada

  const handleClickOutside = (event) => {
    // Cierra el modal si haces clic fuera del contenido
    onClose();
  };

  const handleContentClick = (event) => {
    // Evitar la propagación del clic para no cerrar el modal cuando haces clic en el contenido
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleClickOutside} // Cierra el modal al hacer clic fuera
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div onClick={handleContentClick} className="relative p-5">
        {imageUrl && imageUrl.toLowerCase().endsWith(".pdf") ? (
          // Si la URL termina en ".pdf", mostrar el archivo PDF en un iframe
          <iframe
            src={imageUrl}
            title="Archivo PDF"
            className="w-[1220px] h-screen"
          />
        ) : (
          // Si no, mostrar la imagen
          <img src={imageUrl} alt="Comprobante" className="w-full h-auto" />
        )}
      </div>
    </div>
  );
};
