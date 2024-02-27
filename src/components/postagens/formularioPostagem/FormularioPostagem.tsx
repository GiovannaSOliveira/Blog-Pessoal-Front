import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";

function FormularioPostagem() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    data: "",
    tema: null,
    usuario: null,
  });

  async function buscarPostagemPorId(id: string) {
    await buscar(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarTemaPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarTemas() {
    await buscar("/temas", setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
    if (id !== undefined) {
      buscarPostagemPorId(id);
      console.log(tema);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ postagem });

    if (id != undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert("Postagem atualizada com sucesso");
        retornar();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          alert("O token expirou, favor logar novamente");
          handleLogout();
        } else {
          alert("Erro ao atualizar a Postagem");
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        alert("Postagem cadastrada com sucesso");
        retornar();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          alert("O token expirou, favor logar novamente");
          handleLogout();
        } else {
          alert("Erro ao cadastrar a Postagem");
        }
      }
    }
  }

  const carregandoTema = tema.descricao === "";

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl font-playfair text-mustard font-semibold text-center my-8">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
        <div className="font-bebas flex flex-col gap-2">
          <label htmlFor="titulo" className="text-rosebud pl-4">
            Titulo da postagem
          </label>
          <input
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-purpur text-gray-500 text-left px-4
            focus:text-rosinha focus:border-rosebud 
            focus:outline-none rounded-full p-2"
          />
        </div>
        <div className="flex flex-col gap-2 font-bebas">
          <label htmlFor="titulo" className="text-rosebud pl-4 pt-3">Texto da postagem</label>
          <input
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-purpur text-gray-500 text-left px-4
            focus:text-rosinha focus:border-rosebud 
            focus:outline-none rounded-full p-2"
          />
        </div>
        <div className="flex flex-col gap-2 font-bebas">
          <p className="text-rosebud pl-4 pt-3">Tema da postagem</p>
          <select
            name="tema"
            id="tema"
            className="border-2 border-purpur text-gray-500 text-left px-4
            focus:text-rosinha focus:border-rosebud 
            focus:outline-none rounded-full p-2 font-bebas"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled className="font-bebas">
              Selecione um tema
            </option>
            {temas.map((tema) => (
              <>
                <option value={tema.id} className="font-bebas">{tema.descricao}</option>
              </>
            ))}
          </select>
        </div>
        <button
          disabled={carregandoTema}
          type="submit"
          className="rounded-full text-offwhite font-bold text-lg bg-rosebutton 
          hover:bg-rosebud w-1/2 py-2 mx-auto block"
        >
          {carregandoTema ? (
            <span>Carregando</span>
          ) : id !== undefined ? (
            "Editar"
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
    </div>
  );
}

export default FormularioPostagem;
