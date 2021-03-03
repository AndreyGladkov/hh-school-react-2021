import { SET_GITHUB_USERS } from "../types";

const initialState = null;

export function gitHubUsersReducer(state = initialState, action) {
    switch (action.type) {
        case SET_GITHUB_USERS:
            return action.payload;
        default:
            return state;
    }
}
