import "./Home.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const { nome, setNome } = useContext(UserContext);

  return (
    <div className="flex justify-center items-center">
      <div>
        <h2 className="text-mustard text-5xl my-4">Logar</h2>
        <h2 className="text-offwhite">Olá {nome}</h2>
        <Link
          to="/login"
          className="my-4 rounded bg-rosebutton hover:bg-rosebud
          text-white w-1/2 py-2 flex justify-center">
          Voltar
        </Link>
      </div>
    </div>
  );
}

export default Home