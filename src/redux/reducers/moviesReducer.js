import {ActionTypes} from '../constants/index'
const initialState = {
      movies: {
        Search:[],
        totalResults:0
      },
      moviesDetail: {}
  };
  export const moviesReducer = (state = initialState.movies, { type, payload }) => {
    switch (type) {
      case ActionTypes.GET_MOVIES_LIST:
        return { ...state, movies: payload };
      default:
        return state;
    }
  };
  export const movieDetailsReducer = (state = initialState.moviesDetail, { type, payload }) => {
    switch (type) {
      case ActionTypes.GET_MOVIES_DETAILS:
        return { ...state,  ...payload };
      default:
        return state;
    }
  };
  