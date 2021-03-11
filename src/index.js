import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/state/index';
import AppComponent from './app/App.component';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppComponent />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
