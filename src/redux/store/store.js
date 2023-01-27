import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import Author from '../models/Author';
import Reviewer from '../models/Reviewer';
import ReviewersToChoose from '../models/ReviewersToChoose';
import Blacklisted from '../models/Blacklisted';
import thunk from '../middlewares/thunk';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducer = combineReducers({
  Author,
  Reviewer,
  ReviewersToChoose,
  Blacklisted,
});

export default createStore(reducer, applyMiddleware(thunk));
