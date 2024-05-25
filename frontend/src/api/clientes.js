import axios from "./axios";

// Obtener todos los clientes
export const getClientesRequest = async () => axios.get("/clientes");

// Crear un nuevo cliente
export const createClienteRequest = async (cliente) =>
  axios.post("/clientes", cliente);

// Actualizar un cliente por su ID
export const updateClienteRequest = async (id, cliente) =>
  axios.put(`/clientes/${id}`, cliente);

// Eliminar un cliente por su ID
export const deleteClienteRequest = async (id) =>
  axios.delete(`/clientes/${id}`);

// Obtener un cliente por su ID
export const getClienteRequest = async (id) => axios.get(`/clientes/${id}`);

export const getClienteComprobantesRequest = async (id) =>
  axios.get(`/clientes/${id}/comprobantes-mes`);

export const agregarComprobante = async (id, data) =>
  axios.patch(`/clientes/${id}/comprobantes`, data);
