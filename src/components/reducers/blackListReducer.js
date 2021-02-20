
const getBlackListInitialState = () => {
    const storedBlackList = JSON.parse(localStorage.getItem("blacklist"));
    return storedBlackList == null ? [] : storedBlackList;
}

const initialState = getBlackListInitialState();

export function addLoginToBlacklist(login) {
    return {
        type: "ADD_LOGIN_TO_BLACKLIST",
        payload: login
    }
}

export function removeLoginFromBlacklist(login) {
    return {
        type: "REMOVE_LOGIN_FROM_BLACKLIST",
        payload: login
    }
}

export default function blackListReducer(state = initialState, {type, payload}) {
    switch(type) {
        case "ADD_LOGIN_TO_BLACKLIST": {
            return [...state, payload.login];
        }
        case "REMOVE_LOGIN_FROM_BLACKLIST": {
            return state.filter(element => element !== payload.login)
        }
        default:
            return state;
    }
}