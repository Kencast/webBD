import Carrucel from "../components/Carrucel";
import Boton from "../components/Boton";
import { useLocation } from "wouter";

function PaginaInicio() {
  const [actual, setLocation] = useLocation();
  const redirigir = () => {
    setLocation("/login");
  };
  return (
    <div className="centrarVert">
      <Carrucel />
      <Boton clase="iniciarSesion" texto="Entrar!" fun={redirigir} />
    </div>
  );
}

export default PaginaInicio;
