import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import FormaMateria from "./components/FormaMateria";
import LeerMateria from "./components/LeerMateria";
import FormaActividad from "./components/FormaActividad";
import LeerActividad from "./components/LeerActividad";
import Login from "./components/users/Login";
import FormaUsuario from "./components/users/FormaUsuario";
import LeerUsuario from "./components/LeerUsuario";
import Inicio from "./components/inicio/Inicio";
import RegistroUsuario from "./components/users/RegistroUsuario";
import Contacto from "./components/inicio/Contacto";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/materias/crear" component={FormaMateria} />
        <Route exact path="/materias/crear/:id" component={FormaMateria} />
        <Route exact path="/materias/leer" component={LeerMateria} />
        <Route exact path="/actividades/crear" component={FormaActividad} />
        <Route exact path="/actividades/crear/:id" component={FormaActividad} />
        <Route exact path="/actividades/leer" component={LeerActividad} />
        <Route exact path="/usuarios/crear" component={FormaUsuario} />
        <Route exact path="/usuarios/crear/:id" component={FormaUsuario} />
        <Route exact path="/usuarios/" component={LeerUsuario} />
        <Route exact path="/registro/" component={RegistroUsuario} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/contacto" component={Contacto} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
