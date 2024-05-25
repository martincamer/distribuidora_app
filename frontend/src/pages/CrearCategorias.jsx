import { useProductos } from "../context/ProductosContext";
import { Link } from "react-router-dom";
import { TableCategorias } from "../components/categorias/TableCategorias";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export function CrearCategorias() {
  const { createCategoria } = useProductos();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //submit crear
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

  return (
    <section>
      <div className="bg-white w-full flex justify-between items-center ">
        <div className="flex">
          <Link
            to={"/productos"}
            className="bg-gray-100/50 px-8 text-base py-4 text-gray-700 font-medium hover:text-sky-500 transition-all"
          >
            Perfiles
          </Link>
          <Link
            to={"/categorias"}
            className="bg-sky-500/10 px-8 text-base py-4 text-sky-500 font-medium hover:bg-gray-100 transition-all"
          >
            Categorias
          </Link>
        </div>
        <div className="flex mx-9">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link
                  className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl cursor-pointer font-semibold"
                  to={"/home"}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="bg-sky-100 text-sky-700 py-2 px-4 rounded-xl cursor-pointer font-semibold"
                  to={"/productos"}
                >
                  Perfiles
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-10 w-1/2 flex flex-col gap-2">
        <div className="bg-white my-5 rounded-xl shadow-lg flex flex-col gap-3">
          <div className="bg-gray-100 py-4 rounded-t-xl">
            <p className="text-sky-500 text-center text-base font-bold">
              Formulario crear nueva categoria
            </p>
          </div>
          <div className="px-10 py-8 flex flex-col gap-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">
                  El nombre de la categoria
                </label>
                <input
                  {...register("detalle")}
                  type="text"
                  placeholder="Ej: herrero,modena,etc"
                  className="text-sm uppercase text-slate-700 bg-gray-100 rounded-lg py-3 px-3 outline-none ease-linear transition-all focus:outline-sky-500 outline-1 font-bold"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-green-500 py-3 px-8 text-sm rounded-full font-semibold text-white mt-3 hover:bg-green-500/90 cursor-pointer"
                >
                  Guardar categoria
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-10 w-2/3">
        <TableCategorias />
      </div>{" "}
    </section>
  );
}
