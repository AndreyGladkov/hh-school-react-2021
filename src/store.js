import { createStore, combineReducers } from "redux";
import blackListReducer from "./components/reducers/blackListReducer";
import { selectedRepoReducer } from "./components/reducers/selectedRepoReducer";
import { githubUserDataReducer } from "./components/reducers/githubUserDataReducer";

const rootReducer = combineReducers({
    blacklist: blackListReducer,
    selectedRepo: selectedRepoReducer,
    githubUserData: githubUserDataReducer
})

export default createStore(rootReducer);