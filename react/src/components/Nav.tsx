import FilaBotones from "./FilaBotones";

interface props {
  mostrar: boolean;
}

function Nav({ mostrar }: props) {
  const myColor = {
    backgroundColor: "rgb(75, 204, 138)",
    padding: "10px",
    display: "flex",
    alignItems: "center",
  };
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid" style={myColor}>
        <a className="navbar-brand" href="#">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nature-d45bb.appspot.com/o/assets%2Flogo.png?alt=media&token=430769a6-48f1-4eb3-8aa1-b1258d71173a"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          Nature
        </a>
        {mostrar && <FilaBotones />}
      </div>
    </nav>
  );
}

export default Nav;
