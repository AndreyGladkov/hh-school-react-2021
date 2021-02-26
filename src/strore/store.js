import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "./middlewares/thunk";
import githubApi from './reducers/githubApi';

const reducers = combineReducers({
    githubApi
});

const middlewares = applyMiddleware(thunk);


export default createStore(reducers, middlewares);
