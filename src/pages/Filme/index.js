import { useEffect, useState } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import api from "../../services/api";

import './filme-info.css';

export default function Filmes(){
  const navigation = useNavigate();
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadFilmes(){

      await api.get(`/movie/${id}`,{
        params:{
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
        }
      })
      .then((response) =>{
        //Para caso encontre o filme
        setFilme(response.data);
        setLoading(false);
      })
      .catch(() =>{
        //Se não encontrar o filme (Enviando para a Home)
        navigation("/", { replace: true })
      })
    }

    loadFilmes();

    //Desmontando o componente
    return() => {}

  }, [id, navigation])

  function salvarFilme(){

    const minhaLista = localStorage.getItem('@primeflix');

    //Pegando os itens da lista, caso ela exita
    let filmesSalvos = JSON.parse(minhaLista) || [];

    //Verificando se o item já esta no storage
    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

    if(hasFilme){
      alert('Esse filme já está na lista');
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));

    alert('Filme salvo com sucesso!')
  }

  if(loading){
    return(
      <div className="filmes-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }
  return(

    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}  alt={filme.title}/>

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average.toFixed(1)}/10</strong>

      <div className="area-buttons"> 

        <button onClick={salvarFilme}>Salvar</button>

        <button>
          <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>trailer</a>
        </button>

      </div>
    </div>
  )
}