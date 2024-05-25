import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io"; // Iconos de alerta y cerrar
import { useVentas } from "../../context/VentasContext";
import { useForm } from "react-hook-form";
import { useProductos } from "../../context/ProductosContext";
import dayjs from "dayjs";

export default function ModalConvertirVenta({
  isOpen,
  closeModal,
  idObtenida,
}) {
  const { getVenta, updateVenta } = useVentas();
  const { productos, setProductos } = useProductos();

  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Para prellenar valores
  } = useForm(); // Para manejar validación y prellenado de campos

  // Obtener la venta existente y prellenar campos
  useEffect(() => {
    const fetchVenta = async () => {
      const venta = await getVenta(idObtenida); // Obtener la venta por ID
      if (venta) {
        // Prellenar campos
        setValue("tipo", venta.tipo);
        setValue("date", dayjs(venta.date).format("YYYY-MM-DD"));
        setClienteSeleccionado(venta.cliente);
        setProductosSeleccionados(venta.productos);
      }
    };

    fetchVenta(); // Llama para obtener la venta al montar el componente
  }, [idObtenida, getVenta, setValue]);

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
    await updateVenta(idObtenida, ventaData); // Actualizar la venta

    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as="div"
          enter="transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <div className="fixed inset-0 bg-black/10" /> {/* Fondo oscuro */}
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end py-2">
                  <IoMdClose
                    onClick={closeModal} // Cierra el modal al hacer clic
                    className="hover:text-sky-700 hover:bg-gray-100 transition-all cursor-pointer text-4xl text-slate-800 bg-gray-200 py-2 px-2 rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-2xl mb-2">
                    Convertir en venta
                  </p>
                </div>
                <div>
                  <p className="text-orange-400 font-medium text-lg">
                    ¿Estás seguro que deseas convertir en una venta el
                    presupuesto?
                  </p>
                  <p className="text-yellow-600 font-medium text-lg mb-4">
                    ¡Una vez aceptado no podras volver atras y recuperar el
                    stock!
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 w-1/5">
                      <label className="text-sm font-bold text-slate-700 uppercase">
                        Cambiar el tipo
                      </label>
                      <select
                        {...register("tipo", { required: true })}
                        className="uppercase text-sm text-slate-700 bg-gray-100 rounded-lg py-3 px-2 font-semibold outline-none ease-linear transition-all focus:outline-sky-700"
                      >
                        <option value="venta">Venta</option> // Opciones
                        disponibles
                        <option value="presupuesto">Presupuesto</option>
                      </select>
                      {errors.tipo && (
                        <span className="text-red-500 text-sm uppercase">
                          Este campo es requerido
                        </span>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="bg-green-500 py-2.5 px-6 text-sm rounded-full font-semibold text-white mt-3 hover:bg-green-600/90 cursor-pointer"
                      >
                        Generar la venta
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
