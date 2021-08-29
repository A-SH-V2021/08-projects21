import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movies = () => {
  const { error, loading, movies } = useGlobalContext();
 
  if (loading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="movies">
      {movies.map((item) => {
        let { imdbID, Poster, Title, Type, Year } = item;
        
        return (
          <Link to={`/details/${imdbID}`} className="movie" key={imdbID}>
            <article>
              <img src={Poster === "N/A" ? url : Poster} alt={Type} />
              <div className="movie-info">
                <h4>{Title}</h4>
                <p>{Year}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default Movies;
