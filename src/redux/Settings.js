const SET_SETTINGS_ACTION = "SET_SETTINGS_ACTION";

export function setSettings(data) {
  return {
    type: SET_SETTINGS_ACTION,
    payload: data
  };
}

export default function getSettings(state = {}, { type, payload }) {
  switch (type) {
    case SET_SETTINGS_ACTION:
      return { ...state, ...payload };
    default:
      return state;
  }
}
