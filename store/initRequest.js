import { GET } from './actioncreators';
import { DEVICE_TYPES, GET_PROFILE_INFO, ADD_MESSAGE } from './actiontypes';
import { device_options, user_data, get_messages } from './endpoints';

// get initial data
export const InitRequest = async dispatch => {
  try {
    await dispatch(GET(user_data, GET_PROFILE_INFO));
    await dispatch(GET(device_options, DEVICE_TYPES));
    await dispatch(GET(get_messages, ADD_MESSAGE));
  } catch (err) {
    console.error(err);
  }
};
