interface props {
  usuario: string;
  taxon: string;
  fecha: string;
}

function Comentario({ usuario, taxon, fecha }: props) {
  return (
    <div className="cardCo">
      <div className="imgCo"></div>
      <div className="textBoxCo">
        <div className="textContentCo">
          <p className="h1Co">{taxon}</p>
          <span className="spanCo">{fecha}</span>
        </div>
        <p className="pCo">{`Por ${usuario}`}</p>
        <div></div>
      </div>
    </div>
  );
}
export default Comentario;
