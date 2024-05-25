import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useClientes } from "../context/ClientesContext"; // Cambia al contexto de clientes
import { useEffect } from "react";

export function CrearClienteNuevo() {
  const { createCliente, getClientes } = useClientes(); // Cambia al método para crear cliente
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Uso de React Hook Form para validación

  useEffect(() => {
    getClientes(); // Si es necesario, obtiene clientes cuando se monta el componente
  }, []);

  const onSubmit = async (formData) => {
    try {
      await createCliente(formData); // Crea un nuevo cliente con el objeto de datos
      navigate("/clientes"); // Redirige a la página de clientes después de la creación
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <section>
      <div className="bg-white w-full flex justify-between items-center">
        <div className="flex">
          <Link
            to={"/clientes"}
            className="px-8 text-base py-4 text-gray-700 font-medium hover:text-sky-700 transition-all"
          >
            Clientes
          </Link>
          <Link
            to={"/crear-cliente"}
            className="bg-sky-100 px-8 text-base py-4 text-sky-600 font-medium hover:bg-gray-100 transition-all"
          >
            Crear cliente
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
                  to={"/clientes"}
                >
                  Clientes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-10 flex justify-start items-start gap-16">
        <div className="w-1/2">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-slate-700 mt-10 text-xl">
              Crear Cliente
            </p>
            <p className="text-slate-600 font-medium text-sm">
              En esta sección podrás crear nuevos clientes.
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
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">
                    Nombre
                  </label>
                  <input
                    {...register("nombre", { required: true })}
                    type="text"
                    placeholder="Nombre del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 uppercase" // Hace que todo el texto esté en mayúsculas
                  />
                  {errors.nombre && (
                    <span className="text-red-500 text-sm uppercase">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">
                    Apellido
                  </label>
                  <input
                    {...register("apellido", { required: true })}
                    type="text"
                    placeholder="Apellido del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 uppercase" // Hace que todo el texto esté en mayúsculas
                  />
                  {errors.apellido && (
                    <span className="text-red-500 text-sm uppercase">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">
                    Localidad
                  </label>
                  <input
                    {...register("localidad", { required: true })}
                    type="text"
                    placeholder="Localidad del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 uppercase" // Hace que todo el texto esté en mayúsculas
                  />
                  {errors.localidad && (
                    <span className="text-red-500 text-sm uppercase">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">
                    Provincia
                  </label>
                  <input
                    {...register("provincia", { required: true })}
                    type="text"
                    placeholder="Provincia del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 uppercase" // Hace que todo el texto esté en mayúsculas
                  />
                  {errors.provincia && (
                    <span className="text-red-500 text-sm uppercase">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">
                    DNI
                  </label>
                  <input
                    {...register("dni")}
                    type="text"
                    placeholder="DNI del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 uppercase" // Hace que todo el texto esté en mayúsculas
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">
                    Teléfono
                  </label>
                  <input
                    {...register("telefono")}
                    type="text"
                    placeholder="Teléfono del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 uppercase" // Hace que todo el texto esté en mayúsculas
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email del cliente"
                    className="uppercase text-sm text-slate-700 bg-gray-100 font-bold rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-green-500 py-2 px-6 text-sm rounded-full font-bold text-white mt-3 hover:bg-green-600/90 cursor-pointer"
                  >
                    Guardar Cliente
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
