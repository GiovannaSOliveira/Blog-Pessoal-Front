import './Home.css';
import ListaPostagens from '../../components/postagens/listaPostagens/ListaPostagens';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import img from "../../assets/img/write.png";

function Home() {
    return (
        <>
        <div className="bg-purpur flex justify-center border-offwhite border-y-2">
          <div className='container grid grid-cols-2 text-white'>
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-5xl font-bold font-dm text-kind'>Seja bem vinde!</h2>
              <p className='text-xl text-offwhite font-playfair pb-5'>Expresse aqui seus pensamentos e opniões</p>
  
              <div className="flex justify-around gap-4">
              <ModalPostagem />
              <button className='rounded-full bg-offwhite text-rosebud text-xl font-bebas py-2 px-4'>Ver postagens</button>
            </div>
            </div>
  
            <div className="flex justify-center ">
              <img src={img} alt="" className='w-2/3 pb-5 border-5 border-offwhite' />
      
            </div>
          </div>
        </div>
        <ListaPostagens />
      </>
    );
}

export default Home;