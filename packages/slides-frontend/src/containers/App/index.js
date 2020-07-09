/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Container from '../Editor/Container';
import Presentation from '../Editor/Presentation';
import Export from '../Editor/Export';
import Homepage from '../Editor/Homepage';
import {Loader} from 'semantic-ui-react';
import GlobalStyle from '../../global-styles';
import NotFoundPage from '../NotFoundPage';

// Migrate to new Version of Spectacle

function App({authenticated}) {
  return (
    <div>
      {authenticated ? (
        <div>
          <Switch>
            <Route path="/edit" component={Container} />
            <Route path="/present" component={Presentation} />
            <Route path="/export" component={Export} />
            <Route exact path="/" component={Homepage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </div>
      ) : (
        <Loader active content="Loading..." />
      )}
    </div>
  );
}

App.propTypes = {
  authenticated: PropTypes.bool,
};

export default connect(
  state => ({
    authenticated: state.keycloak.authenticated,
  }),
  null
)(App);
