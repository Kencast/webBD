interface props {
  rutaIma: string;
  texto: string;
  act: string;
}

function ItemCarru({ rutaIma, texto, act }: props) {
  return (
    <div className={"carousel-item " + act}>
      <div className="imaCarru">
        <img src={rutaIma} />
        <div className="carousel-caption d-none d-md-block">
          <h1 className="text1"> {texto} </h1>
        </div>
      </div>
    </div>
  );
}

export default ItemCarru;
