import Nav from "./components/Nav";
import Carrucel from "./components/Carrucel";

function App() {
  const LaCentracion = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const estilo = {
    backgroundColor: "black",
  };
  return (
    <div style={estilo}>
      <Nav />
      <div>
        <div style={LaCentracion}>
          <Carrucel />
        </div>
      </div>
    </div>
  );
}

export default App;
