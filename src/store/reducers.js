import { LOAD_REVIEWER_FAILURE, LOAD_REVIEWER_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_SUCCESS, SET_SETTINGS } from "./types";

export function reviewer(state = {}, { type, payload }) {
  switch (type) {
    case LOAD_REVIEWER_SUCCESS:
    case LOAD_REVIEWER_FAILURE:
      return { ...payload };
    default:
      return state;
  }
}

export function settings(state = { login: '', repo: '', blackList: [] }, { type, payload }) {
  switch (type) {
    case SET_SETTINGS:
      return { ...state, ...payload };
    default:
      return state;
  }
}


export function user(state = {}, { type, payload }) {
  switch (type) {
    case LOAD_USER_SUCCESS:
    case LOAD_USER_FAILURE:
      return { ...payload };
    default:
      return state;
  }
}
