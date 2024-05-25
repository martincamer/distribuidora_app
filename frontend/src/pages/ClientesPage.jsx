import { useEffect, useState } from "react";
import { useClientes } from "../context/ClientesContext"; // Cambia el contexto a Clientes
import { ImFileEmpty } from "react-icons/im";
import { BsFolderPlus } from "react-icons/bs";
import { TableClients } from "../components/clients/TableClients.jsx"; // Cambia la tabla de productos por la de clientes
import { IoIosAddCircleOutline } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import instance from "../api/axios";
import video from "../assets/video/producto.mp4";

export function ClientesPage() {
  const { clientes, getClientes } = useClientes(); // Cambia a clientes y función para obtener clientes

  const [comprobante, setComprobante] = useState([]);

  useEffect(() => {
    getClientes(); // Obtiene los clientes cuando el componente se monta
  }, []); // Recuerda agregar cualquier dependencia necesaria para evitar advertencias

  const totalDeuda = clientes.reduce((total, c) => {
    return Number(total) + Number(c.total);
  }, 0);

  const getComprobantesDelMesRequest = async () => {
    try {
      const response = await instance.get(`/clientes/comprobantes-mensuales`);

      // Llama a la función para actualizar el cliente en el backend

      return setComprobante(response.data); // Devuelve los comprobantes del mes actual
    } catch (error) {
      console.error("Error al obtener comprobantes del mes:", error);
      throw error; // Re-lanza el error para manejo posterior
    }
  };

  useEffect(() => {
    getComprobantesDelMesRequest();
  }, []);

  const totalGanancias = comprobante.reduce((total, c) => {
    return Number(total) + Number(c.total);
  }, 0);

  return (
    <div>
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex">
          <p className="bg-sky-100/80 px-8 text-[16px] py-4 text-sky-600 font-semibold">
            Clientes
          </p>
        </div>
        <div className="mx-5 z-[0] flex gap-2">
          <button className="text-sm font-semibold bg-green-500/90 py-2 px-5 rounded-2xl text-white group flex gap-3 items-center relative transition-all ease-linear duration-300 z-0">
            <Link
              to={"/crear-cliente"}
              className="transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            >
              Crear nuevo cliente
            </Link>
            <IoIosAddCircleOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
          </button>
        </div>
      </div>

      {clientes.length === 0 && (
        <div className="flex flex-col gap-6 justify-center items-center p-10 bg-white w-1/3 mx-auto my-10 rounded-xl shadow">
          <div>
            <ImFileEmpty className="text-6xl text-sky-500 m-auto my-2" />
            <h1 className="font-bold text-lg text-gray-500">
              No hay ningún cliente cargado aún
            </h1>
          </div>
          <div>
            <Link
              to={"/crear-cliente"}
              className="bg-sky-500 text-white py-3 px-6 rounded-full font-semibold text-sm hover:shadow-md transition-all ease-linear flex gap-2 items-center"
            >
              Crear nuevo cliente
              <BsFolderPlus className="text-2xl" />
            </Link>
          </div>
        </div>
      )}

      {clientes.length === 0 && (
        <div className={`w-full flex justify-center`}>
          <button
            className="bg-sky-500 rounded-full text-base px-5 py-3 text-white font-bold hover:shadow-lg transition-all"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Ver tutorial de como crear un cliente
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
                  Mira el video tutorial de como crear un cliente ✋
                </h3>
                <p className="text-sm mt-2 font-medium">
                  ¡Segui todos los pasos para crear tu primer cliente!
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

      {clientes.length > 0 && (
        <div className="flex flex-col gap-5 mx-10">
          <section className="py-10 grid grid-cols-3 gap-4">
            <div className="stats shadow-xl items-center">
              <div className="stat">
                <div className="stat-title font-semibold">
                  Total clientes cargados
                </div>
                <div className="stat-value">{clientes.length}</div>
                <div className="stat-desc font-bold text-green-500 mt-1">
                  ↗︎ {clientes.length % 100}%
                </div>
              </div>

              <div>
                <div className="py-5 px-5 w-32 font-bold mx-auto">
                  <CircularProgressbar
                    value={clientes.length % 100}
                    text={`${clientes.length % 100}%`}
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
            </div>
            <div className="stats shadow-xl items-center">
              <div className="stat">
                <div className="stat-title font-semibold">
                  Total deuda clientes
                </div>
                <div className="stat-value text-red-500">
                  {" "}
                  {totalDeuda.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2, // Mínimo dos decimales
                    maximumFractionDigits: 2, // Máximo dos decimales
                  })}
                </div>
                <div className="stat-desc font-bold text-red-500 mt-1">
                  ↗︎ {Number(totalDeuda & 100).toFixed(2)}%
                </div>
              </div>

              <div>
                <div className="py-5 px-5 w-32 font-bold mx-auto">
                  <CircularProgressbar
                    value={Number(totalDeuda) & 100}
                    text={`${Number(totalDeuda & 100)}%`}
                    strokeWidth={9}
                    // backgroundPadding={"#22c55e"}
                    styles={buildStyles({
                      textColor: "#ef4444",
                      pathColor: "#ef4444 ",
                      trailColor: "#e5e7eb",
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="stats shadow-xl items-center">
              <div className="stat">
                <div className="stat-title font-semibold">
                  Total ganancias del mes
                </div>
                <div className="stat-value text-sky-500">
                  {totalGanancias.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2, // Mínimo dos decimales
                    maximumFractionDigits: 2, // Máximo dos decimales
                  })}
                </div>
                <div className="stat-desc font-bold text-sky-500 mt-1">
                  ↗︎ {Number(totalGanancias & 100).toFixed(2)}%
                </div>
              </div>

              <div>
                <div className="py-5 px-5 w-32 font-bold mx-auto">
                  <CircularProgressbar
                    value={Number(totalGanancias) & 100}
                    text={`${Number(totalGanancias & 100)}%`}
                    strokeWidth={9}
                    // backgroundPadding={"#22c55e"}
                    styles={buildStyles({
                      textColor: "#0287e0 ",
                      pathColor: "#0287e0  ",
                      trailColor: "#e5e7eb",
                    })}
                  />
                </div>
              </div>
            </div>
            {/* Aquí podrías agregar otras métricas relacionadas con clientes */}
          </section>
          <div className="bg-white rounded-xl py-5 px-5 transition-all ease-linear flex gap-2 text-sm">
            <Link
              to={"/crear-cliente"}
              className="bg-sky-500 py-3 px-6 rounded-full text-white font-semibold group flex gap-3 items-center relative transition-all"
            >
              Crear nuevo cliente
            </Link>
          </div>
          <TableClients clientes={clientes} />{" "}
        </div>
      )}
    </div>
  );
}
