import CampoTexto from "../components/CampoTexto";
import { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import {
  Icon,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import { subirArchivo } from "../js";
import { v4 } from "uuid";
import { post } from "../js/post";
import { user } from "./PaginaLogin";
import { useLocation } from "wouter";
import Mensaje from "../components/Mensaje";

function MapClick({ onClick }: any) {
  const map = useMapEvents({
    click: onClick,
  });
  return null;
}

function format(fecha: string) {
  const f = fecha.split("-");
  return `${f[2]}-${f[1]}-${f[0]}`;
}

function PaginaAgregarObs() {
  const [taxon, setTaxon] = useState("");
  const [licencia, setLicencia] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");
  const [dueno, setDueno] = useState("");
  const [pos, setPosition] = useState<LatLngTuple>([48.8, 2.3]);
  const [image, setImage] = useState(null);
  const [actual, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const mover = (e: LeafletMouseEvent) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  };
  const icono = new Icon({
    iconUrl: "https://img.icons8.com/fluency/48/marker.png",
    iconSize: [38, 38],
  });

  const agregar = async () => {
    if (!fecha) return alert("Coloque la fecha de la imagen");
    if (taxon.length < 4) return alert("Taxon invalido");
    if (licencia.length < 6) return alert("Licencia muy corta");
    if (comentario.length < 10) return alert("Comentario muy corto");
    if (dueno.length < 3) return alert("Dueño muy corto");
    if (image == null) return alert("Suba la imagen");
    const nombreTax = {
      taxon: taxon.toLowerCase(),
    };
    try {
      const infoTax = await post(
        "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/taxon/buscar",
        nombreTax
      );
      if (infoTax.respuesta == "null") {
        return alert("El taxon no existe, por favor revise");
      }
      const url: any = await subirArchivo(image, "imagenes/" + v4());
      if (url == "null") return alert("Error al subir archivo");
      const parametros = {
        fecha: format(fecha),
        taxon: infoTax.respuesta,
        licencia: licencia,
        comentario: comentario,
        dueno: dueno,
        ruta: url,
        usuario: user.id,
        latitud: pos[0],
        longitud: pos[1],
      };
      const datos = await post(
        "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/observaciones/subir",
        parametros
      );
      if (datos.respuesta > 0) setIsVisible(true);
      else return alert("Error al subir la informacion");
    } catch (error) {
      console.log("Error al consultar taxon o al insertar observacion:", error);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const isNotVisible = () => {
    setIsVisible(false);
  };
  return (
    <>
      {isVisible && (
        <Mensaje
          titulo="Listo"
          mensaje="Se agrego la observacion con exito"
          ruta2="/observaciones"
          textAr="Agregar otra observacion"
          fun={isNotVisible}
          textAb="Regresar a la pagina principal"
        />
      )}
      {!isVisible && (
        <div className="centrarVert">
          <h1 className="text2">Agregue la informacion de la imagen</h1>
          <div className="form-container obse">
            <form className="form">
              <CampoTexto
                titulo="Nombre del taxon (Separado por espacio)"
                valor={taxon}
                fun={setTaxon}
              />
              <CampoTexto
                titulo="Licencia de la imagen"
                valor={licencia}
                fun={setLicencia}
              />
              <div className="form-group">
                <label>Fecha de la imagen</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Selecione el lugar de la imagen</label>
                <MapContainer center={[48.8, 2.3]} zoom={9}>
                  <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={pos} icon={icono} />
                  <MapClick onClick={mover} />
                </MapContainer>
              </div>
              <div className="form-group">
                <label>Adjunte la imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <CampoTexto
                titulo="Nombre del autor de la imagen"
                valor={dueno}
                fun={setDueno}
              />
              <div className="form-group">
                <label>Comentario</label>
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
export default PaginaAgregarObs;
