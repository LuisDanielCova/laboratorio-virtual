import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import FormaAlumno from "./components/FormaAlumno";
import FormaProfesor from "./components/FormaProfesor";
import ReadAlumno from "./components/ReadAlumno";
import ReadProfesor from "./components/ReadProfesor";

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
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
