import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { toastAlert } from "../../../util/toastAlert";

function FormularioTema() {
  const [tema, setTema] = useState<Tema>({} as Tema);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });

    console.log(JSON.stringify(tema));
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        toastAlert("Tema atualizado com sucesso", "sucesso");
        retornar();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlert("O token expirou, favor logar novamente", "info");
          handleLogout();
        } else {
          toastAlert("Erro ao atualizar o Tema", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        toastAlert("Tema cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlert("O token expirou, favor logar novamente", "info");
          handleLogout();
        } else {
          toastAlert("Erro ao cadastrado o Tema", "erro");
        }
      }
    }

    retornar();
  }

  function retornar() {
    navigate("/temas");
  }

  useEffect(() => {
    if (token === "") {
      toastAlert("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="container flex flex-col items-center justify-center mx-auto py-11">
      <h1 className="text-4xl text-mustard font-bold font-playfair text-center my-8">
        {id === undefined ? "Cadastre um novo tema" : "Editar tema"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao" className="pl-4 text-rosebutton font-bebas text-lg">
            Descrição do tema
            </label>
          <input
            type="text"
            placeholder="Descrição"
            name="descricao"
            className="border-2 border-purpur text-gray-500 text-left px-4
            focus:text-rosinha focus:border-rosebud 
            focus:outline-none rounded-full p-2 font-bold"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="rounded-full text-offwhite font-bebas text-lg bg-rosebutton 
          hover:bg-rosebud w-1/2 py-2 mx-auto block"
          type="submit"
        >
          {id === undefined ? "Cadastrar" : "Editar"}
        </button>
      </form>
    </div>
  );
}

export default FormularioTema;
