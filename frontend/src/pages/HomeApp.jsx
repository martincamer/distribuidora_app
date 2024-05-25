import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useVentas } from "../context/VentasContext";
import instance from "../api/axios";
import VentasAreaChart from "../components/charts/VentasAreaChart";
import ComprobantesLineChart from "../components/charts/ComprobantesLineChart";
import dayjs from "dayjs";

export function HomeApp() {
  const [comprobante, setComprobante] = useState([]);
  const [filtrados, setFiltrados] = useState([]);

  const { ventas, getVentas } = useVentas(); // Cambia a ventas y función para obtener ventas

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

  // Filtrar las ventas que son de tipo 'venta'
  const ventasDeTipoVenta = filtrados.filter((venta) => venta.tipo === "venta");

  // Calcular el total de ganancias para cada venta de tipo 'venta'
  const totalVentas = ventasDeTipoVenta.map((venta) => {
    return venta.productos.reduce((suma, producto) => {
      return suma + producto.total_dinero; // Sumar el total_dinero de cada producto
    }, 0);
  });

  // Calcular el total de ganancias para todas las ventas de tipo 'venta' combinadas
  const sumaTotalGanancias = totalVentas.reduce((suma, ganancia) => {
    return suma + ganancia;
  }, 0);

  const getComprobantesDelMesRequest = async () => {
    try {
      const response = await instance.get(`/clientes/comprobantes-mensuales`);

      // Llama a la función para actualizar el cliente en el backend

      console.log(response);

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

  // console.log(comprobante);
  const totalPorCategoriaColor = filtrados.reduce((acumulador, venta) => {
    venta.productos.forEach((producto) => {
      const { categoria, color, total_dinero, total_kilogramos } = producto;

      if (!acumulador[categoria]) {
        acumulador[categoria] = {};
      }

      if (!acumulador[categoria][color]) {
        acumulador[categoria][color] = { total_dinero: 0, total_kilogramos: 0 };
      }

      acumulador[categoria][color].total_dinero += total_dinero;
      acumulador[categoria][color].total_kilogramos += total_kilogramos;
    });

    return acumulador;
  }, {});

  // Calcular el total general de dinero y kilogramos
  const totalGeneralDinero = Object.values(totalPorCategoriaColor)
    .flatMap((categoria) => Object.values(categoria))
    .reduce((total, value) => total + value.total_dinero, 0);

  const totalGeneralKg = Object.values(totalPorCategoriaColor)
    .flatMap((categoria) => Object.values(categoria))
    .reduce((total, value) => total + value.total_kilogramos, 0);

  return (
    <section className="mx-10 my-10 max-md:mx-4">
      <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
        <div className="stats items-center scroll-bar max-md:scroll-hidden">
          <div className="stat">
            <div className="stat-title font-semibold">
              Total ganancias del mes
            </div>
            <div className="stat-value text-green-500">
              {" "}
              {totalGanancias?.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2, // Mínimo dos decimales
                maximumFractionDigits: 2, // Máximo dos decimales
              })}
            </div>
            <div className="stat-desc font-bold text-green-500 mt-1">
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
                  textColor: "rgb(34 197 94)",
                  pathColor: "rgb(34 197 94)",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>
          </div>
        </div>

        <div className="stats items-center scroll-bar max-md:scroll-hidden">
          <div className="stat">
            <div className="stat-title font-semibold">
              Total generado en ventas del mes
            </div>
            <div className="stat-value text-sky-500">
              {" "}
              {sumaTotalGanancias?.toLocaleString("es-AR", {
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
            <div className="py-5 px-5 w-32 font-bold mx-auto">
              <CircularProgressbar
                value={Number(sumaTotalGanancias) & 100}
                text={`${Number(sumaTotalGanancias & 100)}%`}
                strokeWidth={9}
                // backgroundPadding={"#22c55e"}
                styles={buildStyles({
                  textColor: "rgb(2 135 224)",
                  pathColor: "rgb(2 135 224)",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>
          </div>
        </div>

        <div className="stats items-center scroll-bar max-md:scroll-hidden">
          <div className="stat">
            <div className="stat-title font-semibold">
              Total de ventas del mes
            </div>
            <div className="stat-value text-orange-500">
              {" "}
              {filtrados.length}
            </div>
            <div className="stat-desc font-bold text-orange-500 mt-1">
              ↗︎ {Number(filtrados.length & 100).toFixed(2)}%
            </div>
          </div>

          <div>
            <div className="py-5 px-5 w-32 font-bold mx-auto">
              <CircularProgressbar
                value={Number(filtrados.length) & 100}
                text={`${Number(filtrados.length & 100)}%`}
                strokeWidth={9}
                // backgroundPadding={"#22c55e"}
                styles={buildStyles({
                  textColor: "rgb(249 115 22)",
                  pathColor: "rgb(249 115 22)",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12  grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div className="bg-white py-5 px-5 rounded-xl">
          <p className="font-semibold text-sky-500 px-5">
            Ventas generadas mensuales grafico
          </p>
          <VentasAreaChart ventas={filtrados} />
        </div>
        <div className="bg-white py-5 px-5 rounded-xl">
          <p className="font-semibold text-sky-500 px-5">
            Comprobantes cargados mensuales grafico
          </p>
          <ComprobantesLineChart datos={comprobante} />
        </div>
      </div>

      <div className="bg-white py-5 px-5 rounded-xl mt-10">
        <div>
          <div className="text-sky-500 font-semibold text-sm mb-2 pb-2 mt-4">
            PROGRESO EN VENTAS/GANANCIAS POR CATEGORIA
          </div>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {Object.entries(totalPorCategoriaColor).map(
              ([categoria, colores]) => (
                <div
                  className="flex flex-col gap-1 border-gray-200 border py-3 px-5 rounded-xl cursor-pointer hover:shadow-lg transition-all"
                  key={categoria}
                >
                  <h3 className="uppercase underline">{categoria}</h3>
                  {Object.entries(colores).map(([color, value]) => {
                    const { total_dinero, total_kilogramos } = value;
                    const porcentajeDinero =
                      (total_dinero / totalGeneralDinero) * 100;
                    const porcentajeKg =
                      (total_kilogramos / totalGeneralKg) * 100;

                    return (
                      <div key={color}>
                        <p className="uppercase font-semibold text-slate-600">
                          {color}{" "}
                          <span className="font-normal text-sky-700">
                            {total_dinero.toLocaleString("es-ar", {
                              style: "currency",
                              currency: "ARS",
                            })}
                          </span>{" "}
                          | {total_kilogramos.toFixed(2)} kg
                        </p>
                        {/* Progreso por Dinero */}
                        <progress
                          className="[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg rounded-full [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-sky-500 [&::-moz-progress-bar]:bg-sky-400 w-full"
                          value={porcentajeDinero}
                          max="100"
                        >
                          {porcentajeDinero.toFixed(2)}%
                        </progress>
                        {/* Progreso por Kilogramos */}
                        <progress
                          className="[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg rounded-full [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-emerald-400 w-full"
                          value={porcentajeKg}
                          max="100"
                        >
                          {porcentajeKg.toFixed(2)}%
                        </progress>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
