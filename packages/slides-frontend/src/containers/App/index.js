/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '../Editor/Container';
import { Loader } from 'semantic-ui-react';
import GlobalStyle from '../../global-styles';

function App ({authenticated}) {
  return (
    <div>
      {authenticated ?
        (
          <div>
            <Switch>
              <Route path="/" component={Container} />
            </Switch>
            <GlobalStyle />
          </div>
        ) :
        <Loader active content="Loading..."/>
      }
    </div>
  );
}

App.propTypes = {
  authenticated: PropTypes.bool
}

export default connect(
  state => ({
    authenticated: state.keycloak.authenticated,
  }),
  null
)(App);
