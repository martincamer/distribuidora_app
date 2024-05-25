import React from "react";
import { Document, Text, View, Page, Image, Font } from "@react-pdf/renderer";
import bold from "../../fonts/Roboto-Bold.ttf";
import normal from "../../fonts/Roboto-Light.ttf";
import medium from "../../fonts/Roboto-Medium.ttf";
import { formatearDinero } from "../../helpers/FormatearDinero";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: normal,
      fontWeight: "normal",
    },
    {
      src: medium,
      fontWeight: "medium",
    },
    {
      src: bold,
      fontWeight: "bold",
    },
  ],
});

// Obtener la fecha actual
const fechaActual = new Date();

// Obtener el día de la semana (0 para domingo, 1 para lunes, ..., 6 para sábado)
const diaDeLaSemana = fechaActual.getDay();

// Obtener el día del mes
const diaDelMes = fechaActual.getDate();

// Obtener el mes (0 para enero, 1 para febrero, ..., 11 para diciembre)
const mes = fechaActual.getMonth();

// Obtener el año
const ano = fechaActual.getFullYear();

// Días de la semana en español
const diasSemana = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

// Meses en español
const meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export const PresupuestoDocument = ({ datos, user }) => {
  // Función para generar un número aleatorio de N dígitos
  const getRandomDigits = (numDigits) => {
    const min = Math.pow(10, numDigits - 1); // Mínimo número con el número de dígitos
    const max = Math.pow(10, numDigits) - 1; // Máximo número con el número de dígitos
    return Math.floor(Math.random() * (max - min + 1)) + min; // Genera un número aleatorio dentro del rango
  };

  // Función para generar el número de factura en formato 'XXXX-YYYYYY'
  const generateInvoiceNumber = () => {
    const prefix = getRandomDigits(4); // Cuatro dígitos para el prefijo
    const randomSuffix = getRandomDigits(6); // Seis dígitos para el sufijo
    return `${prefix}-${randomSuffix}`; // Combina el prefijo y el sufijo
  };
  const invoiceNumber = generateInvoiceNumber();

  //separar el aluminio
  // Objeto para agrupar por categoria y color
  const groupedByCategoryAndColor = {};

  // Agrupar productos por categoria y color
  datos?.productos?.forEach((producto) => {
    const key = `${producto.categoria}-${producto.color}`; // Clave para agrupar

    if (!groupedByCategoryAndColor[key]) {
      // Si la clave no existe, crear una nueva entrada
      groupedByCategoryAndColor[key] = {
        categoria: producto.categoria,
        color: producto.color,
        precio: producto.precio,
        total_dinero: 0,
        total_kilogramos: 0,
      };
    }

    // Sumar los valores al grupo existente
    groupedByCategoryAndColor[key].total_dinero += producto.total_dinero;
    groupedByCategoryAndColor[key].total_kilogramos +=
      producto.total_kilogramos;
  });

  // Convertir el objeto a un arreglo
  const groupedProducts = Object.values(groupedByCategoryAndColor);

  const totalVenta = datos?.productos?.reduce(
    (total, producto) => total + producto.total_dinero,
    0
  );

  // const totalKIlogramos = datos?.productos?.reduce(
  //   (total, producto) => total + producto.total_kilogramos,
  //   0
  // );

  // const totalPerfiles = datos?.productos?.reduce(
  //   (total, producto) => total + producto.cantidad,
  //   0
  // );

  return (
    <Document
      style={{
        zIndex: "100",
      }}
    >
      <Page
        size="A4"
        style={{
          padding: "10px 30px",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: "120px",
            }}
            src={
              user?.imagen_facturacion ||
              "https://lh5.googleusercontent.com/proxy/cbRpBBL-vhi05SpWADMaW16pJ_E2lyeEtKdOGBs6vLcvcbK9Q_Z_XU-OBZPEo67UN-GlCAkJNJ3gXH1hMe9yZ-ClwDoa5qc6rE16Y1NmAmW3hGn5r43C0lD7"
            }
          />
          <View>
            <Text
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
              }}
            >
              {datos?.tipo === "venta" ? "Factura de venta" : "Presupuesto"}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto",
                fontWeight: "medium",
                fontSize: 12,
              }}
            >
              N ° {invoiceNumber}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: "10px" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Datos de la empresa
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Nombre/Apellido{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {user.username}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Dni{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {user.dni_facturacion}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Telefono{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {user.telefono_facturacion}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Localidad{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {user.localidad_facturacion}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Provincia{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {user.provincia_facturacion}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Email{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {user.email_facturacion}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: "20px" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              border: "1px solid #000",
              padding: "10px 15px",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Datos del cliente
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Nombre/Apellido{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {datos?.cliente?.nombre + " " + datos?.cliente?.apellido}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Dni{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {datos?.cliente?.dni}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Telefono{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {datos?.cliente?.telefono}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Localidad{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {datos?.cliente?.localidad}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Provincia{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {datos?.cliente?.provincia}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  Email{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "medium",
                    fontSize: "10px",
                    textTransform: "capitalize",
                  }}
                >
                  {datos?.cliente?.email}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: "20px",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Productos
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "10px",
            }}
          >
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                padding: "10px 5px",
                borderBottom: "1px solid #000",
              }}
            >
              <Text
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: "10px",
                  fontFamily: "Roboto",
                  textTransform: "uppercase",
                }}
              >
                Codigo
              </Text>
              <Text
                style={{
                  width: "30%",
                  fontWeight: "bold",
                  fontSize: "10px",
                  fontFamily: "Roboto",
                  textTransform: "uppercase",
                }}
              >
                Descripción
              </Text>
              <Text
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: "10px",
                  fontFamily: "Roboto",
                  textTransform: "uppercase",
                }}
              >
                Color
              </Text>
              <Text
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: "10px",
                  fontFamily: "Roboto",
                  textTransform: "uppercase",
                }}
              >
                Cat.
              </Text>
              <Text
                style={{
                  width: "5%",
                  fontWeight: "bold",
                  fontSize: "10px",
                  fontFamily: "Roboto",
                  textTransform: "uppercase",
                }}
              >
                Kgs
              </Text>
              <Text
                style={{
                  width: "5%",
                  fontWeight: "bold",
                  fontSize: "10px",
                  fontFamily: "Roboto",
                  textTransform: "uppercase",
                }}
              >
                Cant.
              </Text>
              <Text
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  fontSize: "10px",
                  fontFamily: "Roboto",
                  textTransform: "uppercase",
                }}
              >
                Total
              </Text>
            </View>
            {datos?.productos?.map((p) => (
              <View
                key={p.id}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  padding: "3px 5px",
                }}
              >
                <Text
                  style={{
                    width: "10%",
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  {p.codigo}
                </Text>
                <Text
                  style={{
                    width: "30%",
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  {p.detalle}
                </Text>
                <Text
                  style={{
                    width: "10%",
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  {p.color}
                </Text>
                <Text
                  style={{
                    width: "10%",
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  {p.categoria}
                </Text>
                <Text
                  style={{
                    width: "5%",
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  {p.total_kilogramos.toFixed(2)}
                </Text>
                <Text
                  style={{
                    width: "5%",
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  {p.cantidad}
                </Text>
                <Text
                  style={{
                    width: "10%",
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  {formatearDinero(p.total_dinero)}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            border: "1px solid #000",
            padding: "10px 10px",
            marginTop: "20px",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "10px",
              fontFamily: "Roboto",
            }}
          >
            Resumen
          </Text>

          <View>
            {groupedProducts.map((p) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  marginTop: "5px",
                }}
              >
                <View
                  style={{
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  <Text>Categoria</Text>{" "}
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {p.categoria}
                  </Text>
                </View>
                <View
                  style={{
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  <Text>Color</Text>{" "}
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {p.color}
                  </Text>
                </View>
                <View
                  style={{
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  <Text>Precio kg</Text>{" "}
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {formatearDinero(p.precio)}
                  </Text>
                </View>
                <View
                  style={{
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  <Text>Total Dinero</Text>{" "}
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {formatearDinero(p.total_dinero)}
                  </Text>
                </View>
                <View
                  style={{
                    fontWeight: "medium",
                    fontSize: "8px",
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                  }}
                >
                  <Text>Total kgs</Text>{" "}
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {p.total_kilogramos.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View
            style={{
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "10px",
                fontFamily: "Roboto",
              }}
            >
              Total $
            </Text>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "10px",
                fontFamily: "Roboto",
                textTransform: "uppercase",
              }}
            >
              {formatearDinero(totalVenta)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
