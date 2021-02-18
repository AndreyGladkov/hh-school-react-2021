import { createStore, applyMiddleware } from "redux";
import { reviewReducer } from "../reducers/reviewReducer";
import thunk from "redux-thunk";

export default createStore(reviewReducer, applyMiddleware(thunk));
