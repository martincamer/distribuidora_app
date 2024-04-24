import { useEffect, useState } from "react";
import { useProductos } from "../context/ProductosContext";
import { CiShoppingCart } from "react-icons/ci";
import { ImFileEmpty } from "react-icons/im";
import { BsFolderPlus } from "react-icons/bs";
import { TbHandClick } from "react-icons/tb";
import { TableProducts } from "../components/products/TableProducts";
import { IoFilterOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ModalFormProducts from "../components/modals/ModalFormProducts";
import ModalCategorias from "../components/modals/ModalCategorias";
import ModalColores from "../components/modals/ModalColores";
import { Footnote, PageBottom, Tailwind } from "@onedoc/react-print";

export function ProductosPage(props) {
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenCategorias, setIsOpenCategorias] = useState(false);
  let [isOpenColor, setIsOpenColor] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalCategorias() {
    setIsOpenCategorias(false);
  }

  function openModalCategoiras() {
    setIsOpenCategorias(true);
  }

  function closeModalColores() {
    setIsOpenColor(false);
  }

  function openModalColores() {
    setIsOpenColor(true);
  }

  const { productos, getProductos } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  const [idObtenida, setObtenerId] = useState(null);

  const handleID = (id) => setObtenerId(id);

  return (
    <div>
      {productos.length === 0 && (
        <div className="flex flex-col gap-6 justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay ningun producto cargado ahún
            </h1>
          </div>
          <div>
            <Link
              onClick={() => openModal()}
              className="bg-violet-100 text-violet-700 py-3 px-6 rounded-2xl hover:shadow-md transition-all ease-linear flex gap-2 items-center"
              // to={"/crear-producto"}
            >
              Crear nuevo producto
              <BsFolderPlus className="text-2xl" />
            </Link>
          </div>
        </div>
      )}
      {productos.length > 0 && (
        <div className="flex flex-col gap-5 container mx-auto">
          <section className="py-10 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border-slate-300 border-[1px] py-8 px-5 hover:shadow-md transition-all ease-linear flex justify-between items-center">
              <div>
                <CiShoppingCart className="text-7xl text-violet-700 bg-violet-100 rounded-full py-3 px-3.5" />
              </div>
              <div className="flex flex-col items-end gap-4">
                <div className="bg-violet-100 py-2 px-3 rounded-xl">
                  <p className="text-xs  text-slate-700 font-bold">
                    Porcentaje de productos cargados
                  </p>
                </div>
                <div>
                  <p className="font-normal">
                    Productos cargados hasta el momento{" "}
                    <span className="font-bold text-violet-500 bg-violet-100 py-2 px-2 rounded-xl">
                      {100}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-slate-300 border-[1px] py-8 px-5 hover:shadow-md transition-all ease-linear flex justify-between items-center">
              <div>
                <CiShoppingCart className="text-7xl text-violet-700 bg-violet-100 rounded-full py-3 px-3.5" />
              </div>
              <div className="flex flex-col items-end gap-4">
                <div className="bg-violet-100 py-2 px-3 rounded-xl">
                  <p className="text-xs  text-slate-700 font-bold">
                    Porcentaje de kg vendidos en el mes
                  </p>
                </div>
                <div>
                  <p className="font-normal">
                    Kilogramos vendidos del mes{" "}
                    <span className="font-bold text-violet-500 bg-violet-100 py-2 px-2 rounded-xl">
                      {100.55} kgs.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-slate-300 border-[1px] py-8 px-5 hover:shadow-md transition-all ease-linear flex justify-between items-center">
              <div>
                <CiShoppingCart className="text-7xl text-violet-700 bg-violet-100 rounded-full py-3 px-3.5" />
              </div>
              <div className="flex flex-col items-end gap-4">
                <div className="bg-violet-100 py-2 px-3 rounded-xl">
                  <p className="text-xs  text-slate-700 font-bold">
                    Porcentaje de materiales vendidos en el mes
                  </p>
                </div>
                <div className="flex flex-col gap-2 h-[50px] overflow-y-scroll">
                  <p className="font-normal">
                    Materiales vendidos por categoria y color{" "}
                  </p>
                  <Link className="bg-green-100  text-green-700 rounded-2xl py-3 px-4 text-sm font-bold flex gap-2 items-center justify-between">
                    Ver materiales mas vendidos
                    <TbHandClick className="text-xl" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <div className="border-slate-300 border-[1px] rounded-2xl py-5 px-5 hover:shadow-md transition-all ease-linear flex gap-2">
            <Link
              onClick={() => openModal()}
              className="bg-violet-100 py-3 px-5 rounded-2xl text-violet-700 group flex gap-3 items-center relative transition-all ease-linear duration-300"
              // to={"/crear-producto"}
            >
              <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                Crear nuevo producto
              </span>
              <BsFolderPlus className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
            </Link>
            <Link
              onClick={() => openModalCategoiras()}
              className="bg-green-100 py-3 px-5 rounded-2xl text-green-700 group flex gap-3 items-center relative transition-all ease-linear duration-300"
              // to={"/crear-producto"}
            >
              <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                Crear nuevas categorias
              </span>
              <IoFilterOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
            </Link>
            <Link
              onClick={() => openModalColores()}
              className="bg-green-100 py-3 px-5 rounded-2xl text-green-700 group flex gap-3 items-center relative transition-all ease-linear duration-300"
              // to={"/crear-producto"}
            >
              <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                Crear nuevos colores
              </span>
              <IoFilterOutline className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
            </Link>
          </div>

          <TableProducts
            handleID={handleID}
            openModal={openModal}
            productos={productos}
          />
        </div>
      )}
      <ModalFormProducts
        idObtenida={idObtenida}
        isOpen={isOpen}
        closeModal={closeModal}
      />
      <ModalCategorias
        isOpen={isOpenCategorias}
        closeModal={closeModalCategorias}
        idObtenida={idObtenida}
      />
      <ModalColores
        isOpen={isOpenColor}
        closeModal={closeModalColores}
        idObtenida={idObtenida}
      />
      <Tailwind>
        <div className="container mx-auto">
          <div className="flex justify-between items-end pb-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Invoice #1234</h1>
              <p className="text-xs">January 1, 2025</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              enableBackground="new 0 0 46.15 9.31"
              version="1.1"
              viewBox="0 0 46.15 9.31"
              xmlSpace="preserve"
              fill="black"
              {...props}
            >
              <path d="M10 9.13V2.55h1.83v.91c.35-.62 1.13-1.09 2.07-1.09.71 0 1.32.24 1.81.71s.74 1.15.74 2.03v4.02h-1.88V5.6c0-.96-.5-1.5-1.28-1.5-.85 0-1.42.62-1.42 1.55v3.48H10zM23.84 6.48h-4.83c.23.83.83 1.24 1.79 1.24.74 0 1.43-.22 2.05-.64l.74 1.28c-.8.61-1.76.91-2.88.91-1.16 0-2.05-.34-2.67-1-.61-.66-.92-1.47-.92-2.45 0-1 .32-1.81.96-2.46.64-.66 1.48-.98 2.51-.98.97 0 1.76.3 2.39.89.62.59.94 1.39.94 2.41-.01.23-.04.5-.08.8zM19 5.13h3.09c-.18-.76-.73-1.22-1.51-1.22-.76 0-1.38.46-1.58 1.22zM29.43 0h1.88v9.13h-1.82v-.71c-.52.59-1.16.88-1.96.88-.92 0-1.69-.32-2.31-.98-.61-.66-.92-1.47-.92-2.47 0-.98.31-1.8.92-2.46.62-.66 1.39-1 2.31-1 .74 0 1.38.26 1.89.8V0zm-.39 4.6c-.31-.34-.71-.5-1.2-.5s-.89.17-1.21.5c-.31.34-.47.74-.47 1.22 0 .49.16.91.47 1.25.32.34.72.5 1.21.5s.89-.17 1.2-.5c.32-.34.48-.76.48-1.25 0-.47-.15-.88-.48-1.22zM33.03 8.31c-.66-.67-.98-1.5-.98-2.47s.32-1.8.98-2.46c.66-.67 1.51-1.01 2.55-1.01 1.04 0 1.91.34 2.57 1.01.66.66 1 1.49 1 2.46s-.34 1.8-1 2.47c-.66.66-1.52 1-2.57 1-1.04 0-1.89-.34-2.55-1zm3.74-3.68c-.32-.34-.72-.5-1.19-.5s-.86.17-1.19.5c-.32.32-.48.73-.48 1.2 0 .49.16.9.48 1.24.32.32.72.49 1.19.49s.86-.17 1.19-.49c.32-.34.49-.74.49-1.24 0-.47-.17-.88-.49-1.2zM40.5 8.31c-.65-.65-.97-1.47-.97-2.48s.32-1.83.98-2.47c.66-.65 1.5-.97 2.54-.97 1.36 0 2.55.67 3.09 1.87l-1.5.8c-.38-.62-.9-.94-1.56-.94-.49 0-.89.17-1.21.49-.32.32-.48.73-.48 1.21 0 .49.16.91.47 1.24.32.32.72.48 1.2.48.66 0 1.27-.38 1.55-.92l1.52.9c-.58 1.07-1.74 1.75-3.12 1.75-1.02 0-1.86-.32-2.51-.96zM9.26 4.7c0-1.29-.44-2.36-1.34-3.25C7.03.55 5.94.1 4.63.1c-1.3 0-2.39.45-3.29 1.35C.45 2.34 0 3.43 0 4.71c0 .37.05.72.12 1.05l4.3-3.39h2.22v6.46c.47-.22.9-.5 1.29-.88.89-.89 1.33-1.97 1.33-3.25z"></path>
              <path d="M1.49 8.09c.62.56 1.34.94 2.17 1.1v-2.8l-2.17 1.7z"></path>
            </svg>
          </div>

          <div className="text-right">
            <p className="p-0 mb-1">
              <b>Onedoc, Inc</b>
            </p>
            <p className="p-0 mb-1">1600 Pennsylvania Avenue NW,</p>
            <p className="p-0 mb-1">Washington,</p>
            <p className="p-0 mb-1">DC 20500,</p>
            <p className="p-0 mb-1">United States of America</p>
          </div>

          <div className="h-px bg-gray-300 my-4" />

          <div>
            <p className="p-0 mb-1">
              <b>Bill to:</b>
            </p>
            <p className="p-0 mb-1">Titouan LAUNAY</p>
            <p className="p-0 mb-1">72 Faxcol Dr Gotahm City,</p>
            <p className="p-0 mb-1">NJ 12345,</p>
            <p className="p-0 mb-1">United States of America</p>
          </div>

          <div className="h-px bg-gray-300 my-4" />

          <p className="p-0 leading-5">
            All items below correspond to work completed in the month of January
            2024. Payment is due within 15 days of receipt of this invoice.
            <Footnote>This includes non-business days.</Footnote>
          </p>

          <table className="w-full my-12">
            <tr className="border-b border-gray-300">
              <th className="text-left font-bold py-2">Item</th>
              <th className="text-left font-bold py-2">Description</th>
              <th className="text-left font-bold py-2">Unit Price</th>
              <th className="text-left font-bold py-2">Quantity</th>
              <th className="text-left font-bold py-2">Amount</th>
            </tr>

            <tr className="border-b border-gray-300">
              <td className="py-2">1</td>
              <td className="py-2">Onedoc Startup Subscription</td>
              <td className="py-2">$100</td>
              <td className="py-2">1</td>
              <td className="py-2">$100</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-2">2</td>
              <td className="py-2">Onedoc support</td>
              <td className="py-2">$0</td>
              <td className="py-2">1</td>
              <td className="py-2">$0</td>
            </tr>

            <tr className="border-b border-gray-300">
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2">Total</th>
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2">$100</th>
            </tr>
          </table>

          <div className="bg-blue-100 p-3 rounded-md border-blue-300 text-blue-800 text-sm">
            On January 1st 2024, Onedoc users will be upgraded free of charge to
            our new cloud offering.
          </div>

          <PageBottom>
            <div className="h-px bg-gray-300 my-4" />
            <div className="text-gray-400 text-sm">Invoice #1234</div>
          </PageBottom>
        </div>
      </Tailwind>
    </div>
  );
}
