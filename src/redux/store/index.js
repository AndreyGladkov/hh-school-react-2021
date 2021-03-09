import { createStore, combineReducers, applyMiddleware } from "redux";
import { reviewReducer } from "../reducers/reviewReducer";
import { gitHubUsersReducer } from "../reducers/gitHubUsersReducer";
import { settingsReducer } from "../reducers/settingsReducer";
import { localStorageMiddleware } from "../middlewares/localStorageMiddleware";
import thunk from "redux-thunk";

const setInitialState = () => {
    if (localStorage.getItem("settings") !== null) {
        const settings = JSON.parse(localStorage.getItem("settings"));
        return { settings };
    }
};

export default createStore(
    combineReducers({
        settings: settingsReducer,
        review: reviewReducer,
        gitHubUsers: gitHubUsersReducer,
    }),
    setInitialState(),
    applyMiddleware(thunk, localStorageMiddleware),
);
