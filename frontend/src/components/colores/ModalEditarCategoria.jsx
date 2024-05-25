import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useProductos } from "../../context/ProductosContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function ModalEditarCategoria({
  isOpen,
  closeModal,
  idObtenida,
}) {
  const { updateColor, getColor } = useProductos();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      updateColor(idObtenida, {
        ...data,
        date: dayjs.utc(data.date).format(),
      });

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadProducto = async () => {
      if (idObtenida) {
        const categoria = await getColor(idObtenida);

        setValue("name", categoria.name);
        setValue(
          "date",
          categoria.date ? dayjs(categoria.date).utc().format("YYYY-MM-DD") : ""
        );
      }
    };
    loadProducto();
  }, [idObtenida]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10" />
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end py-2">
                  <IoMdClose
                    onClick={() => handleCloseModal()}
                    className="cursor-pointer text-4xl text-red-800 hover:shadow-md transition-all ease-linear bg-red-100 py-2 px-2 rounded-xl"
                  />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-sm text-sky-500 font-bold leading-6"
                >
                  Editar el color seleccionado
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">
                        Editar el nombre del color
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Ej: blanco aluar"
                        className="text-sm uppercase text-slate-700 bg-gray-200 rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-500 outline-1"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="bg-green-500/90 py-2 px-6 text-sm rounded-full font-semibold text-white mt-3 hover:bg-green-500"
                      >
                        Guardar color
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
