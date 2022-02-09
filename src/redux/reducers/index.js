const initialState = {
    isFetching: false,
    currentPartnerIdConversation: null,
    result: [],
  };
  export default function conversationReducer(state = initialState, action) {
  
  switch (action.type) {
    case GET_MOVIES_ACTIONS:
        return Object.assign({}, state, {
          isFetching: true,
        });
  
      case GET_MOVIES_RECEIVED:
        return Object.assign({}, state, {
          isFetching: false,
          result: action.params.result,
        });
        case RESET:
            return initialState;
      
          default:
            return state;  

    }
  }