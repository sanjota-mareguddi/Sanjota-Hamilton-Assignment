import { combineReducers } from "redux";
import { moviesReducer,movieDetailsReducer } from "./moviesReducer";
const reducers = combineReducers({
  moviesList: moviesReducer,
  movieDetails:movieDetailsReducer
});
export default reducers;