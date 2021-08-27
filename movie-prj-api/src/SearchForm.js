import React from "react";
import { useGlobalContext } from "./context";
const SearchForm = () => {
  return (
    <form className="search-form">
      <h2>serach</h2>
      <input type="text" className="form-input" />
      <p className='error'>error</p>
    </form>
  );
};

export default SearchForm;
