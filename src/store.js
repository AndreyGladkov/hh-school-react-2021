import { createStore, combineReducers, applyMiddleware } from "redux";
import blackListReducer from "./components/reducers/blackListReducer";
import { selectedRepoReducer } from "./components/reducers/selectedRepoReducer";
import { githubUserDataReducer } from "./components/reducers/githubUserDataReducer";
import { loggingMiddleware } from "./components/middleware/loggingMiddleware";
import asyncMiddleware from "./components/middleware/asyncMiddleware";

const rootReducer = combineReducers({
    blacklist: blackListReducer,
    selectedRepo: selectedRepoReducer,
    githubUserData: githubUserDataReducer,
});

export default createStore(
    rootReducer,
    applyMiddleware(loggingMiddleware, asyncMiddleware)
);
