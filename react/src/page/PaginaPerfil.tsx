import { user } from "./PaginaLogin";
import Boton from "../components/Boton";

function PaginaPerfil() {
  return (
    <div className="centrarVert">
      <div className="cardP">
        <img className="profileImageP" src={`${user.foto}`} />
        <div className="textContainerP">
          <p className="nameP">{`${user.nombre} ${user.apellido}`}</p>
          <p className="profileP">{`Es de ${user.pais}`}</p>
          <p className="profileP">{`Vive en ${user.direccion}`}</p>
          <p className="profileP">{`Contacto: ${user.correo}`}</p>
          <a className="iniciarSesion" href="/">
            Cerrar sesion
          </a>
        </div>
      </div>
    </div>
  );
}

export default PaginaPerfil;
