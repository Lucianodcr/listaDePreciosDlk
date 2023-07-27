import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./services/config";
import Login from "./Login/Login"; // Importar el componente Login
import Table from "./Table/Table";
import ClientUser from "./ClientUser/ClientUser";
import  RepartidorUser  from "./RepartidorUser/RepartidorUser";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para manejar la carga inicial

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Marcar la carga como completa cuando se obtiene el estado del usuario
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  // Rutas de la aplicación
  return (
    <BrowserRouter>
      <div className="container mx-auto p-4">
        {/* Pantalla principal */}
        {user === null && (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-4">Elija el tipo de cuenta:</h1>
            <Link to="/cliente" className="text-blue-500 font-semibold mb-4">
              Cliente
            </Link>
            <Link to="/repartidor" className="text-blue-500 font-semibold mb-4">
              Repartidor
            </Link>
            <Link to="/" className="text-blue-500 font-semibold mb-4">
              Administrador
            </Link>
          </div>
        )}

        {/* Esperar a que se cargue el estado del usuario */}
        {!loading && (
          <Switch>
            {/* Rutas para los componentes de usuario */}
            <Route path="/cliente">
              <ClientUser />
            </Route>
            <Route path="/repartidor">
              <RepartidorUser />
            </Route>
            {/* Rutas para las demás páginas */}
            <Route exact path="/">
              {user ? (
                <>
                  <h1 className="text-3xl font-semibold mb-4">
                    Lista de Precios Actualizada a la Fecha de Hoy
                  </h1>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cerrar Sesión
                  </button>
                  <Table />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            {/* Ruta de la página de inicio de sesión */}
            <Route path="/login">
              <Login /> {/* Incluir el componente Login aquí */}
            </Route>
            {/* Ruta de página no encontrada (404) */}
            <Route path="*">
              <h1>Página no encontrada</h1>
            </Route>
          </Switch>
        )}
        {/* Mostrar mensaje de carga mientras se obtiene el estado del usuario */}
        {loading && <h1>Cargando...</h1>}
      </div>
    </BrowserRouter>
  );
};

export default App;
