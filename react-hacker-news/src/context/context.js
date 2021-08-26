import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "../components/actions";
import reducer from "../reduce/reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  loading: true,
  hits: [],
  query: "react",
  page: 0,
  nbPage: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();

      dispatch({
        type: "GET_STORIES",
        payload: { hits: data.hits, nbPage: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemHandle = (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const searchHandle = (insideInput) => {
    dispatch({ type: `SEARCH_VALUE`, payload: insideInput });
  };
  useEffect(() => {
    fetchData(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query]);

  return (
    <AppContext.Provider value={{ ...state, removeItemHandle, searchHandle }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
