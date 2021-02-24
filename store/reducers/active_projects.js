import { ADD_ACTIVE_PROJECTS, ADD_ACTIVE_PROJECT, DELETE_ACTIVE_PROJECT } from '../actiontypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case ADD_ACTIVE_PROJECTS:
      console.log("77777777", payload.result)
      return payload.result;
    case ADD_ACTIVE_PROJECT:
    console.log("<<<<<<", payload)
      return [...state, payload];
    case DELETE_ACTIVE_PROJECT:
      return state.filter(item => Number(item.cycle_id) !== Number(payload));
    default:
      return state;
  }
};
