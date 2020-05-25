/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import "core-js/stable";
import "regenerator-runtime/runtime";
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';
// Import root app
import App from './containers/App';
import KeycloakWrapper from "@authzsvc/keycloak-js-react";
import Keycloak from "keycloak-js";

import configureStore from './configureStore';
import * as cfg from './authConfig';

// Import Semantic-ui styles
import 'semantic-ui-css/semantic.min.css';
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <KeycloakWrapper
        keycloak={
          new Keycloak({
            url: cfg.keycloakUrl,
            realm: cfg.keycloakRealm,
            clientId: cfg.keycloakClientId
          })
        }
        refresh={true}
        keycloakParams={{
          onLoad: "login-required",
          promiseType: "native",
          flow: "standard"
        }}
      >
        <App />
      </KeycloakWrapper>
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE,
);
