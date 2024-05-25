import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useVentas } from "../context/VentasContext"; // Cambia al contexto de ventas
import { useEffect, useState } from "react";
import { useModal } from "../helpers/modal";
import ModalClientes from "../components/ventas/ModalClientes";
import ModalProductos from "../components/ventas/ModalProductos.jsx";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { formatearDinero } from "../helpers/FormatearDinero.js";

export function CrearVenta() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenProducto,
    openModal: openProducto,
    closeModal: closeProducto,
  } = useModal();

  const { createVenta, getVentas } = useVentas(); // Cambia al método para crear venta
  const navigate = useNavigate(); // Para redirigir después de crear

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm(); // Uso de React Hook Form para validación

  useEffect(() => {
    getVentas(); // Obtiene ventas si es necesario al montar el componente
  }, []);

  const tipo = watch("tipo");

  const onSubmit = async (formData) => {
    try {
      const ventaData = {
        ...formData,
        cliente: clienteSeleccionado,
        productos: productosSeleccionados,
        date: dayjs.utc(formData.date).format(),
      };

      await createVenta(ventaData); // Crea la nueva venta con el formulario

      toast.success("Creado correctamente", {
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

      setTimeout(() => {
        navigate("/ventas"); // Redirige a la lista de ventas después de la creación
      }, 3000);
    } catch (error) {
      console.error("Error creando venta:", error);
    }
  };

  const addToCliente = (
    id,
    nombre,
    apellido,
    email,
    dni,
    telefono,
    localidad,
    provincia
  ) => {
    const nuevoCliente = {
      id,
      nombre,
      apellido,
      email,
      dni,
      telefono,
      localidad,
      provincia,
    };

    setClienteSeleccionado(...clienteSeleccionado, nuevoCliente);
  };

  const handleResetCliente = () => {
    setClienteSeleccionado([]);
  };

  const addToProducto = (
    ObjectId,
    id,
    codigo,
    detalle,
    imagen,
    color,
    categoria,
    kg_barra_estimado,
    total_kilogramos,
    precio,
    total_dinero,
    cantidad,
    date
  ) => {
    const nuevoProducto = {
      ObjectId,
      id,
      codigo,
      detalle,
      imagen,
      color,
      categoria,
      kg_barra_estimado,
      total_kilogramos,
      precio,
      total_dinero,
      cantidad,
      date,
    };

    setProductosSeleccionados([...productosSeleccionados, nuevoProducto]);

    closeProducto();
  };

  // Estado para controlar qué fila está en modo de edición
  const [editIndex, setEditIndex] = useState(null);

  const handleEditToggle = (index) => {
    if (editIndex === index) {
      // Si ya estamos en modo de edición para esta fila, cancelar la edición
      setEditIndex(null);
    } else {
      // De lo contrario, establecer el modo de edición para esta fila
      setEditIndex(index);
    }
  };

  const handleInputChange = (index, field, value) => {
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos[index][field] = value;
    setProductosSeleccionados(nuevosProductos);
  };

  // Objeto para agrupar por categoria y color
  const groupedByCategoryAndColor = {};

  // Agrupar productos por categoria y color
  productosSeleccionados.forEach((producto) => {
    const key = `${producto.categoria}-${producto.color}`; // Clave para agrupar

    if (!groupedByCategoryAndColor[key]) {
      // Si la clave no existe, crear una nueva entrada
      groupedByCategoryAndColor[key] = {
        categoria: producto.categoria,
        color: producto.color,
        total_dinero: 0,
        total_kilogramos: 0,
      };
    }

    // Sumar los valores al grupo existente
    groupedByCategoryAndColor[key].total_dinero +=
      Number(producto.kg_barra_estimado * producto.cantidad) * producto.precio;
    groupedByCategoryAndColor[key].total_kilogramos +=
      producto.kg_barra_estimado * producto.cantidad;
  });

  // Convertir el objeto a un arreglo
  const groupedProducts = Object.values(groupedByCategoryAndColor);

  // Resultado final

  useEffect(() => {
    if (tipo === "presupuesto") {
      toast(
        "Acuerdate que el presupuesto no descuenta el stock, ni se suma dinero a los clientes",
        {
          position: "bottom-center",
          autoClose: 8000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            padding: "10px",
            fontWeight: "bold",
            borderRadius: "15px",
            border: "1px solid rgb(229 231 235)",
          },
          // transition: "Bounce",
        }
      );
    } else if (tipo === "venta") {
      toast(
        "Es una venta descontara el stock y sumara el total al cliente seleccionado al generar la venta.",
        {
          position: "bottom-center",
          autoClose: 8000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            padding: "10px",
            fontWeight: "bold",
            borderRadius: "15px",
            border: "1px solid rgb(229 231 235)",
          },
          // transition: "Bounce",
        }
      );
    }
  }, [tipo]);

  return (
    <section>
      <div className="bg-white w-full flex justify-between items-center">
        <div className="flex">
          <Link
            to={"/ventas"}
            className="px-8 text-base py-4 text-gray-700 font-medium hover:text-sky-700 transition-all"
          >
            Ventas
          </Link>
          <Link
            to={"/crear-venta"}
            className="bg-sky-100 px-8 text-base py-4 text-sky-600 font-medium hover:bg-gray-100 transition-all"
          >
            Crear venta
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

      {/* Formulario para crear una nueva venta */}
      <div className="mx-10 flex justify-start items-start gap-8">
        <div className="w-3/4">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-slate-700 mt-10 text-xl">
              Crear nueva/o {tipo?.length === 0 ? "venta o presupuesto" : tipo}
            </p>
            <p className="text-slate-600 font-medium text-sm">
              En esta sección podrás crear nuevas ventas.
            </p>
          </div>

          <div className="bg-white my-5 rounded-xl shadow-lg flex flex-col gap-3">
            <div className="bg-gray-100 py-4 rounded-t-xl">
              <p className="text-sky-500 text-center text-base font-bold">
                Formulario
              </p>
            </div>
            <div className="px-10 py-8 flex flex-col gap-5">
              <form
                onSubmit={handleSubmit(onSubmit)} // Maneja el envío del formulario
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2 w-1/5 cursor-pointer">
                  <label className="text-sm font-bold text-slate-700 uppercase">
                    Selecciona el tipo
                  </label>
                  <select
                    {...register("tipo", { required: true })} // Registro del campo con validación
                    className="uppercase text-sm text-slate-700 bg-gray-100 rounded-lg py-3 px-2 font-semibold outline-none ease-linear transition-all focus:outline-sky-700 cursor-pointer"
                  >
                    <option value="" disabled selected>
                      Seleccione tipo
                    </option>
                    <option value="venta">Venta</option> // Opciones disponibles
                    <option value="presupuesto">Presupuesto</option>
                  </select>
                  {errors.tipo && (
                    <span className="text-red-500 text-sm uppercase">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-start gap-2">
                  <p className="font-bold text-slate-700 uppercase text-sm">
                    Seleccionar el cliente de la venta
                  </p>
                  <button
                    onClick={() => openModal()}
                    className="bg-orange-500 text-white hover:bg-orange-500/90 rounded-full py-3 px-8 text-sm font-semibold"
                    type="button"
                  >
                    Seleccionar cliente
                  </button>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th className="text-slate-500 text-sm uppercase">
                          Nombre
                        </th>
                        <th className="text-slate-500 text-sm uppercase">
                          Apellido
                        </th>
                        <th className="text-slate-500 text-sm uppercase">
                          Localidad
                        </th>{" "}
                        <th className="text-slate-500 text-sm uppercase">
                          Provincia
                        </th>{" "}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="uppercase">
                          {clienteSeleccionado.nombre}
                        </th>
                        <th className="uppercase">
                          {clienteSeleccionado.apellido}
                        </th>
                        <th className="uppercase">
                          {clienteSeleccionado.localidad}
                        </th>
                        <th className="uppercase">
                          {clienteSeleccionado.provincia}
                        </th>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              handleResetCliente();
                            }}
                            className="bg-orange-600/90 py-2 px-6 rounded-full text-white font-semibold"
                          >
                            Resetear
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <p className="font-bold text-slate-700 uppercase text-sm">
                    Seleccionar los productos de la venta
                  </p>
                  <button
                    onClick={() => openProducto()}
                    className="bg-sky-700 text-white hover:bg-sky-700/90 rounded-full py-3 px-8 text-sm font-semibold"
                    type="button"
                  >
                    Seleccionar los productos
                  </button>
                </div>
                <div className="w-full scroll-bar overflow-x-scroll">
                  <table className="table">
                    {/* head */}
                    <thead className="uppercase">
                      <tr>
                        <th className="text-slate-500 text-sm">Código</th>
                        <th className="text-slate-500 text-sm">Detalle</th>
                        <th className="text-slate-500 text-sm">Color</th>
                        <th className="text-slate-500 text-sm">Categoría</th>
                        <th className="text-slate-500 text-sm">
                          Peso barra (kg)
                        </th>
                        <th className="text-slate-500 text-sm">
                          Precio kg (ARS)
                        </th>
                        <th className="text-slate-500 text-sm">Total kg</th>
                        <th className="text-slate-500 text-sm">Cantidad</th>
                        <th className="text-slate-500 text-sm">Total final</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosSeleccionados.map((producto, index) => (
                        <tr className="uppercase" key={index}>
                          <td className="font-semibold text-gray-700">
                            {producto.codigo}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {producto.detalle}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {producto.color}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {producto.categoria}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {editIndex === index ? (
                              <input
                                type="text"
                                className="p-2 rounded w-full bg-gray-200/80 text-gray-700 border-none outline-none"
                                value={producto.kg_barra_estimado}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "kg_barra_estimado",
                                    parseFloat(e.target.value)
                                  )
                                }
                              />
                            ) : (
                              `${Number(producto.kg_barra_estimado).toFixed(
                                2
                              )} kg`
                            )}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {editIndex === index ? (
                              <input
                                type="number"
                                className="p-2 rounded w-full bg-gray-200/80 text-gray-700 border-none outline-none"
                                value={producto.precio}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "precio",
                                    parseFloat(e.target.value)
                                  )
                                }
                              />
                            ) : (
                              Number(producto.precio).toLocaleString("es-AR", {
                                style: "currency",
                                currency: "ARS",
                              })
                            )}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {Number(
                              Number(
                                producto.kg_barra_estimado * producto.cantidad
                              ).toFixed(2)
                            )}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {editIndex === index ? (
                              <input
                                type="number"
                                className="p-2 rounded w-full bg-gray-200/80 text-gray-700 border-none outline-none"
                                value={producto.cantidad}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "cantidad",
                                    parseFloat(e.target.value)
                                  )
                                }
                              />
                            ) : (
                              producto.cantidad
                            )}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {Number(
                              Number(
                                producto.kg_barra_estimado * producto.cantidad
                              ) * producto.precio
                            ).toLocaleString("es-AR", {
                              style: "currency",
                              currency: "ARS",
                            })}
                          </td>
                          <td>
                            <div className="flex gap-2">
                              {/* Botón para alternar entre edición y no edición */}
                              <button
                                type="button"
                                onClick={() => handleEditToggle(index)}
                                className="bg-sky-700 py-2 px-6 text-white rounded-full font-bold"
                              >
                                {editIndex === index ? "Guardar" : "Editar"}
                              </button>

                              {/* Botón para eliminar el producto */}
                              <button
                                type="button"
                                onClick={() => {
                                  setProductosSeleccionados((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                }}
                                className="bg-orange-600/90 py-2 px-6 rounded-full font-bold text-white"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-green-500 py-2.5 px-6 text-sm rounded-full font-semibold text-white mt-3 hover:bg-green-600/90 cursor-pointer"
                  >
                    {tipo?.length === 0
                      ? "Generar venta/presupuesto"
                      : `Generar ${tipo}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {productosSeleccionados?.length === 0 ? (
            ""
          ) : (
            <div className="my-10 ">
              <div className="mb-3">
                <p className="text-gray-700 font-semibold text-lg">
                  Productos seleccionados 🖐️
                </p>
                <p className="font-normal text-sm">
                  Mira por los productos creados, compara precios,etc.
                </p>
              </div>
              <div className="bg-white py-5 px-5 rounded-xl shadow-xl grid grid-cols-4 justify-center items-center gap-2">
                {productosSeleccionados.map((p) => (
                  <div className="border py-4 px-2 rounded-xl flex flex-col gap-2 justify-center items-center h-full">
                    <img
                      className="w-[120px] object-cover"
                      src={p.imagen}
                      alt="imagen"
                    />
                    <div className="h-[5vh] overflow-y-scroll scroll-bar w-full">
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Codigo:{" "}
                          <span className="font-bold text-sky-700">
                            {p.codigo}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Detalle:{" "}
                          <span className="font-bold text-sky-700">
                            {p.detalle}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Color:{" "}
                          <span className="font-bold text-sky-700">
                            {p.color}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Categoria:{" "}
                          <span className="font-bold text-sky-700">
                            {p.categoria}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Kg de la barra:{" "}
                          <span className="font-bold text-sky-700">
                            {Number(p?.kg_barra_estimado)?.toFixed(2)} kgs
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Total de kgs:{" "}
                          <span className="font-bold text-sky-700">
                            {Number(
                              p?.kg_barra_estimado * p?.cantidad
                            )?.toFixed(2)}{" "}
                            kgs
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Precio kg:{" "}
                          <span className="font-bold text-sky-700">
                            {Number(p.precio).toLocaleString("es-AR", {
                              style: "currency",
                              currency: "ARS",
                            })}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Precio total:{" "}
                          <span className="font-bold text-sky-700">
                            {Number(
                              Number(p.kg_barra_estimado * p.cantidad) *
                                p.precio
                            ).toLocaleString("es-AR", {
                              style: "currency",
                              currency: "ARS",
                            })}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          {" "}
                          Cantidad:{" "}
                          <span className="font-bold text-sky-700">
                            {p.cantidad}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {productosSeleccionados?.length === 0 ? (
          ""
        ) : (
          <div className="my-28 bg-white rounded-xl py-5 px-5 shadow-xl w-auto flex flex-col gap-5">
            <div className="mb-3">
              <p className="text-gray-700 font-semibold text-lg">
                Productos seleccionados 🖐️
              </p>
              <p className="font-normal text-sm">
                Mira por los productos creados, compara precios,etc.
              </p>
            </div>
            {groupedProducts.map((p) => (
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-sm uppercase  text-slate-700">
                  Linea <span className="text-sky-700">{p.categoria}</span>
                </p>
                <p className="font-semibold text-sm uppercase  text-slate-700">
                  Color <span className="text-sky-700">{p.color}</span>
                </p>
                <p className="font-semibold text-sm uppercase  text-slate-700">
                  Total de kgs{" "}
                  <span className="text-sky-700">
                    {Number(p.total_kilogramos).toFixed(2)}
                  </span>
                </p>
                <p className="font-semibold text-sm uppercase  text-slate-700">
                  Precio total{" "}
                  <span className="text-sky-700">
                    {formatearDinero(p.total_dinero)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <ModalClientes
        addToCliente={addToCliente}
        isOpen={isOpen}
        closeModal={closeModal}
      />
      <ModalProductos
        addToProducto={addToProducto}
        isOpen={isOpenProducto}
        closeModal={closeProducto}
      />
    </section>
  );
}
