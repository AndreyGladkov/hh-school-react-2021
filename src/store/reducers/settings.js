import { DEFAULT_BLACKLIST, DEFAULT_REPO, DEFAULT_USER } from "../../consts";
import { ADD_BLACKLIST, CLEAR_BLACKLIST, REMOVE_BLACKLIST, SET_REPO, SET_USER } from "../actions";

const settings = (state = { repo: DEFAULT_REPO, user: DEFAULT_USER, blacklist: DEFAULT_BLACKLIST }, action) => {
    switch (action.type) {
        case SET_REPO:
            state.repo = action.payload;
            return state;
        case ADD_BLACKLIST:
            let i = state.blacklist.indexOf(action.payload);
            if (i < 0) {
                state.blacklist.push(action.payload);
            }
            return state;
        case REMOVE_BLACKLIST:
            let v = state.blacklist.indexOf(action.payload);
            if (v >= 0) {
                state.blacklist.splice(v, 1);
            }
            return state;
        case CLEAR_BLACKLIST:
            state.blacklist = [];
            return state;
        case SET_USER:
            state.user = action.payload;
            return state;
        default:
            return state
    }
}

export default settings