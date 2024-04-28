import Carrucel from "../components/Carrucel";
import Boton from "../components/Boton";

function PaginaInicio() {
  return (
    <div className="centrarVert">
      <Carrucel />
      <Boton clase="iniciarSesion" texto="Entrar!" ruta="/login" />
    </div>
  );
}

export default PaginaInicio;
