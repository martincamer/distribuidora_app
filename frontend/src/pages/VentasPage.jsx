import { useEffect, useState } from "react";
import { useVentas } from "../context/VentasContext.jsx"; // Cambia a VentasContext
import { ImFileEmpty } from "react-icons/im"; // Icono para cuando no hay datos
import { BsFolderPlus } from "react-icons/bs"; // Icono para agregar
import { TableVentas } from "../components/ventas/TableVentas.jsx"; // Cambia a la tabla de ventas
import { IoIosAddCircleOutline } from "react-icons/io"; // Icono para agregar
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import video from "../assets/video/producto.mp4";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export function VentasPage() {
  const { ventas, getVentas } = useVentas(); // Cambia a ventas y función para obtener ventas
  const [ventasSemana, setVentasSemana] = useState([]);
  const [ventasDia, setVentasDia] = useState([]);
  const [filtrados, setFiltrados] = useState([]);

  useEffect(() => {
    getVentas(); // Obtiene las ventas cuando el componente se monta
  }, []); // No olvides agregar dependencias necesarias para evitar advertencias

  useEffect(() => {
    const now = dayjs();
    const currentMonth = now.month();
    const currentYear = now.year();

    const filtrados = ventas.filter((item) => {
      const itemDate = dayjs(item.date);
      return (
        itemDate.month() === currentMonth && itemDate.year() === currentYear
      );
    });

    setFiltrados(filtrados);
  }, [ventas]);

  // useEffect(() => {
  //   const now = dayjs();
  //   const startOfWeek = now.startOf("week");
  //   const endOfWeek = now.endOf("week");

  //   const ventasSemana = ventas.filter((item) => {
  //     const itemDate = dayjs(item.date);
  //     return (
  //       itemDate.isSameOrAfter(startOfWeek) &&
  //       itemDate.isSameOrBefore(endOfWeek)
  //     );
  //   });

  //   setVentasSemana(ventasSemana);
  // }, [ventas]);

  useEffect(() => {
    const now = dayjs();
    const startOfWeek = now.startOf("week");
    const endOfWeek = now.endOf("week");

    const ventasDia = ventas.filter((item) => {
      const itemDate = dayjs(item.date);
      return (
        itemDate.isSameOrAfter(startOfWeek) &&
        itemDate.isSameOrBefore(endOfWeek)
      );
    });

    setVentasSemana(ventasDia);
  }, [ventas]);

  useEffect(() => {
    const now = dayjs();

    const ventasDia = ventas.filter((item) => {
      const itemDate = dayjs(item.date);
      return itemDate.isSame(now, "day");
    });

    setVentasDia(ventasDia);
  }, [ventas]);

  // Filtrar las ventas que son de tipo 'venta'
  const ventasDeTipoVenta = filtrados.filter((venta) => venta.tipo === "venta");

  // Calcular el total de ganancias para cada venta de tipo 'venta'
  const totalGanancias = filtrados.map((venta) => {
    return venta.productos.reduce((suma, producto) => {
      return suma + producto.total_dinero; // Sumar el total_dinero de cada producto
    }, 0);
  });

  // Calcular el total de ganancias para cada venta de tipo 'venta'
  const totalSemana = ventasSemana.map((venta) => {
    return venta.productos.reduce((suma, producto) => {
      return suma + producto.total_dinero; // Sumar el total_dinero de cada producto
    }, 0);
  });

  const totalSemanaReduce = totalSemana.reduce((suma, venta) => {
    return suma + venta;
  }, 0);

  const totalDia = ventasDia.map((venta) => {
    return venta.productos.reduce((suma, producto) => {
      return suma + producto.total_dinero; // Sumar el total_dinero de cada producto
    }, 0);
  });

  // Calcular el total de ganancias para todas las ventas de tipo 'venta' combinadas
  const sumaTotalGanancias = totalGanancias.reduce((suma, ganancia) => {
    return suma + ganancia;
  }, 0);

  return (
    <>
      <div className="bg-white w-full flex justify-between items-center">
        <div className="flex">
          <p className="bg-sky-100/80 px-8 text-[16px] py-4 text-sky-600 font-semibold">
            Ventas
          </p>
        </div>
        <div className="mx-5 z-[0] flex gap-2">
          <button className="text-sm font-semibold bg-green-500/90 py-2 px-5 rounded-2xl text-white group flex gap-3 items-center relative transition-all ease-linear duration-300 z-0">
            <Link
              to={"/crear-venta"}
              className="transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            >
              Crear nueva venta
            </Link>
            <IoIosAddCircleOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
          </button>
        </div>
      </div>

      {ventas.length === 0 && (
        <div className="flex flex-col gap-6 justify-center items-center p-10 bg-white w-1/3 mx-auto my-10 rounded-xl shadow">
          <div>
            <ImFileEmpty className="text-6xl text-sky-500 m-auto my-2" />
            <h1 className="font-bold text-lg text-gray-500">
              No hay ninguna venta o presupuesto registrado ahún
            </h1>
          </div>
          <div>
            <Link
              to={"/crear-venta"}
              className="bg-sky-500 text-sm text-white font-semibold py-3 px-6 rounded-full hover:shadow-md transition-all ease-linear flex gap-2 items-center"
            >
              Crear nueva venta/presupuesto
              <BsFolderPlus className="text-2xl" />
            </Link>
          </div>
        </div>
      )}

      {ventas.length === 0 && (
        <div className={`w-full flex justify-center`}>
          <button
            className="bg-sky-500 rounded-full text-base px-5 py-3 text-white font-bold hover:shadow-lg transition-all"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Ver tutorial de como crear una venta/presupuesto
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
                  Mira el video tutorial de como crear una venta/presupuesto ✋
                </h3>
                <p className="text-sm mt-2 font-medium">
                  ¡Segui todos los pasos para crear tu primer venta/presupuesto!
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

      {ventas.length > 0 && (
        <div className="flex flex-col gap-5 mx-10">
          <section className="py-10 grid grid-cols-4 gap-4">
            <div className="stats shadow-xl items-center scroll-bar">
              <div className="stat">
                <div className="stat-title font-semibold">Total ventas</div>
                <div className="stat-value text-gray-800">
                  {ventasDeTipoVenta.length}
                </div>
                <div className="stat-desc font-bold text-green-500 mt-1">
                  ↗︎ {Number(ventasDeTipoVenta.length % 100).toFixed(2)}%
                </div>
              </div>

              <div>
                <div className="py-5 px-5 w-32 font-bold mx-auto">
                  <CircularProgressbar
                    value={Number(ventasDeTipoVenta.length) % 100}
                    text={`${Number(ventasDeTipoVenta.length % 100)}%`}
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
            <div className="stats shadow-xl items-center scroll-bar">
              <div className="stat">
                <div className="stat-title font-semibold">
                  Total ventas del mes
                </div>
                <div className="stat-value text-sky-500">
                  {sumaTotalGanancias.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2, // Mínimo dos decimales
                    maximumFractionDigits: 2, // Máximo dos decimales
                  })}
                </div>
                <div className="stat-desc font-bold text-sky-500 mt-1">
                  ↗︎ {Number(sumaTotalGanancias & 100).toFixed(2)}%
                </div>
              </div>

              <div>
                <div className="py-5 px-5 w-32 font-bold mx-auto ">
                  <CircularProgressbar
                    value={Number(sumaTotalGanancias) & 100}
                    text={`${Number(sumaTotalGanancias & 100)}%`}
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

            <div className="stats shadow-xl items-center scroll-bar">
              <div className="stat">
                <div className="stat-title font-semibold">
                  Total ventas de la semana
                </div>
                <div className="stat-value text-sky-500">
                  {totalSemanaReduce.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2, // Mínimo dos decimales
                    maximumFractionDigits: 2, // Máximo dos decimales
                  })}
                </div>
                <div className="stat-desc font-bold text-sky-500 mt-1">
                  ↗︎ {Number(totalSemanaReduce & 100).toFixed(2)}%
                </div>
              </div>

              <div>
                <div className="py-5 px-5 w-32 font-bold mx-auto">
                  <CircularProgressbar
                    value={Number(totalSemanaReduce) & 100}
                    text={`${Number(totalSemanaReduce & 100)}%`}
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

            <div className="stats shadow-xl items-center scroll-bar">
              <div className="stat">
                <div className="stat-title font-semibold">
                  Total ventas en el día
                </div>
                <div className="stat-value text-sky-500">
                  {totalDia.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2, // Mínimo dos decimales
                    maximumFractionDigits: 2, // Máximo dos decimales
                  })}
                </div>
                <div className="stat-desc font-bold text-sky-500 mt-1">
                  ↗︎ {Number(totalDia & 100).toFixed(2)}%
                </div>
              </div>

              <div>
                <div className="py-5 px-5 w-32 font-bold mx-auto">
                  <CircularProgressbar
                    value={Number(totalDia) & 100}
                    text={`${Number(totalDia & 100)}%`}
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

            {/* Aquí podrías agregar otras métricas relacionadas con ventas */}
          </section>
          <div className="bg-white rounded-xl py-5 px-5 transition-all ease-linear flex gap-2 text-sm">
            <Link
              to={"/crear-venta"}
              className="bg-sky-500 py-3 px-6 rounded-full font-semibold text-white group flex gap-3 items-center relative transition-all"
            >
              Crear nueva venta o presupuesto
            </Link>
          </div>
          <TableVentas ventas={ventas} /> {/* Cambia a la tabla de ventas */}
        </div>
      )}
    </>
  );
}
