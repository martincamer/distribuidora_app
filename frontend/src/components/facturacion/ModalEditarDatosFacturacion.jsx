import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import FileDropZone from "../ui/FileDropZone";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import dayjs from "dayjs";
import axios from "axios";

export const ModalEditarDatosFacturacion = ({
  isOpenEditarDatos,
  closeModalEditarDatos,
}) => {
  const { updateUserApi, user } = useAuth();

  const { register, handleSubmit, setValue } = useForm();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  // Función para subir la imagen a Cloudinary y obtener la URL
  const uploadFile = async (file) => {
    if (!file) {
      return null;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "imagenes");

    try {
      const api = `https://api.cloudinary.com/v1_1/doguyttkd/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data; // Obtenemos la URL segura
      return secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  // Event handlers for drag and drop
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setDragging(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  useEffect(() => {
    setValue("dni_facturacion", user?.dni_facturacion);
    setValue("localidad_facturacion", user?.localidad_facturacion);
    setValue("provincia_facturacion", user?.provincia_facturacion);
    setValue("email_facturacion", user?.email_facturacion);
    setValue("telefono_facturacion", user?.telefono_facturacion);
  }, []);

  const onSubmit = async (formData) => {
    try {
      // Subimos la imagen a Cloudinary y obtenemos la URL
      const imageURL = await uploadFile(uploadedFile);

      // Creamos el objeto del producto con todos los datos y la URL de la imagen
      const productData = {
        ...formData,
        date: dayjs.utc(formData.date).format(),
        imagen_facturacion: imageURL, // Añadimos la URL de la imagen
      };

      await updateUserApi(user?.id, productData);

      closeModalEditarDatos();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Menu as="div" className="z-100">
      <Transition appear show={isOpenEditarDatos} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto scrooll-bar h-full"
          onClose={closeModalEditarDatos}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-10" />
          </Transition.Child>

          <div className="min-h-screen max-h-full h-full  text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen max-h-full min-h-full align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full h-full p-6 my-0 px-5 text-left align-middle transition-all transform bg-white shadow-xl rounded-none max-w-full z-[101] min-h-full max-h-full">
                <div
                  className="flex justify-end px-3"
                  onClick={() => closeModalEditarDatos()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 bg-gray-100 text-sky-500 hover:bg-gray-200 cursor-pointer py-2 px-2 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>

                <div className="flex flex-col gap-1 px-10  py-5 rounded-2xl shadow-xl my-5">
                  <p className="font-bold text-slate-700 text-xl">
                    Editar los datos de la facturación 🧑‍💼
                  </p>
                  <p className="text-sm text-slate-600">
                    ¡Registra los datos para poder empezar a facturar tu
                    factura!
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="px-10 flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-2 w-full">
                    <div>
                      <label className="font-semibold text-sm text-gray-700">
                        Cargar logo facturación
                      </label>
                    </div>
                    <div className="w-1/3 flex gap-3 items-start">
                      <FileDropZone
                        dragging={dragging}
                        handleDragLeave={handleDragLeave}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleFileChange={handleFileChange}
                        handleRemoveFile={handleRemoveFile}
                        setDragging={setDragging}
                        setUploadedFile={setUploadedFile}
                        uploadedFile={uploadedFile}
                      />
                      <div>
                        <p className="font-semibold text-sm text-gray-500 mb-2">
                          Logo actual
                        </p>
                        <img
                          className="w-[150px] rounded-2xl shadow-md border"
                          src={user?.imagen_facturacion}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-sm text-gray-700">
                        Dni facturación
                      </label>
                      <input
                        {...register("dni_facturacion")}
                        type="text"
                        placeholder="Escribe el dni de la factura"
                        className="text-sm uppercase text-slate-700 bg-gray-100 rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-500 outline-1"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-sm text-gray-700">
                        Telefono facturación
                      </label>
                      <input
                        {...register("telefono_facturacion")}
                        type="text"
                        placeholder="Telefono facturación"
                        className="text-sm uppercase text-slate-700 bg-gray-100 rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-500 outline-1"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-sm text-gray-700">
                        Email facturación
                      </label>
                      <input
                        {...register("email_facturacion")}
                        type="text"
                        placeholder="Email facturación"
                        className="text-sm uppercase text-slate-700 bg-gray-100 rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-500 outline-1"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-sm text-gray-700">
                        Localidad facturación
                      </label>
                      <input
                        {...register("localidad_facturacion")}
                        type="text"
                        placeholder="Localidad facturación"
                        className="text-sm uppercase text-slate-700 bg-gray-100 rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-500 outline-1"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-sm text-gray-700">
                        Provincia facturación
                      </label>
                      <input
                        {...register("provincia_facturacion")}
                        type="text"
                        placeholder="Provincia facturación"
                        className="text-sm uppercase text-slate-700 bg-gray-100 rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-500 outline-1"
                      />
                    </div>
                    <div></div>
                    <div>
                      <button className="font-semibold bg-sky-700 py-3 px-5 rounded-full text-white text-sm">
                        Editar los campos de la facturación
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
