import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import pho from "../../assets/img/pho.jpg";
import pfp from "../../assets/img/pfp.jpg";
import { toastAlert } from "../../util/toastAlert";

function Perfil() {
  let navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      toastAlert("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [usuario.token]);

  return (
    <div className="container mx-auto mt-4 rounded-2xl overflow-hidden">
      <img
        className="w-full h-72 object-cover border-b-8 border-offwhite"
        src={pho}
        alt="Capa do Perfil"
      />
      <img
        src={usuario.foto || pfp}
        alt={`Foto de perfil de ${usuario.nome}`}
        className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-offwhite relative z-10"
      />
      <div className="relative mt-[-6rem] h-72 flex flex-col bg-rosebud text-white text-2xl items-center justify-center mb-10 rounded-b-2xl">
        <p className="font-playfair font-bold text-3xl pb-2 text-kind">{usuario.nome} </p>
        <p className="font-bebas text-offwhite">{usuario.usuario}</p>
      </div>
    </div>
  );
}

export default Perfil;
