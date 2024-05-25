import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";

// Formatear valores en pesos argentinos
const formatearPesos = (valor) => `$${parseInt(valor).toLocaleString("es-AR")}`;

const ComprobantesLineChart = ({ datos }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const comprobantesPorFecha = {};

    // Agrupar por fecha y sumar los totales
    datos.forEach((item) => {
      const fecha = dayjs(item.date).format("YYYY-MM-DD"); // Agrupar por día
      const total = parseInt(item.total); // Convertir a número

      if (!comprobantesPorFecha[fecha]) {
        comprobantesPorFecha[fecha] = total; // Inicializar con el total del primer comprobante
      } else {
        comprobantesPorFecha[fecha] += total; // Sumar el total si ya existe la fecha
      }
    });

    // Ordenar las fechas y crear la serie de datos
    const datosOrdenados = Object.entries(comprobantesPorFecha)
      .sort(([fecha1], [fecha2]) => new Date(fecha1) - new Date(fecha2))
      .map(([fecha, total]) => ({ x: fecha, y: total }));

    // Configurar las opciones del gráfico
    setChartOptions({
      chart: {
        type: "line",
        zoom: { enabled: true },
      },
      xaxis: {
        type: "datetime",
        labels: {
          formatter: (val) => dayjs(val).format("MMM DD, YYYY"), // Formato para etiquetas
        },
      },
      yaxis: {
        title: {
          text: "Total en ARS",
        },
        labels: {
          formatter: formatearPesos, // Formato de pesos argentinos
        },
      },
      tooltip: {
        x: {
          format: "MMM DD, YYYY", // Formato para el tooltip
        },
        y: {
          formatter: formatearPesos, // Formato de valores en tooltip
        },
      },
    });

    // Crear la serie del gráfico
    setChartSeries([{ name: "Comprobantes", data: datosOrdenados }]);
  }, [datos]);

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={350}
    />
  );
};

export default ComprobantesLineChart;
