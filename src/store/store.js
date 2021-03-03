import {
  compose, createStore
} from 'redux';
import { getContributors } from '../api/contributors';
import { getSettings } from '../localSave';
import { reducer } from './reducers';

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

let st = getSettings();  

const initialStore = {
  settings: st,
  appstate: { settings: false, about: false },
  users: Object.values(getContributors(st.repo))
};
const middleware = [composeEnhancers];
const store = createStore(
  reducer, initialStore
  //,applyMiddleware(composeEnhancers)
  //composeEnhancers(
  //  applyMiddleware(middleware(loadAppContextStore)),
  //   applyMiddleware(composeEnhancers)
  //)
);

export default store;
