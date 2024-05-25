import { ModalEditarDatosFacturacion } from "../components/facturacion/ModalEditarDatosFacturacion";
import ModalCargarImagen from "../components/users/ModalCargarImagen";
import { useAuth } from "../context/authContext";
import { useModal } from "../helpers/modal";

export const Perfil = () => {
  const { user } = useAuth();

  const { closeModal, isOpen, openModal } = useModal();

  const {
    closeModal: closeModalImagen,
    isOpen: isOpenImagen,
    openModal: openModalImagen,
  } = useModal();

  return (
    <section className="container mx-auto my-10">
      <div className="bg-white py-6 px-6 rounded-xl shadow-xl w-1/2 mx-auto flex justify-between">
        <div className="flex gap-3 items-center">
          <img
            src={
              user?.imagen ||
              "https://ppstatic.s3.amazonaws.com/expenses/uploads/people/app-243391-35471-888.blob"
            }
            className="w-[80px]
           rounded-full"
          />
          <div>
            <p className="font-semibold capitalize text-gray-700 text-sm">
              {user?.username}
            </p>
          </div>
        </div>
        <div>
          <div>
            <p className="text-sm text-gray-700 font-semibold">
              Ultima actualización del perfil
            </p>
            <p className="font-bold capitalize text-gray-500 text-sm text-end">
              {new Date(user?.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-end mt-5">
            <button
              onClick={() => openModalImagen()}
              type="button"
              className="border-[1px] border-sky-700 py-2 px-5 rounded-full text-sky-700 font-bold text-sm shadow"
            >
              Cargar imagen usuario
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-xl w-1/2 mx-auto mt-5">
        <div className="bg-gray-100 py-8 px-5 rounded-t-xl">
          <p className="text-sky-500 font-semibold text-sm">Mi Perfil</p>
        </div>
        <div className="bg-white py-8 px-8 grid grid-cols-3 rounded-xl">
          <p className="flex flex-col gap-1 text-gray-700 font-bold text-sm">
            Nombre y apellido{" "}
            <span className="font-semibold text-slate-400">
              {user?.username}
            </span>
          </p>
          <p className="flex flex-col gap-1 text-gray-700 font-bold text-sm">
            Email{" "}
            <span className="font-semibold text-slate-400">{user?.email}</span>
          </p>
          <p className="flex flex-col gap-1 text-gray-700 font-bold text-sm">
            Identificación{" "}
            <span className="font-semibold text-slate-400"></span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl w-1/2 mx-auto mt-5">
        <div className="bg-gray-100 py-8 px-5 rounded-t-xl">
          <p className="text-sky-500 font-semibold text-sm">Seguridad</p>
        </div>
        <div className="bg-white py-8 px-8  rounded-xl flex justify-between">
          <p className="flex flex-col gap-1 text-gray-700 font-bold text-sm">
            Contraseña
            <span className="font-semibold text-slate-400">
              {"***************"}
            </span>
          </p>

          <div>
            <div>
              <p className="text-gray-400 font-semibold text-sm mb-2">
                Última modificación: Hace un año
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="border-[1px] border-sky-700 py-2 px-5 rounded-full text-sky-700 font-bold text-sm shadow"
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl w-1/2 mx-auto mt-5">
        <div className="bg-gray-100 py-8 px-5 rounded-t-xl">
          <p className="text-sky-500 font-semibold text-sm">
            Datos de la facturación
          </p>
        </div>
        <div className="bg-white py-8 px-8  rounded-xl flex justify-between">
          <div className="grid grid-cols-3 gap-8 w-full">
            <p className="flex flex-col gap-1 text-gray-700 font-bold text-sm">
              Logo de la factura
              <img
                src={user?.imagen_facturacion}
                className="w-[100px]
           rounded-full object-cover shadow-xl"
              />
            </p>
            <div className="text-sm font-bold text-gray-700">
              <p>Dni</p>
              <p className="text-xs font-semibold text-gray-500">
                {user?.dni_facturacion ||
                  "Edita tus datos para poder ver el dni"}
              </p>
            </div>
            <div className="text-sm font-bold text-gray-700">
              <p>Telefono</p>
              <p className="text-xs font-semibold text-gray-500">
                {user?.telefono_facturacion ||
                  "Edita tus datos para poder ver el dni"}
              </p>
            </div>
            <div className="text-sm font-bold text-gray-700">
              <p>Email</p>
              <p className="text-xs font-semibold text-gray-500">
                {user?.email_facturacion ||
                  "Edita tus datos para poder ver el dni"}
              </p>
            </div>
            <div className="text-sm font-bold text-gray-700">
              <p>Localidad</p>
              <p className="text-xs font-semibold text-gray-500">
                {user?.localidad_facturacion ||
                  "Edita tus datos para poder ver el dni"}
              </p>
            </div>
            <div className="text-sm font-bold text-gray-700">
              <p>Provincia</p>
              <p className="text-xs font-semibold text-gray-500">
                {user?.provincia_facturacion ||
                  "Edita tus datos para poder ver el dni"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end py-6 px-4">
          <button
            onClick={() => openModal()}
            type="button"
            className="border-[1px] border-sky-700 py-2 px-5 rounded-full text-sky-700 font-bold text-sm shadow"
          >
            Editar los datos facturación
          </button>
        </div>
      </div>

      <ModalEditarDatosFacturacion
        isOpenEditarDatos={isOpen}
        closeModalEditarDatos={closeModal}
      />
      <ModalCargarImagen closeModal={closeModalImagen} isOpen={isOpenImagen} />
    </section>
  );
};
