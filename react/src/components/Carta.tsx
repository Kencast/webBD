interface props {
  imagen: string;
  taxon: string;
  usuario: string;
  fecha: string;
}

function Carta({ imagen, taxon, usuario, fecha }: props) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={imagen} />
      </div>
      <div className="category"> {taxon}</div>
      <div className="heading">
        <div className="author">
          By <span className="name">{usuario}</span> {fecha}
        </div>
      </div>
    </div>
  );
}

export default Carta;
