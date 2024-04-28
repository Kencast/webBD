import Nav from "./components/Nav";
import PaginaInicio from "./page/PaginaInicio";
import PaginaLogin from "./page/PaginaLogin";
import PaginaObservaciones from "./page/PaginaObservaciones";
import PaginaAgregarObs from "./page/PaginaAgregarObs";
import { useState } from "react";
import { Router, Route, Switch } from "wouter";

function App() {
  const [mostrarOpciones, setOpciones] = useState(false);
  const onOpciones = () => {
    setOpciones(true);
  };
  const offOpciones = () => {
    setOpciones(false);
  };
  return (
    <div className="fondo">
      <Nav mostrar={mostrarOpciones} />
      <Router base="/app">
        <Switch>
          <Route path="/login">
            {" "}
            <PaginaLogin handle={onOpciones} />{" "}
          </Route>
          <Route path="/principal" nest>
            {" "}
            <Switch>
              <Route path="/agregarObservacion">
                <PaginaAgregarObs />
              </Route>
              <Route>
                <PaginaObservaciones />
              </Route>
            </Switch>
          </Route>
          <Route path="/">
            {" "}
            <PaginaInicio />{" "}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
