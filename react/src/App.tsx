import Nav from "./components/Nav";
import PaginaInicio from "./page/PaginaInicio";
import PaginaLogin from "./page/PaginaLogin";
import PaginaObservaciones from "./page/PaginaObservaciones";
import PaginaAgregarObs from "./page/PaginaAgregarObs";
import PaginaPerfil from "./page/PaginaPerfil";
import PaginaInformacion from "./page/PaginaInformacion";
import PaginaMisObservaciones from "./page/PaginaMisObservaciones";
import PaginaAgregarIde from "./page/PaginaAgregarIde";
import PaginaActualizarObs from "./page/PaginaActualizarObs";
import { useState } from "react";
import { Router, Route, Switch } from "wouter";
import Cargar from "./components/Cargar";

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
      <Router>
        <Switch>
          <Route path="/login">
            {" "}
            <PaginaLogin handle={onOpciones} />{" "}
          </Route>
          <Route path="/principal" nest>
            {" "}
            <Switch>
              <Route path="/actualizarObservacion/:id">
                {(p) => <PaginaActualizarObs id={p.id} />}
              </Route>
              <Route path="/agregarIdentificacion/:id">
                {(pa) => <PaginaAgregarIde id={pa.id} />}
              </Route>
              <Route path="/informacion/:id">
                {(params) => <PaginaInformacion id={params.id} />}
              </Route>
              <Route path="/misObservaciones">
                <PaginaMisObservaciones />
              </Route>
              <Route path="/perfil">
                <PaginaPerfil />
              </Route>
              <Route path="/agregarObservacion">
                <PaginaAgregarObs />
              </Route>
              <Route path="/observaciones">
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
