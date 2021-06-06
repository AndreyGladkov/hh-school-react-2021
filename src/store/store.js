import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "./middleware/thunk";
import reducersApi from "./reducers/api.js";

const reducers = combineReducers({ reducersApi });
const middleware = applyMiddleware(thunk);

export default createStore(reducers, middleware);
