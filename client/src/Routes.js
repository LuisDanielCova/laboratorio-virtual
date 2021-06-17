import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import LeerMaterias from "./components/materias/LeerMaterias";
import DetallesMateria from "./components/materias/DetallesMateria";
import CrearMateria from "./components/materias/CrearMateria";
import DetallesActividad from "./components/actividades/DetallesActividad";
import FormaActividad from "./components/FormaActividad";
import RegistroUsuario from "./components/users/RegistroUsuario";
import Login from "./components/users/Login";
import FormaUsuario from "./components/users/FormaUsuario";
import LeerUsuarios from "./components/users/LeerUsuarios";
import DetallesUsuario from "./components/users/DetallesUsuario";
import Contacto from "./components/inicio/Contacto";
import LeerNotas from "./components/actividades/LeerNotas";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        {/* RUTAS MATERIAS */}
        <Route exact path="/materias/" component={LeerMaterias} />
        <Route exact path="/materias/:id" component={DetallesMateria} />
        <Route exact path="/materias/crear" component={CrearMateria} />
        <Route exact path="/materias/crear/:id" component={CrearMateria} />
        {/* RUTAS ACTIVIDADES */}
        <Route
          exact
          path="/materias/:idMateria/actividades/:idActividad"
          component={DetallesActividad}
        />
        <Route
          exact
          path="/materias/:idMateria/actividades/crear"
          component={FormaActividad}
        />
        <Route
          exact
          path="/materias/:idMateria/actividades/crear/:id"
          component={FormaActividad}
        />
        {/* RUTAS USUARIOS */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro/" component={RegistroUsuario} />
        <Route exact path="/usuarios/" component={LeerUsuarios} />
        <Route exact path="/usuarios/:id" component={DetallesUsuario} />
        <Route exact path="/usuarios/crear" component={FormaUsuario} />
        <Route exact path="/usuarios/crear/:id" component={FormaUsuario} />
        {/* RUTAS NOTAS */}
        <Route exact path="/notas" component={LeerNotas} />
        {/* INICIO */}
        <Route exact path="/contacto" component={Contacto} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
