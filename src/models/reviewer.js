const LOAD_REVIEWER_SUCCESS = 'LOAD_REVIEWER_SUCCESS';
const LOAD_REVIEWER_FAILURE = 'LOAD_REVIEWER_FAILURE';

export function loadReviewerSuccess(user) {
  return {
    type: LOAD_REVIEWER_SUCCESS,
    payload: user
  }
}

export function loadReviewerFailure(error) {
  return {
    type: LOAD_REVIEWER_FAILURE,
    payload: {error: error}
  }
}

export default function reviewer(state = {}, {type, payload}) {
  switch (type) {
    case LOAD_REVIEWER_SUCCESS:
    case LOAD_REVIEWER_FAILURE:
      return {...payload};
    default:
      return state;
  }
}
