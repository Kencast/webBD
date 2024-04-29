import Boton from "./Boton";

function FilaBotones() {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <Boton
        clase="botonNav"
        texto="Observaciones"
        ruta="/principal/observaciones"
      />
      <Boton
        clase="botonNav"
        texto="Mis observaciones"
        ruta="/principal/misObservaciones"
      />
      <Boton
        clase="botonNav"
        texto="Agregar Observacion"
        ruta="/principal/agregarObservacion"
      />
      <Boton clase="botonNav" texto="Mi perfil" ruta="/principal/perfil" />
    </div>
  );
}
export default FilaBotones;
