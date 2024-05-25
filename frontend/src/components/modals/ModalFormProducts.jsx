import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { Button, Input, Label } from "../ui";
import { CiSaveDown1 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useProductos } from "../../context/ProductosContext";
import { Select } from "../ui/Select";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function ModalFormProducts({ isOpen, closeModal, idObtenida }) {
  const { createProducto, getProducto, updateProducto, categorias, colores } =
    useProductos();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (idObtenida) {
        const res = updateProducto(idObtenida, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });

        reset();
      } else {
        createProducto({
          ...data,
          date: dayjs.utc(data.date).format(),
        });

        reset();
      }

      closeModal();
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
        const producto = await getProducto(idObtenida);

        setValue("codigo", producto.codigo);
        setValue("detalle", producto.detalle);
        setValue("color", producto.color);
        setValue("categoria", producto.categoria);
        setValue("kg_barra_estimado", producto.kg_barra_estimado);
        setValue("stock", producto.stock);
        setValue("stock_minimo", producto.stock_minimo);
        setValue("stock_maximo", producto.stock_maximo);
        setValue(
          "date",
          producto.date ? dayjs(producto.date).utc().format("YYYY-MM-DD") : ""
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                    ? " Edita el producto seleccionado"
                    : "Cargar un nuevo producto nuevo"}
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex flex-col gap-1">
                      <Label>Codigo del producto</Label>
                      <Input
                        {...register("codigo")}
                        type="text"
                        placeholder="codigo del producto"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label>Detalle del producto</Label>
                      <Input
                        {...register("detalle")}
                        type="text"
                        placeholder="detalle del producto"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label>Color</Label>
                      <Select {...register("color")}>
                        <option value="">Seleccionar color</option>
                        {colores.map((c) => (
                          <option key={c._id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label>Categoria</Label>
                      <Select {...register("categoria")}>
                        <option value="">Seleccionar categoria</option>
                        {categorias.map((c) => (
                          <option key={c._id} value={c.detalle}>
                            {c.detalle}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label>KG Estimado de la bara</Label>
                      <Input
                        {...register("kg_barra_estimado")}
                        type="text"
                        placeholder="kg estimado de la barra"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label>Stock del producto</Label>
                      <Input
                        {...register("stock")}
                        type="text"
                        placeholder="Ingresa un valor numerico"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label>Stock del producto minimo</Label>
                      <Input
                        {...register("stock_minimo")}
                        type="text"
                        placeholder="Ingresa un valor numerico"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label>Stock del producto maximo</Label>
                      <Input
                        {...register("stock_maximo")}
                        type="text"
                        placeholder="Ingresa un valor numerico"
                      />
                    </div>

                    <div className="text-sm">
                      <Button>
                        Guardar Producto <CiSaveDown1 className="text-3xl" />
                      </Button>
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
