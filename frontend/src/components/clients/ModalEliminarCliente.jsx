import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosAlert, IoMdClose } from "react-icons/io"; // Iconos de alerta y cerrar
import { useClientes } from "../../context/ClientesContext"; // Contexto de clientes
import { useNavigate } from "react-router-dom";

export default function ModalEliminarCliente({
  isOpen, // Estado para indicar si el modal está abierto
  closeModal, // Función para cerrar el modal
  clienteId, // ID del cliente a eliminar
}) {
  const { deleteCliente } = useClientes(); // Función para eliminar un cliente
  const navigate = useNavigate();

  const handleEliminar = () => {
    deleteCliente(clienteId);
    navigate("/clientes");
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
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end py-2">
                  <IoMdClose
                    onClick={closeModal} // Cierra el modal al hacer clic
                    className="hover:text-sky-500 hover:bg-gray-100 transition-all cursor-pointer text-4xl text-slate-800 bg-gray-200 py-2 px-2 rounded-full"
                  />
                </div>

                <div className="flex justify-center flex-col gap-2 items-center">
                  <IoIosAlert className="text-yellow-400 text-9xl py-1" />{" "}
                  {/* Icono de alerta */}
                  <p className="text-3xl text-yellow-500">¡Espera! ✋</p>
                  <p className="font-light text-sm mt-2">
                    ¿Estás seguro de que quieres eliminar este cliente?
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-5">
                    <button
                      onClick={closeModal} // Botón para cancelar y cerrar el modal
                      className="text-sm font-bold text-gray-400 hover:bg-gray-300 py-2 px-4 rounded-full hover:text-gray-600"
                      type="button"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        handleEliminar(); // Elimina el cliente
                        closeModal(); // Cierra el modal después de eliminar
                      }}
                      className="text-base font-bold text-white bg-orange-500 hover:bg-orange-600 py-2 px-6 rounded-full hover:text-white"
                      type="button"
                    >
                      Eliminar
                    </button>
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
