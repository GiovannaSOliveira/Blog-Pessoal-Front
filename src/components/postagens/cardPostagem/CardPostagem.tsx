import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";

interface CardPostagemProps {
  post: Postagem;
}

function CardPostagem({ post }: CardPostagemProps) {
  return (
    <div className="border-offwhite border flex flex-col rounded overflow-hidden justify-between">
      <div>
        <div className="flex w-full bg-purpur py-2 px-4 items-center text-offwhite gap-4">
          <img
            src={post.usuario?.foto}
            className="h-12 rounded-full"
            alt="Foto de perfil"
          />
          <h3 className="text-lg font-dm font-bold text-center uppercase text-kind">
            {post.usuario?.nome}
          </h3>
        </div>
        <div className="p-4 text-slate-800 bg-offwhite">
          <h4 className="text-xl text-rosebud font-bebas">{post.titulo}</h4>
          <p className="pb-3 pl-3 font-crimson text-lg">{post.texto}</p>
          <p className="font-bebas text-m text-rosebutton">Tema: {post.tema?.descricao}</p>
          <p className="font-bebas text-mustard">
            Data:{" "}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(post.data))}
          </p>
        </div>
      </div>
      <div className="flex">
        <Link
          to={`/editarPostagem/${post.id}`}
          className="w-full text-offwhite bg-kind font-bebas text-lg
          hover:bg-mustard flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarPostagem/${post.id}`}
          className="text-offwhite bg-rosebutton font-bebas text-lg
        hover:bg-rosebud w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
