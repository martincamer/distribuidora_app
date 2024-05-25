import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { useVentas } from "../../context/VentasContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useForm } from "react-hook-form";

export default function ModalEstado({ isOpen, closeModal, idObtenida }) {
  const { getVenta, updateVentaEstado } = useVentas();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Para prellenar valores
  } = useForm(); // Para manejar validación y prellenado de campos

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getVenta(idObtenida); // Usa await correctamente

        setValue("tipo", res.tipo);
        setValue("estado", res.estado);
        setValue("date", dayjs(res.date).format("YYYY-MM-DD"));

        console.log("Producto cargado:", res);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };

    loadData(); // Llama a la función asíncrona
  }, [idObtenida]); // Asegúrate de incluir las dependencias necesarias

  const onSubmit = async (formData) => {
    const ventaData = {
      ...formData,
      date: dayjs.utc(formData.date).format(),
    };

    closeModal();

    await updateVentaEstado(idObtenida, ventaData); // Actualizar la venta
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
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
              <Dialog.Panel className="w-1/4 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end py-2">
                  <IoMdClose
                    onClick={closeModal}
                    className="hover:text-sky-700 transition-all rounded-full cursor-pointer text-4xl text-slate-800 bg-gray-200 py-1.5"
                  />
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <p className="font-semibold text-slate-700 text-lg">
                    Editar el estado 👋
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-4">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor=""
                        className="font-semibold text-gray-700 text-sm"
                      >
                        Seleccionar el estado
                      </label>
                      <select
                        className="bg-gray-200/80 py-2 px-2 rounded-xl text-gray-700 font-semibold text-sm outline-none focus:outline-sky-700"
                        {...register("estado", { required: true })}
                      >
                        <option value="pendiente">pendiente</option>
                        <option value="aceptada">aceptada</option>
                        <option value="rechazada">rechazada</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-2">
                    <button className="bg-green-500/90 hover:bg-green-600/80 transition-all ease-linear py-2 px-4 rounded-full text-white font-semibold text-sm">
                      Editar el estado
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
