import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";

function DeletarPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        alert("O token expirou, favor logar novamente");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    navigate("/postagens");
  }

  async function deletarPostagem() {
    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Postagem apagada com sucesso");
    } catch (error) {
      alert("Erro ao apagar a Postagem");
    }

    retornar();
  }
  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-mustard font-bold font-playfair text-center my-3 pt-5">
        Deletar postagem
      </h1>

      <p className="text-center text-rosinha font-bebas  text-lg mb-6">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className="border border-purpur flex flex-col rounded-2xl overflow-hidden justify-between">
        <div className="flex w-full bg-purpur py-2 px-4 items-center text-offwhite gap-4">
          <img
            src={postagem.usuario?.foto}
            className="h-12 rounded-full"
            alt="Foto de perfil"
          />
          <h3 className="text-lg font-bold text-center uppercase font-dm text-kind">
            {postagem.usuario?.nome}
          </h3>
        </div>
        <div className="p-4 bg-offwhite">
          <p className="text-xl h-full font-bebas font-semibold text-rosebud uppercase">{postagem.titulo}</p>
          <p className="font-crimson text-slate-800 pl-4">{postagem.texto}</p>
        </div>
        <div className="flex">
          <button
            className='w-full text-offwhite bg-kind font-bebas text-lg
            hover:bg-mustard flex items-center justify-center py-2'
            onClick={retornar}
          >
            Não
          </button>
          <button
           className="text-offwhite bg-rosebutton font-bebas text-lg
           hover:bg-rosebud w-full flex items-center justify-center"
            onClick={deletarPostagem}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;
