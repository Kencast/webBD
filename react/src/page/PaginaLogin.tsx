import { useState } from "react";
import { post } from "../js/post";
import { useLocation } from "wouter";
import { getFetch } from "../js/get";

interface user {
  id: number;
  nombre: string;
  apellido: string;
  pais: string;
  correo: string;
  direccion: string;
  foto: string;
}

let user: user;

interface props {
  handle: any;
}

function PaginaLogin({ handle }: props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [country, setCountry] = useState("");
  const [adress, setAdress] = useState("");
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [actual, setLocation] = useLocation();

  const login = async function () {
    if (email.length < 5 || !email.includes("@"))
      return alert("Correo incorrecto");
    if (password.length < 1)
      return alert("La contrasea debe de ser de al menos 8 caracteres");
    const url =
      "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/user/login/";
    const parametros = {
      correo: email,
      contra: password,
    };
    try {
      const datos = await post(url, parametros);
      if (datos.respuesta <= 0) return alert("Correo o contraseña incorrecta");
      const perfil = await getFetch("https://randomuser.me/api/");
      console.log(perfil);
      user = {
        id: datos.respuesta,
        nombre: datos.nombre,
        apellido: datos.apellido,
        pais: datos.pais,
        correo: email,
        direccion: datos.direccion,
        foto: perfil.results[0].picture.large,
      };
      handle();
      setLocation("/principal/observaciones");
    } catch (error) {
      console.log("Error en login", error);
    }
  };

  const registrar = async function () {
    if (correo.length < 5 || !correo.includes("@"))
      return alert("Correo incorrecto");
    if (contra.length < 7)
      return alert("La contrasea debe de ser de al menos 8 caracteres");
    if (nombre.length < 2) return alert("Nombre invalido");
    if (country.length < 4) return alert("País invalido");
    if (apellido.length < 2) return alert("Apellido invalido");
    if (adress.length < 10) return alert("Direccion invalida");
    const url =
      "https://g772354e1c5d833-odsr3pvsmmg8oiiy.adb.sa-bogota-1.oraclecloudapps.com/ords/admin/user/registrar/";
    const parametros = {
      correo: correo,
      contra: contra,
      nombre: nombre,
      pais: country,
      direccion: adress,
      apellido: apellido,
    };
    try {
      const datos = await post(url, parametros);
      if (datos.respuesta < 0) return alert("El correo ya está ocupado");
      const perfil = await getFetch("https://randomuser.me/api/");
      user = {
        id: datos.respuesta,
        nombre: nombre,
        apellido: apellido,
        pais: country,
        correo: correo,
        direccion: adress,
        foto: perfil.results[0].picture.large,
      };
      handle();
      setLocation("/principal/observaciones");
    } catch (error) {
      console.log("Error en login", error);
    }
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
                <form action="" method="post" className="flip-card__form">
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
                  <button
                    type="button"
                    className="flip-card__btn"
                    onClick={login}
                  >
                    Empecemos!
                  </button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Registrarse</div>
                <form action="" method="post" className="flip-card__form">
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
                  <button
                    type="button"
                    className="flip-card__btn"
                    onClick={registrar}
                  >
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
export { user };
export default PaginaLogin;
