import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useClientes } from "../context/ClientesContext"; // Contexto de clientes
import { useEffect, useState } from "react";

export function EditarCliente() {
  const params = useParams(); // Para obtener el ID del cliente a editar
  const [cliente, setCliente] = useState({}); // Estado para almacenar datos del cliente

  const {
    updateCliente, // Método para actualizar clientes
    getCliente, // Método para obtener un cliente por su ID
  } = useClientes(); // Usar el contexto de clientes
  const navigate = useNavigate(); // Para redirigir después de editar

  const {
    register, // Para registrar campos en el formulario
    handleSubmit, // Para manejar el envío del formulario
    formState: { errors }, // Para obtener el estado del formulario
    setValue, // Para establecer valores en el formulario
  } = useForm(); // Uso de React Hook Form para el formulario

  // Efecto para cargar datos del cliente cuando el componente se monta
  useEffect(() => {
    const loadData = async () => {
      const res = await getCliente(params.id); // Obtiene el cliente por ID
      setValue("nombre", res.nombre);
      setValue("apellido", res.apellido);
      setValue("localidad", res.localidad);
      setValue("provincia", res.provincia);
      setValue("dni", res.dni);
      setValue("telefono", res.telefono);
      setValue("email", res.email);

      setCliente(res); // Establece el estado del cliente
    };
    loadData(); // Carga los datos del cliente al montar el componente
  }, [params.id, getCliente, setValue]); // Asegúrate de incluir todas las dependencias necesarias

  const onSubmit = async (formData) => {
    try {
      // Crea el objeto del cliente con los datos del formulario
      const clientData = {
        ...formData,
      };

      await updateCliente(params.id, clientData); // Actualiza el cliente

      // Redirige a la página de clientes después de actualizar
      setTimeout(() => {
        navigate("/clientes");
      }, 1000);
    } catch (error) {
      console.error("Error actualizando cliente:", error); // Manejo de errores
    }
  };

  return (
    <section>
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex">
          <Link
            to={"/clientes"}
            className="px-8 text-base py-4 font-medium hover:text-sky-700 transition-all"
          >
            Clientes
          </Link>
          <Link
            to={`/editar-cliente/${params.id}`}
            className="bg-sky-100 px-8 text-base py-4 text-sky-700 font-medium hover:bg-gray-100 transition-all"
          >
            Editar cliente
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
              Editar cliente
            </p>
            <p className="text-slate-600 font-medium text-sm">
              Aquí puedes editar la información del cliente.
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
                  <label className="text-sm font-bold text-slate-700">
                    Nombre
                  </label>
                  <input
                    {...register("nombre", { required: true })}
                    type="text"
                    placeholder="Nombre del cliente"
                    className="text-sm text-slate-700 bg-gray-100 rounded-lg uppercase py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 outline-1 font-bold"
                  />
                  {errors.nombre && (
                    <span className="text-red-500 text-sm">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Apellido
                  </label>
                  <input
                    {...register("apellido", { required: true })}
                    type="text"
                    placeholder="Apellido del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg uppercase py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 outline-1"
                  />
                  {errors.apellido && (
                    <span la="text-red-500 text-sm">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-slate-700">
                    Localidad
                  </label>
                  <input
                    {...register("localidad", { required: true })}
                    type="text"
                    placeholder="Localidad del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg uppercase py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 outline-1"
                  />
                  {errors.localidad && (
                    <span class="text-red-500 text-sm">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-slate-700">
                    Provincia
                  </label>
                  <input
                    {...register("provincia", { required: true })}
                    type="text"
                    placeholder="Provincia del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg uppercase py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 outline-1"
                  />
                  {errors.provincia && (
                    <span class="text-red-500 text-sm">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-slate-700">DNI</label>
                  <input
                    {...register("dni")}
                    type="text"
                    placeholder="DNI del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg uppercase py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 outline-1"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-slate-700">
                    Teléfono
                  </label>
                  <input
                    {...register("telefono")}
                    type="text"
                    placeholder="Teléfono del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg uppercase py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 outline-1"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-sm font-bold text-slate-700">Email</label>
                  <input
                    {...register("email")}
                    type="text"
                    placeholder="Email del cliente"
                    className="text-sm text-slate-700 bg-gray-100 font-bold rounded-lg uppercase py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-700 outline-1"
                  />
                </div>

                <div class="flex gap-4">
                  <Link
                    to={`/cliente/${cliente._id}`} // Enlace para cancelar
                    className="transition-all hover:bg-orange-500/20 text-orange-400 py-3 px-6 text-sm rounded-full font-semibold mt-3 cursor-pointer"
                  >
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    className="transition-all bg-green-500/90 py-3 px-6 text-sm rounded-full font-semibold text-white mt-3 hover:bg-green-600/90 cursor-pointer"
                  >
                    Guardar cambios
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
