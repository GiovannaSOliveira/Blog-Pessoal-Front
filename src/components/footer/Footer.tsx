import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
  
  const { usuario, handleLogout } = useContext(AuthContext)

  let footerComponent

  let data = new Date().getFullYear()

  if(usuario.token !== '') {
    footerComponent = (
    <>
      <div className="flex justify-center bg-dark text-white">

        <div className="container flex flex-col items-center py-4">
          <p className="text-2xl font-bebas text-mustard">
            Blog Pessoal Generation | Copyright: {data}
          </p>
          <p className="text-lg font-bebas text-rosebud">Acesse nossas redes sociais</p>
          <div className="flex gap-2">
            <LinkedinLogo size={48} weight="bold" className="text-offwhite hover:text-rosebud hover:cursor-pointer"/>
            <InstagramLogo size={48} weight="bold" className="text-offwhite hover:text-rosebud hover:cursor-pointer"/>
            <GithubLogo size={48} weight="bold" className="text-offwhite hover:text-rosebud hover:cursor-pointer"/>
          </div>
        </div>
        
      </div>
    </>
    )
  }
  return (
    <>
      {footerComponent}
    </>
  )
}

export default Footer;
