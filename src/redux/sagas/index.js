import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

  function* getConversationsFetch() {
    try {
      const response = yield sendRequest({
        url: `${constants.API.ROOT}${constants.API.ACTIONS.CONVERSATION}`,
        method: constants.API.METHODS.GET,
      });
  
      yield put(
        conversationActions.getMoviesAtionsReceived({
          result: response.result,
        })
      );
    } catch (e) {
      yield put(
        conversationActions.getMoviesAtionsReceived({
          result: [],
        })
      );
      toast.error(constants.LABELS.MAIN.GLOBAL_ERROR);
    }
  }

  const sagas = [
    takeLatest(GET_MOVIES_LIST, getConversationsFetch)
  ];
  
  export default sagas;
  