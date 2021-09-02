import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  Science:{
    Computers:18,
    Mathematics:19
  },
  Animals:27,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";
let url;
const tmpURL =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const fetching = async () => {
    setWaiting(false);
    setLoading(true);
    const response = await axios(tmpURL).catch((err) =>
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
    return { __html: `${inner}` };
  }

  const nextQueston = () => {
    setIndex((prevIndex) => {
      const index = prevIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
      return index;
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldValue) => oldValue + 1);
    }
    nextQueston();
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setCorrect(0);
    setWaiting(true);
    setModal(false);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);

    setQuiz({ ...quiz, [name]: value });
    console.log(quiz);
  };
  const handleSubmit = (e) => {
    const {category}=quiz
    e.preventDefault();
    // const tmpURL = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy";
    url = `${API_ENDPOINT}amount=${quiz.amount}&category=${table[category]}&difficulty=${quiz.difficulty}&type=multiple`;
    fetching(url)
  };

  // useEffect(() => {
  //   fetching();
  // }, []);
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        correct,
        index,
        error,
        modal,
        createMarkup,
        nextQueston,
        checkAnswer,
        closeModal,
        handleSubmit,
        handleChange,
        quiz,
      }}
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
