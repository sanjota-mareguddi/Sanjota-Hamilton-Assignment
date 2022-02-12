import { combineReducers } from "redux";
import { moviesReducer } from "./moviesReducer";
const reducers = combineReducers({
  moviesList: moviesReducer
});
export default reducers;