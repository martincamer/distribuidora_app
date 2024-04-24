import axios from "./axios";

export const getProductosRequest = async () => axios.get("/productos");

export const createProductosRequest = async (task) =>
  axios.post("/productos", task);

export const updateProductosRequest = async (id, task) =>
  axios.put(`/productos/${id}`, task);

export const deleteProductosRequest = async (id) =>
  axios.delete(`/productos/${id}`);

export const getProductoRequest = async (id) => axios.get(`/productos/${id}`);
