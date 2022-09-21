import {createStore, combineReducers, applyMiddleware} from 'redux';
import {settings, user, reviewer } from './reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  settings,
  user,
  reviewer
});

export default createStore(reducer, {}, applyMiddleware(thunk));
