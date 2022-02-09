
import { GET_MOVIES_LIST, GET_MOVIESACTIONS_RECEIVED } from './constants';

export function getMoviesActions() {
	return {
		type: GET_MOVIES_LIST
	};
}
export function getMoviesAtionsReceived(params) {
	return {
		type: GET_MOVIESACTIONS_RECEIVED,
		params,
	};
}