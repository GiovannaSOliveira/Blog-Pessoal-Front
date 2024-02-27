import FormularioPostagem from "../formularioPostagem/FormularioPostagem";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import "./ModalPostagem.css";

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button
            className="border rounded-full px-4 hover:bg-offwhite 
      hover:text-rosebud text-xl font-bebas"
          >
            Nova postagem
          </button>
        }
        modal
      >
        <div className="bg-fundo">
          <FormularioPostagem />
        </div>
      </Popup>
    </>
  );
}

export default ModalPostagem;
