const SET_REVIEWER_ACTION = "SET_REVIEWER_ACTION";

export function setReviewer(data) {
  return {
    type: SET_REVIEWER_ACTION,
    payload: data
  };
}

export default function getReviewer(state = {}, { type, payload }) {
  switch (type) {
    case SET_REVIEWER_ACTION:
      return { ...state, ...payload };
    default:
      return state;
  }
}
