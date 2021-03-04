import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppComponent from './app/App.component';
import store from './app/state';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppComponent />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
