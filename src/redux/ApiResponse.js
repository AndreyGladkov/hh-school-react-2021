const SET_RESPONSE_ACTION = "SET_RESPONSE_ACTION";

export function setResponses(data) {
  return {
    type: SET_RESPONSE_ACTION,
    payload: data
  };
}

export default function getResponses(state = [], { type, payload }) {
  switch (type) {
    case SET_RESPONSE_ACTION:
      const lastElements = 4;
      return [ ...state.slice(Math.max(state.length - lastElements, 0)), payload ];
    default:
      return state;
  }
}
