import { combineReducers } from 'redux';
// data
import Profile from './profile';
import Projects from './projects';
import ActiveProjects from './active_projects';
import Device from './device';
import Bugs from './bugs';
import Messages from './messages';
//action
import { RESET_STORE } from '../actiontypes';

export default (state, action) => {
  if (action.type === RESET_STORE) {
    return undefined;
  }
  return RootReducer(state, action);
};

export const RootReducer = combineReducers({ Profile, Projects, ActiveProjects, Device, Bugs, Messages });
