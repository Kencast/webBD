import React, { useEffect, useState } from "react";
import Carta from "../components/Carta";
import Columna from "../components/Columna";
import { getData } from "../js/get";

interface Dato {
  id: number;
  ruta: string;
  taxon: string;
  usuario: string;
  fecha: string;
}

function PaginaObservaciones() {
  const url =
    "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/observaciones/getAll/";
  const [observations, setObservation] = useState([]);

  useEffect(function () {
    getData(url).then((datos) => setObservation(datos));
  }, []);

  return (
    <div className="laCentracion obse">
      <div className="container text-center">
        <div className="row justify-content-start align-items-start">
          {observations.map((obj: Dato) => {
            return (
              <Columna
                key={obj.id}
                carta={
                  <Carta
                    id={obj.id}
                    imagen={obj.ruta}
                    taxon={obj.taxon}
                    usuario={obj.usuario}
                    fecha={obj.fecha}
                  />
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default PaginaObservaciones;
