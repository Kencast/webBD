import Logo from "./Logo";

function Nav() {
  const myColor = {
    backgroundColor: "rgb(75, 204, 138)",
  };
  return (
    <nav className="navbar bg-body-tertiary" style={myColor}>
      <div className="container-fluid" style={myColor}>
        <Logo />
      </div>
    </nav>
  );
}

export default Nav;
