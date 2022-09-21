import { LOAD_REVIEWER_FAILURE, LOAD_REVIEWER_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_SUCCESS, SET_SETTINGS } from "./types"

export function loadReviewerSuccess(user) {
  return {
    type: LOAD_REVIEWER_SUCCESS,
    payload: user
  }
}

export function loadReviewerFailure(error) {
  return {
    type: LOAD_REVIEWER_FAILURE,
    payload: { error: error }
  }
}


export function setSettings(settings) {
  return {
    type: SET_SETTINGS,
    payload: settings
  };
}


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
