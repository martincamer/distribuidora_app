import { Link } from "react-router-dom";
import "../../src/index.css";

function HomePage() {
  window.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY;
    var element = document.querySelector(".imagen_url");

    if (scrollPosition > 0) {
      element.classList.add("scrolled");
    } else {
      element.classList.remove("scrolled");
    }
  });

  return (
    <>
      <section className="imagen_url bg-white-500 flex items-center">
        <header className="p-20 container mx-auto px-10 md:px-0">
          <h1 className="text-4xl py-2 font-bold text-teal-500">
            SOFTWARE DE GESTIÓN
          </h1>
          <p className="text-md text-slate-900 text-3xl flex flex-col gap-1 mt-2">
            Controlá cuánto invertís.
            <span className="pl-32 text-4xl">Conocé cuánto ganás.</span>
          </p>

          <p className="mt-6 text-500 text-lg underline">
            ¿Necesitás ordenarte y simplificar la administración para poder
            crecer?
          </p>

          <Link
            className="bg-teal-500 text-xl rounded-xl text-white px-12 uppercase font-semibold py-2 inline-block mt-6"
            to="/register"
          >
            USAR GRATÍS AHORA
          </Link>
        </header>
      </section>

      <section className=" bg-slate-100 py-20 px-10 flex gap-5 flex-col justify-center items-center">
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-semibold text-slate-600">
            + 9000 cuentas creadas
          </p>
          <p className="text-center text-slate-800 text-xl">
            Algunas marcas que usan Gestión Prisma...
          </p>
        </div>
        <div>MARCAS..</div>
      </section>

      <section className="mt-16 bg-white py-14 px-10 flex gap-5 flex-col justify-center items-center">
        <div className="flex flex-col gap-3"></div>
      </section>
    </>
  );
}

export default HomePage;
