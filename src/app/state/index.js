import { createStore } from 'redux';
import mainReducer, { initialState } from './main.reducers';

const store = createStore(
  mainReducer,
  initialState,
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
