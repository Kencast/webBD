interface props {
  clase: string;
  texto: string;
  fun: () => void;
}

function Boton({ clase, texto, fun }: props) {
  return (
    <button className={clase} type="submit" onClick={fun}>
      {texto}
    </button>
  );
}

export default Boton;
