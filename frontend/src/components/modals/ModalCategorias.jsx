import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { Button, Input, Label } from "../ui";
import { CiSaveDown1 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useProductos } from "../../context/ProductosContext";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function ModalCategorias({ isOpen, closeModal, idObtenida }) {
  const {
    getCategoria,
    updateCategoria,
    createCategoria,
    categorias,
    getCategorias,
    deleteCategoria,
  } = useProductos();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      createCategoria({
        ...data,
        date: dayjs.utc(data.date).format(),
      });

      reset();
      closeModal();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    reset(); // Reiniciar el formulario
    closeModal();
  };

  useEffect(() => {
    const loadProducto = async () => {
      if (idObtenida) {
        const categoria = await getCategoria(idObtenida);

        setValue("detalle", categoria.detalle);
        setValue(
          "date",
          categoria.date ? dayjs(categoria.date).utc().format("YYYY-MM-DD") : ""
        );
      }
    };
    loadProducto();
  }, [idObtenida]);

  useEffect(() => {
    getCategorias();
  }, []);

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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end py-2">
                  <IoMdClose
                    onClick={() => handleCloseModal()}
                    className="cursor-pointer text-4xl text-red-800 hover:shadow-md transition-all ease-linear bg-red-100 py-2 px-2 rounded-xl"
                  />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {idObtenida
                    ? " Edita la categoria seleccionada"
                    : "Cargar una nueva categoria"}
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex flex-col gap-1">
                      <Label>Detalle del producto</Label>
                      <Input
                        {...register("detalle")}
                        type="text"
                        placeholder="detalle del producto"
                      />
                    </div>

                    <div className="text-sm">
                      <Button>
                        {idObtenida
                          ? " Edita la categoria"
                          : "Crear nueva categoria"}{" "}
                        <CiSaveDown1 className="text-3xl" />
                      </Button>
                    </div>
                  </form>
                  <p className="mt-2 text-lg text-violet-600 font-normal underline ">
                    Categorias creadas/editar/eliminar
                  </p>
                  <div className="border-[1px] border-slate-300 hover:shadow-md py-5 px-4 rounded-xl mt-3 grid grid-cols-3 gap-2">
                    {categorias.map((c) => (
                      <div className="bg-violet-100 py-3 px-3 rounded-xl uppercase text-violet-700 text-center cursor-pointer flex gap-2 justify-center items-center hover:shadow-md transition-all ease-linear hover:shadow-gray-300">
                        {c.detalle}
                        <BiSolidEdit className="text-2xl" />
                        <MdDelete
                          onClick={() => deleteCategoria(c._id)}
                          className="text-2xl"
                        />{" "}
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
