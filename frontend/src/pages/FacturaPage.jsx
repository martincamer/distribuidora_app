import React from "react";
import { BsQrCode } from "react-icons/bs";

const FacturaPage = () => {
  return (
    <div className="max-w-4xl mx-auto border border-black p-6 font-sans text-sm relative bg-white">
      {/* Emisor */}
      <div className="flex justify-between pb-4 border-b border-black">
        <div className="relative w-1/2">
          <div className="absolute inset-x-0 top-0 mx-auto bg-white border-2 border-black w-12 h-12 text-center text-3xl font-bold flex items-center justify-center -translate-y-6">
            B
          </div>
          <div className="text-center text-2xl font-semibold mb-4">
            Empresa imaginaria S.A.
          </div>
          <p>
            <strong>Razón social:</strong> Empresa imaginaria S.A.
          </p>
          <p>
            <strong>Domicilio Comercial:</strong> Calle falsa 123
          </p>
          <p>
            <strong>Condición Frente al IVA:</strong> Responsable inscripto
          </p>
        </div>
        <div className="w-1/2 pl-16">
          <div className="text-2xl font-semibold mb-4">Factura</div>
          <div className="flex justify-between mb-2">
            <span>
              <strong>Punto de Venta:</strong> 0001
            </span>
            <span>
              <strong>Comp. Nro:</strong> 000000032
            </span>
          </div>
          <p>
            <strong>Fecha de Emisión:</strong> 25/10/2023
          </p>
          <p>
            <strong>CUIT:</strong> 12345678912
          </p>
          <p>
            <strong>Ingresos Brutos:</strong> 12345432
          </p>
          <p>
            <strong>Fecha de Inicio de Actividades:</strong> 25/10/2023
          </p>
        </div>
      </div>

      {/* Información de la factura */}
      <div className="py-4">
        <div className="flex justify-between">
          <p>
            <strong>Período Facturado Desde:</strong> 25/10/2023
          </p>
          <p>
            <strong>Hasta:</strong> 25/10/2023
          </p>
          <p>
            <strong>Fecha de Vto. para el pago:</strong> 25/10/2023
          </p>
        </div>
      </div>

      {/* Información del cliente */}
      <div className="py-4 border-t border-black">
        <div className="flex justify-between">
          <span>
            <strong>CUIL/CUIT:</strong> 12345678912
          </span>
          <span>
            <strong>Apellido y Nombre / Razón social:</strong> Pepe perez
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span>
            <strong>Condición Frente al IVA:</strong> Consumidor final
          </span>
          <span>
            <strong>Domicilio:</strong> Calle falsa 123
          </span>
        </div>
        <p className="mt-2">
          <strong>Condicion de venta:</strong> Efectivo
        </p>
      </div>

      {/* Detalles de la factura */}
      <div className="py-4 border-t border-black">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-300 border-b border-black">
              <th>Código</th>
              <th>Producto / Servicio</th>
              <th>Cantidad</th>
              <th>U. Medida</th>
              <th>Precio Unit.</th>
              <th>% Bonif.</th>
              <th>Imp. Bonif.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-b border-black">
              <td>321</td>
              <td>Madera</td>
              <td>1,00</td>
              <td>Unidad</td>
              <td>150,00</td>
              <td>0,00</td>
              <td>0,00</td>
              <td>150,00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Totales */}
      <div className="py-4 border-t border-black text-right">
        <div className="flex justify-end mb-2">
          <strong>Subtotal: $</strong> <span className="ml-2">150,00</span>
        </div>
        <div className="flex justify-end mb-2">
          <strong>Importe Otros Tributos: $</strong>{" "}
          <span className="ml-2">0,00</span>
        </div>
        <div className="flex justify-end">
          <strong>Importe total: $</strong> <span className="ml-2">150,00</span>
        </div>
      </div>

      {/* Código QR */}
      <div className="py-4 border-t border-black flex justify-between items-center">
        <BsQrCode value="Example QR Code" size={100} />
        <div className="text-right">
          <div className="mb-2">
            <strong>CAE Nº:&nbsp;</strong> 12345678912345
          </div>
          <div>
            <strong>Fecha de Vto. de CAE:&nbsp;</strong> 05/11/2023
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturaPage;
