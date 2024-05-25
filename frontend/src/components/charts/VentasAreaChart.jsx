import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";

// Función para formatear los valores en pesos argentinos
const formatearPesos = (valor) => {
  return `$${valor.toLocaleString("es-AR")}`; // Formato con símbolo y separadores de miles
};

const VentasAreaChart = ({ ventas }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const ventasPorFecha = {};

    // Agrupar las ventas por fecha y sumar el total de cada venta
    ventas.forEach((venta) => {
      const fecha = dayjs(venta.date).format("YYYY-MM-DD"); // Agrupar por día
      const totalVenta = venta.productos.reduce(
        (suma, producto) => suma + producto.total_dinero,
        0
      );

      if (!ventasPorFecha[fecha]) {
        ventasPorFecha[fecha] = totalVenta; // Inicializar con el total de la primera venta
      } else {
        ventasPorFecha[fecha] += totalVenta; // Sumar el total de las ventas del mismo día
      }
    });

    // Ordenar las fechas
    const datosOrdenados = Object.entries(ventasPorFecha)
      .sort(([fecha1], [fecha2]) => new Date(fecha1) - new Date(fecha2))
      .map(([fecha, total]) => ({ x: fecha, y: total }));

    // Configurar las opciones y series para el gráfico
    setChartOptions({
      chart: {
        type: "area",
        zoom: { enabled: true },
      },
      xaxis: {
        type: "datetime",
        labels: {
          formatter: (val) => dayjs(val).format("MMM DD, YYYY"), // Formato para las etiquetas
        },
      },
      yaxis: {
        title: {
          text: "Total de Ventas",
        },
        labels: {
          formatter: formatearPesos, // Usar el formateador de pesos
        },
      },
      tooltip: {
        x: {
          format: "MMM DD, YYYY",
        },
        y: {
          formatter: formatearPesos, // Mostrar valores en pesos argentinos
        },
      },
    });

    setChartSeries([{ name: "Ventas", data: datosOrdenados }]);
  }, [ventas]);

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="area"
      height={350}
    />
  );
};

export default VentasAreaChart;
