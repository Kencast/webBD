import CampoTexto from "../components/CampoTexto";
import { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { Icon, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
//import AWS from "aws-sdk"; // Importa el SDK de AWS
//import "aws-sdk/dist/aws-sdk"; // Importa el SDK de AWS
import { user } from "./PaginaLogin";
import { S3 } from "aws-sdk";
import S3FileUpload from "react-s3";

function MapClick({ onClick }) {
  const map = useMapEvents({
    click: onClick,
  });
  return null;
}

function PaginaAgregarObs() {
  const [taxon, setTaxon] = useState("");
  const [licencia, setLicencia] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");
  const [dueno, setDueno] = useState("");
  const [pos, setPosition] = useState([48.8, 2.3]);
  const mover = (e: LeafletMouseEvent) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  };
  const icono = new Icon({
    iconUrl: "https://img.icons8.com/fluency/48/marker.png",
    iconSize: [38, 38],
  });
  let file: any;
  let url: string;
  const agregar = () => {
    if (!fecha) return alert("Ingrese una fecha");
    if (taxon.length < 4) return alert("Nombre de taxon invalido");
    if (comentario.length < 10) return alert("Comentario muy corto");
    if (licencia.length < 5) return alert("Licencia muy corta");
    if (dueno.length < 4) return alert("Dueño muy corto");
    //Validar taxon en la base de datos

    console.log("se subio");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    // file = event.target.files[0];
    const file = event.target.files[0];
    const config = {
      bucketName: "nature-bd-proyecto1",
      region: "us-east-2", // Ejemplo: 'us-east-1'
      accessKeyId: "AKIAU6GDWULSQK4ETIOL",
      secretAccessKey: "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",
    };

    S3FileUpload.uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  return (
    <div className="centrarVert">
      <h1 className="text2">Agregue la informacion de la imagen</h1>
      <div className="form-container obse">
        <form className="form">
          <CampoTexto titulo="Taxon" valor={taxon} fun={setTaxon} />
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
            <input type="file" onChange={handleFormSubmit} />
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
          <button type="button" className="form-submit-btn" onClick={agregar}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default PaginaAgregarObs;
