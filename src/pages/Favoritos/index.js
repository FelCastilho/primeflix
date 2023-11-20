import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';

function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");

        setFilmes(JSON.parse(minhaLista) || [])
    })

    //Recebendo item via ID por params
    function excluirFilme(id){
        //Retornando todos os itens que tem o ID diferente do que foi clicado
        let filtroFilmes = filmes.filter((item) =>{
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes))
    }

    return(
        <div className='meus-filmes'>
            
            <h1>Meus Filmes</h1>
            
            {filmes.length === 0 && <span>Você ainda não tem nenhum filme salvo! </span>}

            <ul>
                {filmes.map((item) =>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>

                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;