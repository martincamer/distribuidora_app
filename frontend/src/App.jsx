import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./routes";
import { LoginPage } from "./pages/LoginPage";
import { ProductosPage } from "./pages/ProductosPage";
import { ProductosProvider } from "./context/ProductosContext";
import { HomeApp } from "./pages/HomeApp";
import { CrearProductoNuevo } from "./pages/CrearProductoNuevo";
import { CrearCategorias } from "./pages/CrearCategorias";
import { VentasPage } from "./pages/VentasPage";
import { EditarProducto } from "./pages/EditarProducto";
import { Producto } from "./pages/Producto";
import { CrearColores } from "./pages/CrearColores";
import { ClientesPage } from "./pages/ClientesPage";
import { ClientesProvider } from "./context/ClientesContext";
import { CrearClienteNuevo } from "./pages/CrearCliente";
import { EditarCliente } from "./pages/EditarCliente";
import { Cliente } from "./pages/Cliente";
import { CrearVenta } from "./pages/CrearVenta";
import { Venta } from "./pages/Venta";
import { EditarVenta } from "./pages/EditarVenta";
import { Perfil } from "./pages/Perfil";
import { PruebasPdf } from "./pages/PruebasPdf";
import { useAuth } from "./context/authContext";
import { CuentaInactivaHome } from "./pages/CuentaInactivaHome";
import { useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import VentasProvider from "./context/VentasContext";
import FacturaPage from "./pages/FacturaPage";

function App() {
  const { user } = useAuth();

  useEffect(() => {}, [user]);

  const location = useLocation();

  useEffect(() => {
    document.title = getPageTitle(location.pathname);
  }, [location]);

  const getPageTitle = (path) => {
    switch (path) {
      case "/":
        return "Gestión Prisma";
      case "/login":
        return "Gestión Prisma Login";
      case "/register":
        return "Gestión Prisma Registro";
      case "/home":
        return "Gestión Prisma Inicio";
      case "/factura":
        return "Gestión Prisma Factura";
      case "/ventas":
        return "Gestión Prisma Ventas";
      case "/perfil":
        return "Gestión Prisma Perfil";
      case "/clientes":
        return "Gestión Prisma Clientes";
      case "/crear-venta":
        return "Gestión Prisma Crear Venta";
      case "/productos":
        return "Gestión Prisma Productos";
      default:
        return "Gestión Prisma";
    }
  };

  return (
    <VentasProvider>
      <ProductosProvider>
        <ClientesProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              {user?.cuenta === "desactivada" ? (
                <Route index path="/home" element={<CuentaInactivaHome />} />
              ) : (
                <>
                  <Route index path="/home" element={<HomeApp />} />
                  <Route index path="/factura" element={<FacturaPage />} />
                  <Route path="/ventas" element={<VentasPage />} />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route path="/clientes" element={<ClientesPage />} />
                  <Route path="/cliente/:id" element={<Cliente />} />
                  <Route
                    path="/editar-cliente/:id"
                    element={<EditarCliente />}
                  />
                  <Route
                    path="/crear-cliente"
                    element={<CrearClienteNuevo />}
                  />
                  <Route path="/venta/:id" element={<Venta />} />
                  <Route path="/editar-venta/:id" element={<EditarVenta />} />
                  <Route path="/crear-venta" element={<CrearVenta />} />
                  <Route path="/productos" element={<ProductosPage />} />
                  <Route path="/producto/:id" element={<Producto />} />
                  <Route path="/categorias" element={<CrearCategorias />} />
                  <Route path="/colores" element={<CrearColores />} />
                  <Route
                    path="/crear-producto"
                    element={<CrearProductoNuevo />}
                  />
                  <Route
                    path="/editar-producto/:id"
                    element={<EditarProducto />}
                  />
                  <Route path="/profile" element={<h1>Profile</h1>} />
                  <Route path="/factura/:id" element={<PruebasPdf />} />
                </>
              )}
            </Route>
          </Routes>
        </ClientesProvider>
      </ProductosProvider>
    </VentasProvider>
  );
}

export default App;
