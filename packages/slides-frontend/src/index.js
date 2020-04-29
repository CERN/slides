/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';
// import './sanitize.css/sanitize.css';

// Import root app
import App from './containers/App';
// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
// import './!file-loader?name=[name].[ext]!./images/favicon.ico';
// import './file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */
import configureStore from './configureStore';

// Import Semantic-ui styles
import 'semantic-ui-css/semantic.min.css';
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE,
);
