const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export function loadUserSuccess(user) {
  return {
    type: LOAD_USER_SUCCESS,
    payload: user
  }
}

export function loadUserFailure(error) {
  return {
    type: LOAD_USER_FAILURE,
    payload: {error: error}
  }
}

export default function user(state = {}, {type, payload}) {
  switch (type) {
    case LOAD_USER_SUCCESS:
    case LOAD_USER_FAILURE:
      return {...payload};
    default:
      return state;
  }
}
