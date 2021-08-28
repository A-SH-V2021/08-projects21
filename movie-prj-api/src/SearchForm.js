import React from "react";
import { useGlobalContext } from "./context";
const SearchForm = () => {
  const { error, query, setQuery } = useGlobalContext();
  return (
    <form className="search-form">
      <h2>serach</h2>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {error.show && <p className="error">{error.msg}</p>}
    </form>
  );
};

export default SearchForm;
