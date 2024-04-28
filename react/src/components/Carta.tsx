import { useLocation } from "wouter";

interface props {
  id: number;
  imagen: string;
  taxon: string;
  usuario: string;
  fecha: string;
}

function Carta({ id, imagen, taxon, usuario, fecha }: props) {
  const [actual, setLocation] = useLocation();
  return (
    <div className="card">
      <img className="card-image" src={imagen} />
      <a className="category" onClick={() => setLocation("/" + id)}>
        {taxon}
      </a>
      <div className="heading">
        <div className="author">
          By <span className="name">{usuario}</span> {fecha}
        </div>
      </div>
    </div>
  );
}

export default Carta;
