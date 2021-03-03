import { createStore, combineReducers, applyMiddleware } from "redux";
import { reviewReducer } from "../reducers/reviewReducer";
import { gitHubUsersReducer } from "../reducers/gitHubUsersReducer";
import thunk from "redux-thunk";

export default createStore(
    combineReducers({
        review: reviewReducer,
        gitHubUsers: gitHubUsersReducer,
    }),
    applyMiddleware(thunk),
);
