
import { ActionTypes } from '../constants/index';

export function getMoviesActions(movieList) {
	return {
		type: ActionTypes.GET_MOVIES_LIST,
		payload: movieList,
	};
}

export function getMoviesDetailsAction(details) {
	return {
		type: ActionTypes.GET_MOVIES_DETAILS,
		payload: details,
	};
}