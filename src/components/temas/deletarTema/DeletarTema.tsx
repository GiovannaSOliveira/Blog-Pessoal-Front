import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";

function DeletarTema() {
  const [tema, setTema] = useState<Tema>({} as Tema);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
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
    navigate("/temas");
  }

  async function deletarTema() {
    try {
      await deletar(`/temas/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Tema apagado com sucesso");
    } catch (error) {
      alert("Erro ao apagar o Tema");
    }

    retornar();
  }
  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-mustard font-bold font-playfair text-center my-3 pt-5">
        Deletar tema
      </h1>

      <p className="text-center text-rosinha font-bebas  text-lg mb-6">
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>

      <div className="border-purpur flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-purpur text-offwhite font-bold font-playfair text-2xl">
          Tema
        </header>
        <p className="p-8 text-xl text-gray-700 bg-white h-full">{tema.descricao}</p>
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
            onClick={deletarTema}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
