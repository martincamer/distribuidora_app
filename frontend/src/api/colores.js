import axios from "./axios"; // Asegúrate de tener un archivo de configuración de Axios

// Obtener todos los colores
export const getColoresRequest = async () => axios.get("/colors");

// Crear un nuevo color
export const createColorRequest = async (color) => axios.post("/colors", color);

// Actualizar un color por ID
export const updateColorRequest = async (id, color) =>
  axios.put(`/colors/${id}`, color);

// Eliminar un color por ID
export const deleteColorRequest = async (id) => axios.delete(`/colors/${id}`);

// Obtener un color por ID
export const getColorRequest = async (id) => axios.get(`/colors/${id}`);
