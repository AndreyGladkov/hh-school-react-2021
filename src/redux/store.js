import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import customFunction from "./middlewares/customFunction";
import getAuthor from "./Author";
import getReviewer from "./Reviewer";
import getSettings from "./Settings";
import getResponses from "./ApiResponse";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducer = combineReducers({
  getAuthor,
  getReviewer,
  getSettings,
  getResponses
});

export default createStore(
  reducer,
  applyMiddleware(customFunction)
);
