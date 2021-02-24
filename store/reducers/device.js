import { DEVICE_TYPES } from '../actiontypes';

export default (state = [], action) => {
  const payload = action.payload;
  switch (action.type) {
    case DEVICE_TYPES:
      return payload.result;
    default:
      return state;
  }
};
