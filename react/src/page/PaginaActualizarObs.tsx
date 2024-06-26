import CampoTexto from "../components/CampoTexto";
import { useLocation } from "wouter";
import Mensaje from "../components/Mensaje";
import { useState } from "react";
import { post } from "../js/post";

interface props {
  id: string;
}

function PaginaActualizarObs({ id }: props) {
  const [taxon, setTaxon] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [actual, setLocation] = useLocation();
  const [comentario, setComentario] = useState("");
  const redirigir = () => {
    setLocation(`/observaciones`);
  };

  const agregar = async () => {
    if (taxon == "" && comentario == "")
      return alert("Complete el campo que desea actualizar");
    if (taxon != "" && taxon.length < 4) return alert("Taxon invalido");
    if (comentario.length < 10 && comentario != "")
      return alert("Comentario muy corto");
    const parametros = {
      id: id,
      taxon: taxon == "" ? "null" : taxon.toLowerCase(),
      comentario: comentario == "" ? "null" : comentario,
    };
    try {
      const datos = await post(
        "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/observaciones/actualizar",
        parametros
      );
      if (datos.respuesta > 0) setIsVisible(true);
      else if (datos.respuesta == -1) return alert("El taxon no existe");
      else return alert("Error al actualizar");
    } catch (error) {
      console.log("Error al actualizar la observacion: ", error);
    }
  };
  return (
    <>
      {isVisible && (
        <Mensaje
          titulo="Listo"
          mensaje="Se actualizo la observacion con exito"
          ruta2="/misObservaciones"
          textAr="Regresar a observaciones"
          fun={redirigir}
          textAb="Regresar a mis observaciones"
        />
      )}
      {!isVisible && (
        <div className="centrarVert">
          <h1 className="text2">Agregue la información que desea actualizar</h1>
          <div className="form-container obse">
            <form className="form">
              <CampoTexto
                titulo="Nuevo nombre del taxon (Separado por espacio)"
                valor={taxon}
                fun={setTaxon}
              />
              <div className="form-group">
                <label>Nuevo comentario</label>
                <textarea
                  required
                  cols={50}
                  rows={10}
                  id="textarea"
                  name="textarea"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                >
                  {" "}
                </textarea>
              </div>
              <button
                type="button"
                className="form-submit-btn"
                onClick={agregar}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default PaginaActualizarObs;
