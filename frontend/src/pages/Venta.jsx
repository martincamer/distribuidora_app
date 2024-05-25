import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVentas } from "../context/VentasContext";
import { formatearDinero } from "../helpers/FormatearDinero";
import dayjs from "dayjs"; // Para formatear fechas

export function Venta() {
  const { getVenta } = useVentas(); // Función para obtener un cliente

  const [venta, setVenta] = useState({}); // Estado para almacenar el cliente

  const params = useParams(); // Para obtener el ID del cliente desde la URL

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getVenta(params.id); // Obtiene el cliente por ID
        setVenta(res); // Establece el estado del cliente
      } catch (error) {
        console.error("Error al cargar el cliente:", error); // Manejo de errores
      }
    };

    loadData(); // Carga los datos del cliente cuando el componente se monta
  }, [params.id, getVenta]); // Asegúrate de incluir las dependencias necesarias

  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY"); // Formato de fecha
  };

  // Formatear el total como moneda argentina

  const totalVenta = venta?.productos?.reduce(
    (total, producto) => total + producto.total_dinero,
    0
  );

  const totalKIlogramos = venta?.productos?.reduce(
    (total, producto) => total + producto.total_kilogramos,
    0
  );

  const totalPerfiles = venta?.productos?.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  // Objeto para agrupar por categoria y color
  const groupedByCategoryAndColor = {};

  // Agrupar productos por categoria y color
  venta?.productos?.forEach((producto) => {
    const key = `${producto.categoria}-${producto.color}`; // Clave para agrupar

    if (!groupedByCategoryAndColor[key]) {
      // Si la clave no existe, crear una nueva entrada
      groupedByCategoryAndColor[key] = {
        categoria: producto.categoria,
        color: producto.color,
        precio: producto.precio,
        total_dinero: 0,
        total_kilogramos: 0,
      };
    }

    // Sumar los valores al grupo existente
    groupedByCategoryAndColor[key].total_dinero += producto.total_dinero;
    groupedByCategoryAndColor[key].total_kilogramos +=
      producto.total_kilogramos;
  });

  // Convertir el objeto a un arreglo
  const groupedProducts = Object.values(groupedByCategoryAndColor);

  console.log(groupedProducts);

  return (
    <div className="pb-12">
      <div className="bg-white w-full flex justify-between items-center">
        <div className="flex">
          <Link
            to={"/ventas"}
            className="px-8 text-base py-4 text-gray-700 font-medium hover:text-sky-700 transition-all"
          >
            Ventas
          </Link>
          <Link
            to={`/venta/${params.id}`}
            className="bg-sky-100 px-8 text-base py-4 text-sky-700 font-medium hover:bg-gray-100 transition-all"
          >
            Detalle{" "}
            {(venta.tipo === "de la venta" && "venta") ||
              (venta.tipo === "presupuesto" && "del presupuesto")}
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
                  to={"/ventas"}
                >
                  Ventas
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-10 py-10">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-slate-700 text-xl">
            Datos{" "}
            {(venta.tipo === "venta" && "de la venta") ||
              (venta.tipo === "presupuesto" && "del presupuesto")}{" "}
            <span className="text-sky-700 capitalize">
              {venta?.cliente?.nombre} {venta?.cliente?.apellido}
            </span>
          </p>
          <p className="text-slate-600 font-normal text-sm">
            Aquí puedes ver información detallada del cliente{" "}
            {(venta.tipo === "venta" && "de la venta") ||
              (venta.tipo === "presupuesto" && "del presupuesto")}{" "}
          </p>
        </div>

        <div className="flex gap-10 mt-10">
          <div className="bg-white rounded-xl w-4/5">
            <div className="py-10 px-10 bg-gray-100/80 rounded-t-xl flex justify-between">
              <div className="flex flex-col gap-5">
                <p>
                  Fecha de creación{" "}
                  <span className="text-slate-600 font-bold">
                    {formatDate(venta.date)} {/* Fecha de creación */}
                  </span>
                </p>
                <p>
                  Nombre completo{" "}
                  <span className="text-slate-600 font-bold capitalize">
                    {venta?.cliente?.nombre} {venta?.cliente?.apellido}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <p>
                  Localidad{" "}
                  <span className="text-slate-600 font-bold capitalize">
                    {venta?.cliente?.localidad}
                  </span>
                </p>
                <p>
                  Provincia{" "}
                  <span className="text-slate-600 font-bold capitalize">
                    {venta?.cliente?.provincia}
                  </span>
                </p>
              </div>
            </div>
            <div className="py-5 px-5 bg-sky-100 text-center text-sky-700 font-semibold">
              Información del cliente
            </div>
            <div className="py-10 px-10 bg-white grid grid-cols-2 gap-6">
              <p className="font-bold flex flex-col">
                DNI{" "}
                <span className="text-gray-400 font-normal">
                  {venta?.cliente?.dni}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Teléfono{" "}
                <span className="text-gray-400 font-normal">
                  {venta?.cliente?.telefono}
                </span>
              </p>
              <p className="font-bold flex flex-col">
                Email{" "}
                <span className="text-gray-400 font-normal">
                  {venta?.cliente?.email}
                </span>
              </p>
            </div>

            <div className="py-10 px-10 bg-white rounded-b-xl">
              <div className="flex justify-end gap-6 my-4">
                <div className="bg-sky-700 text-white font-semibold text-[15px] px-6 py-3 rounded-full transition-all flex items-center gap-2 hover:bg-sky-700/90">
                  {formatearDinero(totalVenta)}
                </div>
              </div>
            </div>
          </div>
          <div class="w-full mx-auto">
            <div class="grid grid-cols-3 gap-4">
              <div
                id="jh-stats-positive"
                class="flex flex-col justify-center px-4 py-6 bg-white border rounded-xl"
              >
                <div>
                  <div>
                    <p class="flex items-center justify-end text-green-500 text-md">
                      <span class="font-bold">
                        {Number(totalVenta % 100).toFixed(2)}%
                      </span>{" "}
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
                    {formatearDinero(totalVenta)}
                  </p>
                  <p class="text-base text-center text-gray-500">
                    Total{" "}
                    {(venta.tipo === "venta" && "de la venta") ||
                      (venta.tipo === "presupuesto" && "del presupuesto")}{" "}
                  </p>
                </div>
              </div>

              <div
                id="jh-stats-negative"
                class="flex flex-col justify-center px-4 py-4 bg-white border rounded-xl"
              >
                <div>
                  <div>
                    <p class="flex items-center justify-end text-gray-500 text-md">
                      <span class="font-bold">
                        {Number(totalKIlogramos % 100).toFixed(2)}%
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
                    {totalKIlogramos?.toFixed(2)} Kgs
                  </p>
                  <p class="text-base text-center text-gray-500">
                    Total de kgs
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
                      <span class="font-bold">
                        {Number(totalPerfiles % 100).toFixed(2)} %
                      </span>
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
                    {totalPerfiles}
                  </p>
                  <p class="text-base text-center text-gray-500">
                    Total perfiles
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white py-6 px-6 rounded-xl mt-5 h-auto w-auto">
              <p>
                <p className="font-semibold text-gray-700 text-xl">
                  Estadisticas 🫣{" "}
                </p>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {groupedProducts.map((p) => (
                  <div className="mt-3 border border-gray-200 py-3 px-4 rounded-xl shadow">
                    <p className="font-bold text-gray-700 uppercase text-sm">
                      Categoria{" "}
                      <span className="text-sky-700 font-semibold text-sm">
                        {p.categoria}
                      </span>
                    </p>
                    <p className="font-bold text-gray-700 uppercase text-sm">
                      Color{" "}
                      <span className="text-sky-700 font-semibold text-sm">
                        {p.color}
                      </span>
                    </p>
                    <p className="font-bold text-gray-700 uppercase text-sm">
                      Precio del kg{" "}
                      <span className="text-sky-700 font-semibold text-sm">
                        {formatearDinero(p.precio)}
                      </span>
                    </p>
                    <p className="font-bold text-gray-700 uppercase text-sm">
                      Total dinero{" "}
                      <span className="text-sky-700 font-semibold text-sm">
                        {formatearDinero(p.total_dinero)}
                      </span>
                    </p>
                    <p className="font-bold text-gray-700 uppercase text-sm">
                      Total Kilogramos{" "}
                      <span className="text-sky-700 font-semibold text-sm">
                        {p?.total_kilogramos?.toFixed(2)} kgs
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 flex justify-between mx-10">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-700 text-xl">
            Perfiles vendidos en la{" "}
            <span className="capitalize text-sky-700">{venta.tipo}</span>{" "}
          </p>
          <p className="text-gray-600 font-normal text-sm">
            Aquí puedes ver información de los perfiles{" "}
            {(venta.tipo === "venta" && "vendidos") ||
              (venta.tipo === "presupuesto" && "del presupuesto")}
          </p>
        </div>
      </div>

      <div className="mb-10 mx-10 rounded-xl">
        <table className="table bg-white">
          <thead>
            <tr>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Codigo
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Descripción
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Color
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Categoria
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">Kgs</th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Precio Kg
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Cantidad
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Total
              </th>
              <th className="py-4 text-sky-700 font-semibold text-base">
                Imagen
              </th>
            </tr>
          </thead>
          <tbody className="uppercase">
            {venta?.productos?.map((p) => (
              <tr key={p.id}>
                <td className="py-5 text-gray-700 font-semibold">{p.codigo}</td>
                <td className="py-5 text-gray-700 font-semibold">
                  {p.detalle}
                </td>
                <td className="py-5 text-gray-700 font-semibold">{p.color}</td>
                <td className="py-5 text-gray-700 font-semibold">
                  {p.categoria}
                </td>
                <td className="py-5 text-gray-700 font-semibold">
                  {Number(p.total_kilogramos).toFixed(2)} kgs
                </td>
                <td className="py-5 text-gray-700 font-semibold">
                  {formatearDinero(p.precio)}
                </td>
                <td className="py-5 text-gray-700 font-semibold">
                  {Number(p.cantidad)} brs
                </td>
                <td className="py-5 text-sky-700 font-semibold">
                  {Number(p.total_dinero).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </td>
                <td>
                  <img className="w-[65px]" src={p.imagen} alt="img" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {venta.tipo === "venta" ? (
        <div className="mx-10">
          <Link
            to={`/factura/${params.id}`}
            className="bg-green-500/90 py-2 px-6 rounded-full text-white font-semibold"
          >
            Emitir venta documento
          </Link>
        </div>
      ) : (
        <div className="mx-10">
          <Link
            to={`/factura/${params.id}`}
            className="bg-green-500/90 py-2 px-6 rounded-full text-white font-semibold"
          >
            Emitir presupuesto documento
          </Link>
        </div>
      )}
    </div>
  );
}
