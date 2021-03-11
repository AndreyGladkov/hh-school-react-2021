import { combineReducers } from 'redux';
import stateActions from './main.actions';

const settingsState = { login: '', repo: '', blocklist: [] };

const appState = {
  settings: settingsState,
  user: {},
  reviewer: {},
  reviewerList: [],
  isHidden: false,
  loading: false,
  loaded: false,
  history: [],
};

export const initialState = { settings: settingsState, app: appState };

const settingsReducer = (state = settingsState, action) => {
  switch (action.type) {
    case stateActions.SettingsActions.UPDATE_LOGIN:
      return { ...state, login: action.payload };
    case stateActions.SettingsActions.UPDATE_REPO:
      return { ...state, repo: action.payload };
    case stateActions.SettingsActions.UPDATE_BLOCKLIST:
      return {
        ...state,
        blocklist: action.payload.split(',').map((user) => user.trim()),
      };
    default:
      return state;
  }
};

const appReducer = (state = appState, action) => {
  switch (action.type) {
    case stateActions.AppActions.LOAD_USER:
      return { ...state, loading: true };
    case stateActions.AppActions.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.payload,
      };
    case stateActions.AppActions.LOAD_USER_FAILURE:
      return { ...state, loading: false, loaded: false };
    case stateActions.AppActions.LOAD_REVIEWER:
      return { ...state, reviewer: action.payload };
    case stateActions.AppActions.LOAD_REVIEWER_LIST:
      return { ...state, loading: true };
    case stateActions.AppActions.LOAD_REVIEWER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        reviewerList: action.payload,
      };
    case stateActions.AppActions.LOAD_REVIEWER_LIST_FAILURE:
      return { ...state, loading: false, loaded: false };
    case stateActions.AppActions.SET_HIDDEN_STATE:
      return { ...state, isHidden: action.payload };
    case stateActions.AppActions.UPDATE_SETTINGS:
      return { ...state, settings: action.payload };
    default:
      return state;
  }
};

const mainReducer = combineReducers({
  settings: settingsReducer,
  app: appReducer,
});

export default mainReducer;
