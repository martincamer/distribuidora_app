import { PresupuestoDocument } from "../components/pdfs/PresupuestoDocument";
import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVentas } from "../context/VentasContext";
import { useAuth } from "../context/authContext";

export const PruebasPdf = () => {
  const [datos, setDatos] = useState({});
  const { user } = useAuth();
  const { getVenta } = useVentas(); // Función para obtener un cliente

  const params = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getVenta(params.id); // Obtiene el cliente por ID
        setDatos(res); // Establece el estado del cliente
      } catch (error) {
        console.error("Error al cargar el cliente:", error); // Manejo de errores
      }
    };

    loadData(); // Carga los datos del cliente cuando el componente se monta
  }, [params.id, getVenta]); // Asegúrate de incluir las dependencias necesarias

  console.log(datos);

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <PresupuestoDocument user={user} datos={datos} />
    </PDFViewer>
  );
};
