import { useLocation } from "wouter";

interface props {
  titulo: string;
  mensaje: string;
  fun: () => void;
  textAr: string;
  ruta2: string;
  textAb: string;
}

function Mensaje({ titulo, mensaje, fun, textAr, ruta2, textAb }: props) {
  const [actual, setLocation] = useLocation();
  const handle2 = () => {
    setLocation(ruta2);
  };
  return (
    <div className="mensajeA">
      <div className="cardM">
        <div className="headerM">
          <div className="imageM">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#000000"
                  d="M20 7L9.00004 18L3.99994 13"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="contentM">
            <span className="titleM">{titulo}</span>
            <p className="messageM">{mensaje}</p>
          </div>
          <div className="actionsM">
            <button type="button" className="historyM" onClick={fun}>
              {textAr}
            </button>
            <button type="button" className="trackM" onClick={handle2}>
              {textAb}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mensaje;
