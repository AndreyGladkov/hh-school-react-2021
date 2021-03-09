import { SET_REVIEW_DATA } from "../types";

const initialState = {
    developer: null,
    reviewer: null,
};

export function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case SET_REVIEW_DATA:
            return action.payload;
        default:
            return state;
    }
}
