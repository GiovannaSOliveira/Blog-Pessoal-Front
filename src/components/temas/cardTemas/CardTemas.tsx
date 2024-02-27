import { Link } from "react-router-dom";
import Tema from "../../../models/Tema";
import Masonry from "react-masonry-css";

interface CardTemaProps {
  tema: Tema;
}

function CardTemas({ tema }: CardTemaProps) {
  return (
    <Masonry
    breakpointCols={{ default: 3, 1100: 2, 7000: 1 }}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
  >
    <div className="border border-offwhite flex flex-col rounded-2xl overflow-hidden justify-between">
      <header className="py-2 px-6 bg-purpur text-kind font-bold font-dm text-2xl">
        Tema
      </header>
      <p className="p-8 text-2xl font-crimson bg-white text-gray-700 h-full">{tema.descricao}</p>
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
    </Masonry>
  );
}

export default CardTemas;
