const SET_AUTHOR_ACTION = "SET_AUTHOR_ACTION";

export function setAuthor(userData) {
  return {
    type: SET_AUTHOR_ACTION,
    payload: userData
  };
}

export default function getAuthor(state = {}, { type, payload }) {
  switch (type) {
    case SET_AUTHOR_ACTION:
      return { ...state, ...payload };
    default:
      return state;
  }
}
