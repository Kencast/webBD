import { useLocation } from "wouter";

interface props {
  clase: string;
  texto: string;
  ruta: string;
}

function Boton({ clase, texto, ruta }: props) {
  const [actual, setLocation] = useLocation();
  const handle = () => {
    setLocation(ruta);
  };

  return (
    <button className={clase} type="submit" onClick={handle}>
      {texto}
    </button>
  );
}

export default Boton;
