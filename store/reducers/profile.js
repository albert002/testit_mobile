import { GET_PROFILE_INFO, PROFILE_LOGOUT, UPDATE_PROFILE } from '../actiontypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_PROFILE_INFO:
      return payload.result;
    case UPDATE_PROFILE:
      return { ...state, ...payload };
    case PROFILE_LOGOUT:
      return null;
    default:
      return state;
  }
};
