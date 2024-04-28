interface props {
  titulo: string;
  valor: any;
  fun: any;
}

function CampoTexto({ titulo, valor, fun }: props) {
  return (
    <div className="form-group">
      <label>{titulo}</label>
      <input
        required
        type="text"
        value={valor}
        onChange={(e) => fun(e.target.value)}
      />
    </div>
  );
}
export default CampoTexto;
