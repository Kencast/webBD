import ItemCarru from "./ItemCarru";

function Carrucel() {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      </ol>
      <div className="carousel-inner">
        <ItemCarru
          rutaIma="./src/assets/animal1.png"
          texto="Vanessa vulcania"
          act="active"
        />
        <ItemCarru
          rutaIma="./src/assets/animal2.png"
          texto="Sagittarius serpentarius"
          act=""
        />
        <ItemCarru
          rutaIma="./src/assets/animal3.png"
          texto="Lynx Lynx"
          act=""
        />
        <ItemCarru
          rutaIma="./src/assets/animal4.png"
          texto="Mobula birostris"
          act=""
        />
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Carrucel;
