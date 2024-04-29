import React, { useEffect, useState } from "react";
import Carta from "../components/Carta";
import Columna from "../components/Columna";
import { getData } from "../js/get";
import { user } from "./PaginaLogin";

interface Dato {
  id: number;
  ruta: string;
  taxon: string;
  usuario: string;
  fecha: string;
}

function PaginaMisObservaciones() {
  const [observations, setObservation] = useState([]);

  useEffect(function () {
    getData(
      "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/observaciones/mis/" +
        user.id
    ).then((datos) => setObservation(datos));
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
export default PaginaMisObservaciones;
