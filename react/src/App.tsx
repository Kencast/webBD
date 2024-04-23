import Nav from "./components/Nav";
import PaginaInicio from "./page/PaginaInicio";
import PaginaLogin from "./page/PaginaLogin";
import { Route } from "wouter";

function App() {
  return (
    <div className="fondo">
      <Nav />
      <Route path="/login">
        {" "}
        <PaginaLogin />{" "}
      </Route>
      <Route path="/">
        {" "}
        <PaginaInicio />{" "}
      </Route>
    </div>
  );
}

export default App;