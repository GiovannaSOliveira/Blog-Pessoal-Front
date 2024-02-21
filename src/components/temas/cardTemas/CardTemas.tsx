import { Link } from "react-router-dom";
import Tema from "../../../models/Tema";

interface CardTemaProps {
  tema: Tema;
}

function CardTemas({ tema }: CardTemaProps) {
  return (
    <div className="border-purpur flex flex-col rounded-2xl overflow-hidden justify-between">
      <header className="py-2 px-6 bg-purpur text-offwhite font-bold font-playfair text-2xl">
        Tema
      </header>
      <p className="p-8 text-xl font-sofia bg-white text-gray-700 h-full">{tema.descricao}</p>
      <div className="flex">
        <Link
          to={`/editarTema/${tema.id}`}
          className="w-full text-offwhite bg-kind font-bebas text-lg
        hover:bg-mustard flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarTema/${tema.id}`}
          className="text-offwhite bg-rosebutton font-bebas text-lg
        hover:bg-rosebud w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardTemas;
