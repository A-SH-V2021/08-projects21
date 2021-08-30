import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);

  const fetching = async () => {
    
    setWaiting(false)
    setLoading(true);
    const response = await axios(url).catch((err) =>
      console.log(`error in get axios:`, err)
    );
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setWaiting(false);
        setLoading(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  function createMarkup(inner) {
    return {__html: `${inner}`};
  }

  useEffect(() => {
    fetching();
  }, []);
  return (
    <AppContext.Provider
      value={{ waiting, loading, questions, correct, index, error, modal,createMarkup }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
