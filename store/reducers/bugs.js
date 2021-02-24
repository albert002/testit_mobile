import { ADD_BUG, REMOVE_BUG, ADD_BUG_LIST } from '../actiontypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case ADD_BUG_LIST:
      return payload.result;
    case ADD_BUG:
      return [...state, payload];
    case REMOVE_BUG:
      return state.filter(item => item.id === payload);
    default:
      return state;
  }
};
