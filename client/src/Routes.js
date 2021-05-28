import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import FormaAlumno from "./components/FormaAlumno";
import Read from "./components/ReadAlumno";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/forma" component={FormaAlumno} />
        <Route exact path="/read" component={Read} />
        <Route exact path="/forma/:id" component={FormaAlumno} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
