import React, { useEffect, useState } from "react";
import Carta from "./Carta";
import Columna from "./Columna";
import { getData } from "../js/get";

function Observaciones() {
  const url =
    "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/observaciones/getAll/";
  const [observations, setObservation] = useState([]);

  useEffect(function () {
    getData(url).then((datos) => setObservation(datos));
  }, []);

  return (
    <div className="container text-center">
      <div className="row align-items-start">
        {observations.map((obj) => {
          return (
            <Columna
              key={obj.id}
              carta={
                <Carta
                  imagen={obj.imagen}
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
  );
}
export default Observaciones;
