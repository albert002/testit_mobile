import { ADD_PROJECTS } from '../actiontypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case ADD_PROJECTS:
      return payload.result;
    default:
      return state;
  }
};
