import {ActionTypes} from '../constants/index'
const initialState = {
      movies: {
        Search:[],
        totalResults:0
      },
  };
  export const moviesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ActionTypes.GET_MOVIES_LIST:
        return { ...state, movies: payload };
      default:
        return state;
    }
  };