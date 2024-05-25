import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useVentas } from "../context/VentasContext"; // Para obtener la venta a editar
import { useEffect, useState } from "react";
import { useModal } from "../helpers/modal"; // Para manejar modales
import { useProductos } from "../context/ProductosContext.jsx";
import ModalClientes from "../components/ventas/ModalClientes";
import ModalProductos from "../components/ventas/ModalProductos.jsx";
import dayjs from "dayjs";

export function EditarVenta() {
  const { id } = useParams(); // Obtener el ID de la venta
  const navigate = useNavigate(); // Para redirigir después de la edición
  const { getVenta, updateVenta, error } = useVentas(); // Funciones para obtener y actualizar la venta
  const { productos, setProductos } = useProductos();

  const [clienteSeleccionado, setClienteSeleccionado] = useState({});
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Para manejar el modo de edición

  // Modales para seleccionar clientes y productos
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenProducto,
    openModal: openProducto,
    closeModal: closeProducto,
  } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Para prellenar valores
  } = useForm(); // Para manejar validación y prellenado de campos

  // Obtener la venta existente y prellenar campos
  useEffect(() => {
    const fetchVenta = async () => {
      const venta = await getVenta(id); // Obtener la venta por ID
      if (venta) {
        // Prellenar campos
        setValue("tipo", venta.tipo);
        setValue("date", dayjs(venta.date).format("YYYY-MM-DD"));
        setClienteSeleccionado(venta.cliente);
        setProductosSeleccionados(venta.productos);
      }
    };

    fetchVenta(); // Llama para obtener la venta al montar el componente
  }, [id, getVenta, setValue]);

  console.log(productos);

  // Simulación de función onSubmit
  const onSubmit = async (formData) => {
    const ventaData = {
      ...formData,
      cliente: clienteSeleccionado,
      productos: productosSeleccionados,
      date: dayjs.utc(formData.date).format(),
    };

    // Aquí actualizas el estado de productos
    const productosActualizados = productos.map((producto) => {
      // Encuentra el producto en la ventaData
      const productoVendido = ventaData.productos.find(
        (prod) => prod.ObjectId === producto._id
      );

      // Si el producto se vendió, actualiza el stock
      if (productoVendido) {
        return {
          ...producto,
          stock: producto.stock - productoVendido.cantidad,
        };
      }

      // Si no se vendió, regresa el producto sin cambios
      return producto;
    });

    // Actualiza el estado de productos con el nuevo valor
    setProductos(productosActualizados);

    // Aquí podrías llamar a tu función para actualizar la venta en el backend
    await updateVenta(id, ventaData); // Actualizar la venta

    console.log("DATA", ventaData);
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
    setClienteSeleccionado({
      id,
      nombre,
      apellido,
      email,
      dni,
      telefono,
      localidad,
      provincia,
    });
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

  const handleEditToggle = (index) => {
    setEditIndex(index === editIndex ? null : index);
  };

  const handleInputChange = (index, field, value) => {
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos[index][field] = value;
    setProductosSeleccionados(nuevosProductos);
  };

  const handleResetCliente = () => {
    setClienteSeleccionado({});
  };

  const removeProducto = (index) => {
    setProductosSeleccionados((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section>
      {/* Navegación para volver a la página de ventas */}
      <div className="bg-white w-full flex justify-between items-center">
        <div className="flex">
          <Link
            to={"/ventas"}
            className="px-8 text-base py-4 text-gray-700 font-medium hover:text-sky-700 transition-all"
          >
            Ventas/Presupuestos
          </Link>
          <Link
            to={`/editar-venta/${id}`}
            className="bg-sky-100 px-8 text-base py-4 text-sky-600 font-medium hover:bg-gray-100 transition-all"
          >
            Editar venta/presupuesto
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
                  Ventas/Presupuestos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Formulario para editar la venta */}
      <div className="mx-10 flex justify-start items-start gap-8 relative">
        {error.length > 0 && (
          <div className="bg-red-100 uppercase  rounded-2xl py-6 px-6 text-sm text-red-800 font-semibold fixed left-[40%] shadow-xl transition-all z-[100]">
            {error}
          </div>
        )}
        <div className="w-3/4">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-slate-700 mt-10 text-xl">
              Editar venta
            </p>
            <p className="text-slate-600 font-medium text-sm">
              En esta sección podrás editar la venta.
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
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2 w-1/5">
                  <label className="text-sm font-bold text-slate-700 uppercase">
                    Tipo de venta
                  </label>
                  <select
                    {...register("tipo", { required: true })}
                    className="uppercase text-sm text-slate-700 bg-gray-100 rounded-lg py-3 px-2 font-semibold outline-none ease-linear transition-all focus:outline-sky-700"
                  >
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

                <div className="overflow-x-auto w-full mb-3">
                  <table className="table">
                    {/* head */}
                    <thead className="uppercase">
                      <tr>
                        <th className="text-slate-500 text-sm">Nombre</th>
                        <th className="text-slate-500 text-sm">Apellido</th>
                        <th className="text-slate-500 text-sm">
                          Localidad
                        </th>{" "}
                        <th className="text-slate-500 text-sm">Provincia</th>{" "}
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
                            onClick={handleResetCliente}
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
                    Seleccionar productos
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
                              )
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
                    Actualizar venta
                  </button>
                </div>
              </form>
            </div>
          </div>

          {productosSeleccionados.length > 0 && (
            <div className="my-10">
              <div className="mb-3">
                <p className="text-gray-700 font-semibold text-lg">
                  Productos seleccionados 🖐️
                </p>
                <p className="font-normal text-sm">
                  Mira por los productos creados, compara precios, etc.
                </p>
              </div>

              <div className="bg-white py-5 px-5 rounded-xl shadow-xl grid grid-cols-4 justify-center items-center gap-2">
                {productosSeleccionados.map((p, index) => (
                  <div
                    key={index}
                    className="border py-4 px-2 rounded-xl flex flex-col gap-2 justify-center items-center h-full"
                  >
                    <img
                      className="w-[120px] object-cover"
                      src={p.imagen}
                      alt="imagen"
                    />
                    <div className="h-[5vh] overflow-y-scroll scroll-bar w-full">
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          Código:{" "}
                          <span className="font-bold text-sky-700">
                            {p.codigo}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          Detalle:{" "}
                          <span className="font-bold text-sky-700">
                            {p.detalle}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          Color:{" "}
                          <span className="font-bold text-sky-700">
                            {p.color}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          Categoría:{" "}
                          <span className="font-bold text-sky-700">
                            {p.categoria}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          Kg de la barra:{" "}
                          <span className="font-bold text-sky-700">
                            {p.kg_barra_estimado} kg
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          Total de kgs:{" "}
                          <span className="font-bold text-sky-700">
                            {p.total_kilogramos} kg
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
                          Precio por kg:{" "}
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
                          Precio total:{" "}
                          <span className="font-bold text-sky-700">
                            {Number(p.total_dinero).toLocaleString("es-AR", {
                              style: "currency",
                              currency: "ARS",
                            })}
                          </span>
                        </p>
                      </div>
                      <div className="w-full px-2">
                        <p className="text-sm font-bold text-gray-700 uppercase">
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

        <div className="my-28 bg-white rounded-xl py-5 px-5 shadow-xl w-auto flex flex-col gap-5">
          <div className="mb-3">
            <p className="text-gray-700 font-semibold text-lg">
              Productos seleccionados 🖐️
            </p>
            <p className="font-normal text-sm">
              Mira por los productos creados, compara precios, etc.
            </p>
          </div>
        </div>
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
