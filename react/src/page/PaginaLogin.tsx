import { useState } from "react";

function PaginaLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [country, setCountry] = useState("");
  const [adress, setAdress] = useState("");
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");

  const login = () => {
    if (email.length < 5 || !email.includes("@"))
      return alert("Correo incorrecto");
    if (password.length < 7)
      return alert("La contrasea debe de ser de al menos 8 caracteres");
    //Base de datos
  };
  const registrar = () => {
    if (correo.length < 5 || !correo.includes("@"))
      return alert("Correo incorrecto");
    if (contra.length < 7)
      return alert("La contrasea debe de ser de al menos 8 caracteres");
    if (nombre.length < 2) return alert("Nombre invalido");
    if (country.length < 6) return alert("País invalido");
    if (apellido.length < 2) return alert("Apellido invalido");
    if (adress.length < 10) return alert("Direccion invalida");
    //Validacion bases de datos
    //meter en base de datos
  };
  return (
    <div className="centrarVert">
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input className="toggle" type="checkbox" />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">Iniciar sesión</div>
                <form action="" className="flip-card__form">
                  <input
                    type="email"
                    placeholder="Correo"
                    name="email"
                    className="flip-card__input"
                    value={email}
                    id="emailIS"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    className="flip-card__input"
                    id="passwordIS"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="flip-card__btn" onClick={login}>
                    Empecemos!
                  </button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Registrarse</div>
                <form action="" className="flip-card__form">
                  <input
                    type="name"
                    placeholder="Nombre"
                    className="flip-card__input"
                    id="nameR"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <input
                    type="name"
                    placeholder="Apellido"
                    className="flip-card__input"
                    id="firstNameR"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                  <input
                    type="name"
                    placeholder="País"
                    className="flip-card__input"
                    id="countryR"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <input
                    type="name"
                    placeholder="Dirección"
                    className="flip-card__input"
                    id="adressR"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Correo"
                    name="email"
                    className="flip-card__input"
                    id="emailR"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    className="flip-card__input"
                    id="passwordR"
                    value={contra}
                    onChange={(e) => setContra(e.target.value)}
                  />
                  <button className="flip-card__btn" onClick={registrar}>
                    Confirmar!
                  </button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PaginaLogin;
