
const getBlackListInitialState = () => {
    const storedBlackList = JSON.parse(localStorage.getItem("blacklist"));
    return storedBlackList == null ? [] : storedBlackList;
}

export default function blackListReducer(state = getBlackListInitialState(), action) {
    switch(action.type) {
        case "ADD_LOGIN_TO_BLACKLIST": {
            return [...state, action.payload.login];
        }
        case "REMOVE_LOGIN_FROM_BLACKLIST": {
            return state.filter(element => element !== action.payload.login)
        }
        default:
            return state;
    }
}