interface props {
  rutaIma: string;
  texto: string;
  act: string;
}

function ItemCarru({ rutaIma, texto, act }: props) {
  const imaCarru = {
    paddingTop: "1rem",
    paddingBottom: "4rem",
  };

  const text1 = {
    color: "rgb(255, 255, 255)",
    fontFamily: "Roboto",
    fontStyle: "italic",
  };

  const ima = {
    width: "50rem",
    height: "30rem",
  };

  return (
    <div className={"carousel-item " + act}>
      <div style={imaCarru}>
        <img src={rutaIma} style={ima} />
        <div className="carousel-caption d-none d-md-block">
          <h1 style={text1}> {texto} </h1>
        </div>
      </div>
    </div>
  );
}

export default ItemCarru;
