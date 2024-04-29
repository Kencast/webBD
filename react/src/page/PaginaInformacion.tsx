import { user } from "./PaginaLogin";
import Comentario from "../components/Comentario";
import Boton from "../components/Boton";
import { useState, useEffect } from "react";
import { getData } from "../js/get";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import Mensaje from "../components/Mensaje";
import { useLocation } from "wouter";
import { post } from "../js/post";
import { eliminarArchivo } from "../js";
import Cargar from "../components/Cargar";

interface props {
  id: string;
}

interface obse {
  observacionid: number;
  usuarioid: number;
  fecha: string;
  taxonomia: any;
  usuarionombre: string;
  nombrecomun: string;
  latitud: number;
  longitud: number;
  rutaimagen: string;
  comentario: string;
}

interface identi {
  id: number;
  usuario: string;
  taxon: string;
  fecha: string;
}

function PaginaInformacion({ id }: props) {
  const [actual, setLocation] = useLocation();
  const [visible, setVisible] = useState(false);
  const [observacion, setObservacion] = useState<obse>({
    observacionid: 0,
    usuarioid: 0,
    fecha: "null",
    taxonomia: "null",
    usuarionombre: "null",
    nombrecomun: "null",
    latitud: 0,
    longitud: 0,
    rutaimagen: "null",
    comentario: "null",
  });
  const [identificaciones, setIdenficaciones] = useState([]);
  const taxonomia = ["", "", "", "", "", "", "", ""];
  const icono = new Icon({
    iconUrl: "https://img.icons8.com/fluency/48/marker.png",
    iconSize: [38, 38],
  });

  const format = (taxo: string) => {
    let t = taxo.split("/");
    for (let i = 1; i < t.length; i++) taxonomia[i - 1] = t[i];
  };

  const handle = async () => {
    console.log("me llamaron");
    const param = {
      id: observacion.observacionid,
    };
    try {
      const datos = await post(
        "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/observaciones/borrar",
        param
      );
      if (datos.respuesta > 0) {
        const res = await eliminarArchivo(observacion.rutaimagen);
        if (!res) return alert("No se pudo eliminar la imagen");
        setVisible(true);
      } else return alert("Error al eliminar la observacion");
    } catch (error) {
      console.log("Error al intentar borrar: ", error);
    }
  };

  const redirigir = () => {
    setLocation(`/misObservaciones`);
  };

  const handle2 = () => {
    setLocation(`/actualizarObservacion/${observacion.observacionid}`);
  };

  useEffect(function () {
    try {
      getData(
        "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/observaciones/getInfo/" +
          id
      ).then((datos) => {
        format(datos[0].taxonomia);
        if (datos[0].nombrecomun != null) taxonomia[7] = datos[0].nombrecomun;
        datos[0].taxonomia = taxonomia;
        setObservacion(datos[0]);
      });
      getData(
        "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/identificacion/getAll/" +
          id
      ).then((datos) => setIdenficaciones(datos));
    } catch (error) {
      console.log("Error al obtener informacion de la observacion: ", error);
    }
  }, []);

  return (
    <>
      {visible && (
        <Mensaje
          titulo="Listo"
          mensaje="Se elimino la observacion con exito"
          fun={redirigir}
          textAr="Volver a mis observaciones"
          textAb="Volver a observaciones"
          ruta2="/observaciones"
        />
      )}
      {!visible && observacion.rutaimagen == "null" && <Cargar />}
      {!visible && observacion.rutaimagen != "null" && (
        <div className="containerI">
          <div className="cardP box">
            <img className="imaInf" src={observacion.rutaimagen} />
            <div className="textContainerP">
              <p className="profileP">{`Id de la observacion: ${observacion.observacionid}`}</p>
              <p className="profileP">{`Reino: ${observacion.taxonomia[0]}`}</p>
              <p className="profileP">{`Filo: ${observacion.taxonomia[1]}`}</p>
              <p className="profileP">{`Clase: ${observacion.taxonomia[2]}`}</p>
              <p className="profileP">{`Orden: ${observacion.taxonomia[3]}`}</p>
              <p className="profileP">{`Familia: ${observacion.taxonomia[4]}`}</p>
              <p className="profileP">{`Genero: ${observacion.taxonomia[5]}`}</p>
              <p className="profileP">{`Especie: ${observacion.taxonomia[6]}`}</p>
              <p className="profileP">{`Nombre comun: ${observacion.taxonomia[7]}`}</p>
              <p className="profileP">{`Fecha: ${observacion.fecha}`}</p>
              <p className="profileP">{`Usuario: ${observacion.usuarionombre}`}</p>
              <p className="profileP">{`Comentario: ${observacion.comentario}`}</p>
              <MapContainer
                center={[observacion.latitud, observacion.longitud]}
                zoom={9}
              >
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[observacion.latitud, observacion.longitud]}
                  icon={icono}
                />
              </MapContainer>
              <Boton
                clase="iniciarSesion"
                texto="Agregar o actualizar identificación"
                ruta={`/agregarIdentificacion/${observacion.observacionid}`}
              />
              {observacion.usuarioid == user.id && (
                <button
                  className="iniciarSesion"
                  type="submit"
                  onClick={handle}
                >
                  {`Borrar Observación`}
                </button>
              )}
              {observacion.usuarioid == user.id && (
                <button
                  className="iniciarSesion"
                  type="submit"
                  onClick={handle2}
                >
                  {`Actualizar Observación`}
                </button>
              )}
            </div>
          </div>
          <div className="row box">
            {identificaciones.map((obj: identi) => {
              return (
                <div className="col-13" key={obj.id}>
                  <Comentario
                    usuario={obj.usuario}
                    fecha={obj.fecha}
                    taxon={obj.taxon}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default PaginaInformacion;
