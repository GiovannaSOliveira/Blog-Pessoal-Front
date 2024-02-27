import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toastAlert } from "../../util/toastAlert";

function Navbar() {
  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    toastAlert("Usuário deslogado com sucesso", "sucesso");
    navigate("/login");
  }

  let navbarComponent;

  if (usuario.token !== "") {
    navbarComponent = (
      <>
        <div className="w-full bg-purpur text-offwhite flex justify-center py-4">
          <div className="container flex justify-between m-3 text-lg">
            <div
              className="text-2xl font-playfair font-bold uppercase text-kind 
          hover:text-mustard hover:cursor-pointer pl-5"
            >
              <Link to="/home">Blog Pessoal</Link>
            </div>

            <div className="flex gap-4 font-bebas">
              <Link
                to="/home"
                className="hover:text-kind hover:cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="/postagens"
                className="hover:text-kind hover:cursor-pointer"
              >
                Postagens
              </Link>
              <Link
                to="/temas"
                className="hover:text-kind hover:cursor-pointer"
              >
                Temas
              </Link>
              <Link
                to="/cadastroTema"
                className="hover:text-kind hover:cursor-pointer"
              >
                Cadastrar temas
              </Link>
              <Link
                to="/perfil"
                className="hover:text-kind hover:cursor-pointer"
              >
                Perfil
              </Link>
              <Link
                to="/login"
                className="hover:text-kind hover:cursor-pointer"
              >
                Login
              </Link>
              <Link
                to=""
                onClick={logout}
                className="hover:text-kind hover:cursor-pointer"
              >
                Sair
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <>{navbarComponent}</>;
}

export default Navbar;
