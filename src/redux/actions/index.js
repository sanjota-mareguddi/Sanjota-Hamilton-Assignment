
import { GET_MOVIES_LIST } from '../constants/index';

export function getMoviesActions(movieList) {
	return {
		type: GET_MOVIES_LIST,
		payload: movieList,
	};
}