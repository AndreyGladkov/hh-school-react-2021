const SettingsActions = {
  UPDATE_LOGIN: '[Settings] Update Login in settings',
  UPDATE_REPO: '[Settings] Update Repo in settings',
  UPDATE_BLOCKLIST: '[Settings] Update blocklist in settings',
};

const AppActions = {
  UPDATE_SETTINGS: '[App] Update settings',
  LOAD_USER: '[App] Load user',
  LOAD_USER_SUCCESS: '[App] Load user SUCCESS',
  LOAD_USER_FAILURE: '[App] Load user FAILURE',
  LOAD_REVIEWER: '[App] Load reviewer',
  LOAD_REVIEWER_LIST: '[App] Load reviewer list',
  LOAD_REVIEWER_LIST_SUCCESS: '[App] Load reviewer list SUCCESS',
  LOAD_REVIEWER_LIST_FAILURE: '[App] Load reviewer list FAILURE',
  SET_HIDDEN_STATE: '[App] Set hidden state',
};

export const settingsActions = (type, data) => {
  switch (type) {
    case SettingsActions.UPDATE_LOGIN:
      return {
        type: SettingsActions.UPDATE_LOGIN,
        payload: data,
      };
    case SettingsActions.UPDATE_REPO:
      return {
        type: SettingsActions.UPDATE_REPO,
        payload: data,
      };
    case SettingsActions.UPDATE_BLOCKLIST:
      return {
        type: SettingsActions.UPDATE_BLOCKLIST,
        payload: data,
      };
    default:
      return null;
  }
};

export const appActions = (type, data) => {
  switch (type) {
    case AppActions.UPDATE_SETTINGS:
      return {
        type: AppActions.UPDATE_SETTINGS,
        payload: data,
      };
    case AppActions.SET_HIDDEN_STATE:
      return {
        type: AppActions.SET_HIDDEN_STATE,
        payload: data,
      };
    case AppActions.LOAD_USER:
      return {
        type: AppActions.LOAD_USER,
      };
    case AppActions.LOAD_USER_SUCCESS:
      return {
        type: AppActions.LOAD_USER_SUCCESS,
        payload: data,
      };
    case AppActions.LOAD_USER_FAILURE:
      return {
        type: AppActions.LOAD_USER_FAILURE,
      };
    case AppActions.LOAD_REVIEWER:
      return {
        type: AppActions.LOAD_REVIEWER,
        payload: data,
      };
    case AppActions.LOAD_REVIEWER_LIST:
      return {
        type: AppActions.LOAD_REVIEWER_LIST,
      };
    case AppActions.LOAD_REVIEWER_LIST_SUCCESS:
      return {
        type: AppActions.LOAD_REVIEWER_LIST_SUCCESS,
        payload: data,
      };
    case AppActions.LOAD_REVIEWER_LIST_FAILURE:
      return {
        type: AppActions.LOAD_REVIEWER_LIST_FAILURE,
      };
    default:
      return null;
  }
};

export default { SettingsActions, AppActions };
