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
            src="./src/assets/logo.png"
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
