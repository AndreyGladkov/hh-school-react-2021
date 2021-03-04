import {
  applyMiddleware, compose, createStore
} from 'redux';
import thunk from 'redux-thunk';
import { getContributors } from '../api/contributors';
import { getSettings } from '../localSave';
import { reducer } from './reducers';

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
const middleware = [thunk];
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

let st = getSettings();

const initialStore = {
  settings: st,
  appstate: { settings: false, about: false },
  users: Object.values(getContributors(st.repo))
};

const store = createStore(
  reducer, initialStore
  , enhancer
);

export default store;
