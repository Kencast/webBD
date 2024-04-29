import Boton from "./Boton";

function FilaBotones() {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <Boton
        clase="botonNav"
        texto="Observaciones"
        ruta="/app/principal/observaciones"
      />
      <Boton
        clase="botonNav"
        texto="Mis observaciones"
        ruta="/app/principal/misObservaciones"
      />
      <Boton
        clase="botonNav"
        texto="Agregar Observacion"
        ruta="/app/principal/agregarObservacion"
      />
      <Boton clase="botonNav" texto="Mi perfil" ruta="/app/principal/perfil" />
    </div>
  );
}
export default FilaBotones;
