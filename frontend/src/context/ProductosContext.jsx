import { createContext, useContext, useState } from "react";
import {
  getProductoRequest,
  getProductosRequest,
  createProductosRequest,
  deleteProductosRequest,
  updateProductosRequest,
} from "../api/productos";
import {
  updateCategoriaRequest,
  createCategoriaRequest,
  deleteCategoriaRequest,
  getCategoriaRequest,
  getCategoriasRequest,
} from "../api/categorias";

import {
  createColorRequest,
  deleteColorRequest,
  getColorRequest,
  getColoresRequest,
  updateColorRequest,
} from "../api/colores";

import { toast } from "react-toastify";

const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) throw new Error("error al usar el context");
  return context;
};

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [colores, setColores] = useState([]);

  const getProductos = async () => {
    const res = await getProductosRequest();
    setProductos(res.data);
  };

  const deleleteProducto = async (id) => {
    try {
      const res = await deleteProductosRequest(id);
      if (res.status === 204)
        setProductos(productos.filter((producto) => producto._id !== id));

      toast.error("Producto eliminado correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createProducto = async (producto) => {
    try {
      // Realizar la solicitud para crear el producto
      const res = await createProductosRequest(producto);

      // Obtener el producto creado desde la respuesta
      const nuevoProducto = res.data;

      // Actualizar el estado productos en el contexto
      setProductos([...productos, nuevoProducto]);

      toast.success("Producto creado correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
        // transition: "Bounce",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProducto = async (id) => {
    try {
      const res = await getProductoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProducto = async (id, producto) => {
    try {
      const res = await updateProductosRequest(id, producto);

      const productosActualizados = productos.map((producto) =>
        producto._id === id ? res.data : producto
      );
      setProductos(productosActualizados);

      toast.success("Producto editado correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
        // transition: "Bounce",
      });

      console.log("res", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategorias = async () => {
    try {
      const res = await getCategoriasRequest();
      setCategorias(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategoria = async (id) => {
    try {
      const res = await deleteCategoriaRequest(id);
      if (res.status === 204)
        setCategorias(categorias.filter((categoria) => categoria._id !== id));

      toast.error("Categoría eliminada correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
        // transition: "Bounce",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createCategoria = async (categoria) => {
    try {
      const res = await createCategoriaRequest(categoria);
      const nuevaCategoria = res.data;
      setCategorias([...categorias, nuevaCategoria]);

      toast.success("Categoría creada correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
        // transition: "Bounce",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoria = async (id) => {
    try {
      const res = await getCategoriaRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCategoria = async (id, categoria) => {
    try {
      const res = await updateCategoriaRequest(id, categoria);
      const categoriasActualizadas = categorias.map((categoria) =>
        categoria._id === id ? res.data : categoria
      );
      setCategorias(categoriasActualizadas);

      toast.success("Categoría editada correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
        // transition: "Bounce",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getColores = async () => {
    try {
      const res = await getColoresRequest();
      setColores(res.data);
    } catch (error) {
      console.error("Error al obtener colores:", error);
    }
  };

  const deleteColor = async (id) => {
    try {
      const res = await deleteColorRequest(id);
      if (res.status === 204) {
        setColores(colores.filter((color) => color._id !== id));

        toast.error("Color eliminado correctamente", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          style: {
            padding: "10px",
            borderRadius: "15px",
          },
        });
      }
    } catch (error) {
      console.error("Error al eliminar el color:", error);
    }
  };

  const createColor = async (color) => {
    try {
      const res = await createColorRequest(color);
      const nuevoColor = res.data;
      setColores([...colores, nuevoColor]);

      toast.success("Color creado correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover,
        draggable,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
      });
    } catch (error) {
      console.error("Error al crear el color:", error);
    }
  };

  const getColor = async (id) => {
    try {
      const res = await getColorRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error al obtener el color:", error);
    }
  };

  const updateColor = async (id, color) => {
    try {
      const res = await updateColorRequest(id, color);
      const coloresActualizados = colores.map((c) =>
        c._id === id ? res.data : c
      );
      setColores(coloresActualizados);

      toast.success("Color editado correctamente", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick,
        pauseOnHover,
        draggable,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
        },
      });
    } catch (error) {
      console.error("Error al actualizar el color:", error);
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        setProductos,
        getProductos,
        deleleteProducto,
        createProducto,
        getProducto,
        updateProducto,
        categorias,
        setCategorias,
        getCategorias,
        getCategoria,
        deleteCategoria,
        updateCategoria,
        createCategoria,
        colores,
        setColores,
        getColores,
        deleteColor,
        createColor,
        getColor,
        updateColor,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
