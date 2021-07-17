import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import LeerMaterias from "./components/materias/LeerMaterias";
import DetallesMateria from "./components/materias/DetallesMateria";
import CrearMateria from "./components/materias/CrearMateria";
import DetallesActividad from "./components/actividades/DetallesActividad";
import Login from "./components/users/Login";
import LeerUsuarios from "./components/users/LeerUsuarios";
import DetallesUsuario from "./components/users/DetallesUsuario";
import Contacto from "./components/inicio/Contacto";
import LeerNotas from "./components/actividades/LeerNotas";
import CrearActividad from "./components/actividades/CrearActividad";
import CrearUsuario from "./components/users/CrearUsuario";
import Registro from "./components/users/Registro";
import RecuperarContrasena from "./components/users/RecuperarContrasena";
import axios from "axios";
import Dashboard from "./components/users/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import InscribirMateria from "./components/materias/InscribirMateria";
import ConfirmarUsuario from "./components/users/ConfirmarUsuario";
import CambiarContrasena from "./components/users/CambiarContrasena";
import RecuperarContrasenaPedir from "./components/users/RecuperarContrasenaPedir";

export const UserContext = createContext("");

const Routes = () => {
  const [usuario, setUsuario] = useState({
    usuario: "",
    cargo: "",
    id: "",
    status: undefined,
  });

  useEffect(() => {
    const conseguirUsuario = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/auth`,
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
      if (response.data.error) {
        setUsuario({ ...usuario, status: false });
      } else {
        setUsuario({ ...response.data, status: true });
      }
    };

    conseguirUsuario();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      <BrowserRouter>
        <Switch>
          {/* INICIO */}

          {/* Pagina de inicio */}
          <ProtectedRoute exact path="/" component={App} cargo="Ninguno" />
          {/* Pagina de bienvenida a un usuario con sesion activa */}
          <ProtectedRoute
            path="/inicio"
            cargo="Cualquiera"
            component={Dashboard}
          />
          {/* Pagina de Contacto */}
          <ProtectedRoute
            exact
            path="/contacto"
            component={Contacto}
            cargo="Ninguno"
          />

          {/* RUTAS MATERIAS */}

          {/* Lista de las materias */}
          <ProtectedRoute
            exact
            path="/materias/"
            cargo="Cualquiera"
            component={LeerMaterias}
          />
          {/* Inscribir materias */}
          <ProtectedRoute
            exact
            path="/materias/inscribir"
            cargo="Cualquiera"
            component={InscribirMateria}
          />
          {/* Detalles de una materia */}
          <ProtectedRoute
            exact
            path="/materias/:id"
            cargo="Cualquiera"
            component={DetallesMateria}
          />
          {/* Crear una materia */}
          <ProtectedRoute
            exact
            path="/materia/crear"
            cargo="Administrador"
            component={CrearMateria}
          />
          {/* Editar una materia */}
          <ProtectedRoute
            exact
            path="/materia/crear/:id"
            cargo="Administrador"
            component={CrearMateria}
          />

          {/* RUTAS ACTIVIDADES */}

          {/* Detalles de una actividad */}
          <ProtectedRoute
            exact
            path="/materias/:idMateria/actividades/:idActividad"
            cargo="Cualquiera"
            component={DetallesActividad}
          />
          {/* Crear una actividad */}
          <ProtectedRoute
            exact
            path="/materias/:idMateria/actividad/crear"
            cargo="Profesor"
            component={CrearActividad}
          />
          {/* Editar actividad */}
          <ProtectedRoute
            exact
            path="/materias/:idMateria/actividad/crear/:id"
            cargo="Profesor"
            component={CrearActividad}
          />

          {/* RUTAS USUARIOS */}

          <ProtectedRoute
            exact
            path="/login"
            component={Login}
            cargo="Ninguno"
          />

          <ProtectedRoute
            exact
            path="/recuperar"
            component={RecuperarContrasena}
            cargo="Ninguno"
          />
          <ProtectedRoute
            exact
            path="/recuperar/:idUsuario/:codigoConfirmacion"
            component={RecuperarContrasenaPedir}
            cargo="Ninguno"
          />
          <ProtectedRoute
            exact
            path="/registro/"
            component={Registro}
            cargo="Ninguno"
          />

          {/* Lista de los usuarios registrados */}
          <ProtectedRoute
            exact
            path="/usuarios"
            cargo="Administrador"
            component={LeerUsuarios}
          />
          {/* Perfil de un usuario */}
          <ProtectedRoute
            exact
            path="/usuarios/:id"
            cargo="Cualquiera"
            component={DetallesUsuario}
          />
          {/* Crear usuario */}
          <ProtectedRoute
            exact
            path="/usuario/crear"
            cargo="Administrador"
            component={CrearUsuario}
          />
          {/* Editar usuario */}
          <ProtectedRoute
            exact
            path="/usuario/crear/:id"
            cargo="Cualquiera"
            component={CrearUsuario}
          />
          {/* Confirmar Usuario */}
          <Route
            exact
            path="/confirmar/:tokenConfirmacion"
            component={ConfirmarUsuario}
          />
          {/* Cambiar Contraseña */}
          <ProtectedRoute
            exact
            path="/usuario/cambiarcontrasena"
            cargo="Cualquiera"
            component={CambiarContrasena}
          />

          {/* RUTAS NOTAS */}

          <ProtectedRoute
            exact
            path="/notas"
            cargo="Cualquiera"
            component={LeerNotas}
          />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default Routes;
