import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="w-full bg-purpur text-white flex justify-center py-4">
        <div className="container flex justify-between m-3 text-lg">
          <div
            className="text-3x1 font-playfair font-bold uppercase text-kind 
          hover:text-mustard hover:cursor-pointer pl-5"
          >
            <Link to="/home">Blog Pessoal</Link>
          </div>

          <div className="flex gap-4 font-bebas">
            <Link
              to="/home"
              className="text-offwhite hover:text-kind hover:cursor-pointer">
              Home
            </Link>
            <div className="text-offwhite hover:text-kind hover:cursor-pointer">
              Postagens
            </div>
            <Link
              to="/temas"
              className="text-offwhite hover:text-kind hover:cursor-pointer">
              Temas
            </Link>
            <Link
              to="/cadastroTema"
              className="text-offwhite hover:text-kind hover:cursor-pointer">
              Cadastrar temas
            </Link>
            <div className="text-offwhite hover:text-kind hover:cursor-pointer">
              Perfil
            </div>
            <Link
              to="/login"
              className="text-offwhite hover:text-kind hover:cursor-pointer">
              Login
            </Link>
            <div className="text-offwhite hover:text-kind hover:cursor-pointer">
              Sair
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
