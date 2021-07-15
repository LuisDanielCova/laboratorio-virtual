import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./Routes";

function ProtectedRoute({ cargo, component: Component, ...rest }) {
  const { usuario } = useContext(UserContext);
  const [ruta, setRuta] = useState("");

  useEffect(() => {
    if (usuario.status !== undefined) {
      setRuta(
        <Route
          {...rest}
          render={(props) => {
            if (cargo === "Ninguno") {
              if (usuario.status) {
                return (
                  <Redirect
                    to={{ pathname: "inicio", state: { from: props.location } }}
                  />
                );
              } else {
                return <Component />;
              }
            } else if (cargo !== "Cualquiera") {
              if (usuario.status && usuario.cargo === cargo) {
                return <Component />;
              } else {
                return (
                  <Redirect
                    to={{
                      pathname: "/inicio",
                      state: { from: props.location },
                    }}
                  />
                );
              }
            } else {
              if (usuario.status) {
                return <Component />;
              } else {
                return (
                  <Redirect
                    to={{ pathname: "/", state: { from: props.location } }}
                  />
                );
              }
            }
          }}
        />
      );
    }
    // eslint-disable-next-line
  }, [usuario]);

  return ruta;
}

export default ProtectedRoute;
