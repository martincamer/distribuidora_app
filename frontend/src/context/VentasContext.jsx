import { createContext, useContext, useState } from "react";
import {
  getVentasRequest,
  createVentaRequest,
  deleteVentaRequest,
  updateVentaRequest,
  getVentaRequest,
  updateVentaEstadoRequest,
} from "../api/ventas.js"; // Asegúrate de tener las funciones de solicitud correctas para ventas
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

// Crear el contexto para ventas
const VentasContext = createContext();

// Hook personalizado para usar el contexto de ventas
export const useVentas = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw new Error("Error al usar el context");
  }
  return context;
};

// Proveedor del contexto de ventas
export function VentasProvider({ children }) {
  const [ventas, setVentas] = useState([]); // Estado para guardar ventas
  const [error, setError] = useState([]);

  // Obtener todas las ventas
  const getVentas = async () => {
    try {
      const res = await getVentasRequest(); // Solicitud para obtener todas las ventas
      setVentas(res.data); // Actualiza el estado con las ventas

      console.log("datasss", res.data);
    } catch (error) {
      console.error("Error al obtener ventas:", error); // Manejo de errores
    }
  };

  // Eliminar una venta por ID
  const deleteVenta = async (id) => {
    try {
      const res = await deleteVentaRequest(id); // Solicitud para eliminar una venta
      if (res.status === 204) {
        // Venta eliminada correctamente
        setVentas(ventas.filter((venta) => venta._id !== id)); // Elimina del estado

        toast.error("Venta eliminada correctamente", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar,
          closeOnClick,
          pauseOnHover,
          draggable,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error al eliminar venta:", error); // Manejo de errores
    }
  };

  // Crear una nueva venta
  const createVenta = async (venta) => {
    try {
      const res = await createVentaRequest(venta); // Solicitud para crear una venta
      const nuevaVenta = res.data; // Datos de la venta creada

      setVentas([...ventas, nuevaVenta]); // Actualiza el estado para agregar la nueva venta

      toast.success("Venta creada correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
        theme: "light",
      });
    } catch (error) {
      console.error("Error al crear venta:", error); // Manejo de errores
    }
  };

  // Obtener una venta por ID
  const getVenta = async (id) => {
    try {
      const res = await getVentaRequest(id); // Solicitud para obtener una venta por ID
      return res.data; // Devuelve los datos de la venta
    } catch (error) {
      console.error("Error al obtener venta:", error); // Manejo de errores
    }
  };

  const navigate = useNavigate();

  // Actualizar una venta por ID
  const updateVenta = async (id, venta) => {
    try {
      const res = await updateVentaRequest(id, venta); // Solicitud para actualizar una venta
      console.log(res);

      const ventasActualizadas = ventas.map((v) =>
        v._id === id ? res.data : v
      ); // Actualiza la venta en el estado

      setVentas(ventasActualizadas); // Actualiza el estado de las ventas

      toast.success("Venta actualizada con éxito", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/ventas");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const updateVentaEstado = async (id, venta) => {
    try {
      const res = await updateVentaEstadoRequest(id, venta); // Solicitud para actualizar una venta
      const ventasActualizadas = ventas.map((v) =>
        v._id === id ? res.data : v
      ); // Actualiza la venta en el estado

      setVentas(ventasActualizadas); // Actualiza el estado de las ventas

      toast.success("Estado actualizado con éxito", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <VentasContext.Provider
      value={{
        ventas,
        setVentas,
        getVentas,
        deleteVenta,
        createVenta,
        getVenta,
        updateVenta,
        updateVentaEstado,
        error,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
}

export default VentasProvider;
