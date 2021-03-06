import { SET_SETTINGS } from "../types";

const initialState = {
    login: "",
    repo: "",
    blacklist: "",
};

export function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SETTINGS:
            return action.payload;
        default:
            return state;
    }
}
