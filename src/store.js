import {createStore, combineReducers, applyMiddleware} from 'redux';
import settings from './models/settings';
import user from './models/user';
import reviewer from './models/reviewer';

const reducer = combineReducers({
  settings,
  user,
  reviewer
});

export default createStore(reducer);
