/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import history from './utils/history';
import presentationReducer from './containers/redux-store/PresentationReducer/reducer.ts';
import deckReducer from './containers/redux-store/DeckReducer/reducer.ts';
import {keycloakReducer as keycloak} from '@authzsvc/keycloak-js-react';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    keycloak,

    presentation: presentationReducer,
    deck: deckReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
