import { useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";

export default function Filme() {
  const [filme, setFilme] = useState({});
  const params = useParams().id;

  // Requisição para as informações do filme
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDUxNGE2YWI0Yjg4ZGY0NWZmZTNmNWQ4Nzk2NzZkNiIsInN1YiI6IjY0ZjAwM2QxY2FhNTA4MDBlOTUxNjZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59SDvErSwX-F6-slLHwL3w1vtXW36Ks0baQ7jBs54IU";

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const url = `https://api.themoviedb.org/3/movie/${params}?append_to_response=credits&language=pt-BR`;
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => setFilme(data))
      .catch((error) => console.error(error));
  });

  if (filme.genres === undefined)
    return (
      <div>
        <Menu />
      </div>
    );

  return (
    <div>
      <Menu />
      <div className="container bg-white shadow p-4 mx-auto">
        <h3 className="text-5xl mb-2 font-semibold text-center">
          {filme.title}
        </h3>
        <p className="text-3xl font-light text-center">{filme.tagline}</p>
        <img
          className="m-auto mt-6 w-2/6"
          src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
        />
        <div className="text-center mt-2">
          <StarRatings
            rating={filme.vote_average}
            numberOfStars={10}
            starDimension="32px"
            starSpacing="5px"
            starRatedColor="red"
          />
        </div>
        <p className="text-5xl font-semibold text-center mt-6 mb-2">Sinopse</p>
        <p className="text-xl font-medium text-justify">{filme.overview}</p>
        <p className="text-5xl font-semibold text-center mt-6 mb-2">
          Informações Gerais
        </p>
        <div className="text-xl font-medium text-center">
          <ul>
            <li>
              <a className="font-semibold">Data de Lançamento:</a>{" "}
              {filme.release_date}
            </li>
            <li>
              <a className="font-semibold">Duração:</a> {filme.runtime} minutos
            </li>
            <li>
              <a className="font-semibold">Generos:</a>
              {filme.genres.map((gen) => (
                <a key={gen.id}>{" " + gen.name}</a>
              ))}
            </li>
          </ul>
        </div>
        <p className="text-5xl font-semibold text-center mt-6 mb-2">Atores</p>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {filme.credits.cast.map((actor) => (
            <div key={actor.id}>
              <a href="/">
                <img
                  src={"https://image.tmdb.org/t/p/w500/" + actor.profile_path}
                />
                <h3 className="text-2xl font-semibold text-center">
                  {actor.name}
                </h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
