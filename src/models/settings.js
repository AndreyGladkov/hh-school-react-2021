const SET_SETTINGS = 'SET_SETTINGS';

export function setSettings(settings) {
  return {
    type: SET_SETTINGS,
    payload: settings
  };
}

export default function settings(state = {login: '', repo: '', blackList: []}, {type, payload}) {
  switch (type) {
    case SET_SETTINGS:
      return {...state, ...payload};
    default:
      return state;
  }
}
