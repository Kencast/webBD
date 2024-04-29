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
          rutaIma="https://firebasestorage.googleapis.com/v0/b/nature-d45bb.appspot.com/o/assets%2Fanimal1.png?alt=media&token=43d304c1-842a-4571-8fa4-3908ae9a7971"
          texto="Vanessa vulcania"
          act="active"
        />
        <ItemCarru
          rutaIma="https://firebasestorage.googleapis.com/v0/b/nature-d45bb.appspot.com/o/assets%2Fanimal2.png?alt=media&token=ac796742-8763-47b6-9e9f-093196c1905f"
          texto="Sagittarius serpentarius"
          act=""
        />
        <ItemCarru
          rutaIma="https://firebasestorage.googleapis.com/v0/b/nature-d45bb.appspot.com/o/assets%2Fanimal3.png?alt=media&token=abe1e42d-a29b-44ba-ac33-c8815ad0c055"
          texto="Lynx Lynx"
          act=""
        />
        <ItemCarru
          rutaIma="https://firebasestorage.googleapis.com/v0/b/nature-d45bb.appspot.com/o/assets%2Fanimal4.png?alt=media&token=c20dd5ff-3042-4cd5-b129-8d7a213b9575"
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
