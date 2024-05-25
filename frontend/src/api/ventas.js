import axios from "./axios"; // Importa tu configuración de axios

// Obtener todas las ventas
export const getVentasRequest = async () => axios.get("/ventas");

// Crear una nueva venta
export const createVentaRequest = async (venta) => axios.post("/ventas", venta);

// Obtener una venta por su ID
export const getVentaRequest = async (id) => axios.get(`/ventas/${id}`);

// Actualizar una venta por su ID
export const updateVentaRequest = async (id, venta) =>
  axios.put(`/ventas/${id}`, venta);

export const updateVentaEstadoRequest = async (id, venta) =>
  axios.put(`/ventas-estado/${id}`, venta);

// Eliminar una venta por su ID
export const deleteVentaRequest = async (id) => axios.delete(`/ventas/${id}`);

// Puedes añadir funciones adicionales si tienes rutas específicas para ventas.
// Por ejemplo, si tienes una ruta para obtener ventas por cliente o por mes, puedes añadir funciones como estas:

// Obtener ventas por cliente
export const getVentasPorClienteRequest = async (clienteId) =>
  axios.get(`/ventas/cliente/${clienteId}`);

// Obtener ventas del mes
export const getVentasDelMesRequest = async () => axios.get("/ventas/mes");
