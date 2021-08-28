import React, { useState, useContext, useEffect } from "react";
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}`;
console.log(API_ENDPOINT);
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("starwars");

  // console.log(movies);

  const fetchMovies = async (url) => {
    setLoading(true);
    try {
      const fullUrl = `${url}&s=${query}`;
      let response = await fetch(fullUrl);
      let data = await response.json();
      console.log(data);
      if (data.Response) {
        setMovies(data.Search);
       
        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: data.Error });
      }
      setLoading(false);
    } catch (error) {
      console.log(`fetch error:${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(API_ENDPOINT);
  }, [query]);

  return (
    <AppContext.Provider value={{ loading, movies, error, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
