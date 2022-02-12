
import { ActionTypes } from '../constants/index';

export function getMoviesActions(movieList) {
	return {
		type: ActionTypes.GET_MOVIES_LIST,
		payload: movieList,
	};
}