import { useState } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import {
  MdOutlineSell,
  MdOutlineSendAndArchive,
  MdOutlineCases,
} from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import ModalCrearVenta from "../components/modals/ModalCrearVenta";

export const Ventas = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <section className="flex flex-col gap-5 container mx-auto">
      <div className="py-10 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border-slate-300 border-[1px] py-8 px-5 hover:shadow-md transition-all ease-linear flex justify-between items-center gap-5">
          <div>
            <FaMoneyCheckDollar className="text-7xl text-violet-700 bg-violet-100 rounded-full py-3 px-3.5" />
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="bg-violet-100 py-2 px-3 rounded-xl">
              <p className="text-xs  text-slate-700 font-bold">
                Porcentaje en facturación/ventas
              </p>
            </div>
            <div>
              <p className="font-normal flex items-center gap-2 flex-wrap">
                Total facturado del més{" "}
                <span className="font-bold text-violet-500 bg-violet-100 py-2 px-2 rounded-xl">
                  $ {1500000.55}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="gap-5 rounded-2xl border-slate-300 border-[1px] py-8 px-5 hover:shadow-md transition-all ease-linear flex justify-between items-center">
          <div>
            <MdOutlineCases className="text-7xl text-violet-700 bg-violet-100 rounded-full py-3 px-3.5" />
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="bg-violet-100 py-2 px-3 rounded-xl">
              <p className="text-xs  text-slate-700 font-bold">
                Porcentaje de presupuestos/ventas
              </p>
            </div>
            <div>
              <p className="font-normal flex gap-2 items-center flex-wrap">
                Total de presupuestos del més
                <span className="font-bold text-violet-500 bg-violet-100 py-2 px-2 rounded-xl">
                  ${100000.55}
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
                {/* <TbHandClick className="text-xl" /> */}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-slate-300 border-[1px] rounded-2xl py-5 px-5 hover:shadow-md transition-all ease-linear flex gap-2">
        <Link
          onClick={() => openModal()}
          className="bg-violet-100 py-3 px-5 rounded-2xl text-violet-700 group flex gap-3 items-center relative transition-all ease-linear duration-300"
          // to={"/crear-producto"}
        >
          <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
            Crear nueva facturación/venta
          </span>
          <MdOutlineSell className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
        </Link>
        <Link
          onClick={() => openModal()}
          className="bg-green-100 py-3 px-5 rounded-2xl text-green-700 group flex gap-3 items-center relative transition-all ease-linear duration-300"
          // to={"/crear-producto"}
        >
          <span className="transition-opacity duration-300 opacity-100 group-hover:opacity-0">
            Crear nuevo presupuesto/venta
          </span>
          <MdOutlineSendAndArchive className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 right-0 top-0 bottom-0 m-auto" />
        </Link>
      </div>

      <ModalCrearVenta closeModal={closeModal} isOpen={isOpen} />
    </section>
  );
};
