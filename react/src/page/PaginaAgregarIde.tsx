import CampoTexto from "../components/CampoTexto";
import { useLocation } from "wouter";
import Mensaje from "../components/Mensaje";
import { useState } from "react";
import { post } from "../js/post";
import { user } from "./PaginaLogin";

interface props {
  id: string;
}

function PaginaAgregarIde({ id }: props) {
  const [taxon, setTaxon] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [actual, setLocation] = useLocation();
  const [men, setMen] = useState(false);
  const redirigir = () => {
    setLocation(`/observaciones`);
  };

  const agregar = async () => {
    if (taxon.length < 4) return alert("Taxon invalido");
    const parametros = {
      taxon: taxon.toLowerCase(),
      usuario: user.id,
      observacion: id,
    };
    try {
      const datos = await post(
        "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/identificacion/agregar",
        parametros
      );
      if (datos.respuesta == -1) return alert("El taxon no existe");
      if (datos.respuesta == -2) {
        setIsVisible(true);
        setMen(true);
      }
      if (datos.respuesta == -3)
        return alert("Error al insertar un taxon, vuelva a intentarlo");
      setIsVisible(true);
    } catch (error) {
      console.log("Error al agregar Identificacion", error);
    }
  };
  return (
    <>
      {isVisible && (
        <>
          {!men && (
            <Mensaje
              titulo="Listo"
              mensaje="Se agrego la identificacion con exito"
              ruta2="/misObservaciones"
              textAr="Regresar a observaciones"
              fun={redirigir}
              textAb="Regresar a mis observaciones"
            />
          )}
          {men && (
            <Mensaje
              titulo="Listo"
              mensaje="Se actualizo la identificacion con exito"
              ruta2="/misObservaciones"
              textAr="Regresar a observaciones"
              fun={redirigir}
              textAb="Regresar a mis observaciones"
            />
          )}
        </>
      )}
      {!isVisible && (
        <div className="centrarVert">
          <h1 className="text2">Agregue la informacion de la identificacion</h1>
          <div className="form-container obse">
            <form className="form">
              <CampoTexto
                titulo="Nombre del taxon (Separado por espacio)"
                valor={taxon}
                fun={setTaxon}
              />
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

export default PaginaAgregarIde;
