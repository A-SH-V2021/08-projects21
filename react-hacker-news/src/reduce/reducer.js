import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "../components/actions";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "GET_STORIES":
      return {
        ...state,
        loading: false,
        hits: action.payload.hits,
        nbPage: action.payload.nbPage,
      };
    default:
      throw new Error(`this error is from ${action.type}`);
  }
};
export default reducer;
