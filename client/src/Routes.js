import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import FormaAlumno from "./components/FormaAlumno";
import FormaMateria from "./components/FormaMateria";
import FormaProfesor from "./components/FormaProfesor";
import ReadAlumno from "./components/ReadAlumno";
import ReadProfesor from "./components/ReadProfesor";
import LeerMateria from "./components/LeerMateria";
import FormaActividad from "./components/FormaActividad";
import LeerActividad from "./components/LeerActividad";
import Login from "./components/Login";
import FormaUsuario from "./components/FormaUsuario";
import LeerUsuario from "./components/LeerUsuario";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/forma/alumno" component={FormaAlumno} />
        <Route exact path="/read/alumnos" component={ReadAlumno} />
        <Route exact path="/forma/alumno/:id" component={FormaAlumno} />
        <Route exact path="/forma/profesor" component={FormaProfesor} />
        <Route exact path="/forma/profesor/:id" component={FormaProfesor} />
        <Route exact path="/read/profesores" component={ReadProfesor} />
        <Route exact path="/materias/crear" component={FormaMateria} />
        <Route exact path="/materias/crear/:id" component={FormaMateria} />
        <Route exact path="/materias/leer" component={LeerMateria} />
        <Route exact path="/actividades/crear" component={FormaActividad} />
        <Route exact path="/actividades/crear/:id" component={FormaActividad} />
        <Route exact path="/actividades/leer" component={LeerActividad} />
        <Route exact path="/usuarios/crear" component={FormaUsuario} />
        <Route exact path="/usuarios/crear/:id" component={FormaUsuario} />
        <Route exact path="/usuarios/" component={LeerUsuario} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
