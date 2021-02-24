import { ADD_MESSAGE, GET_MESSAGES, ADD_NEW_MESSAGE } from '../actiontypes';

export default (state = [], action) => {
  const payload = action.payload;
  console.log("????????????", payload)
  switch (action.type) {
    case ADD_MESSAGE: console.log("MMMMMMM", payload.result);return [...state, ...payload.result];
    case ADD_NEW_MESSAGE: console.log("new message", payload); return [payload, ...state ]
    case GET_MESSAGES:
      return state = [...state, payload.result];
      break;
    default:
      return state;
  }
};
