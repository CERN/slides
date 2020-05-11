import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Header,
  Image,
  Segment,
  Input,
  Select,
  Grid,
  Divider,
} from 'semantic-ui-react';

import config from '../../../config';

import {
  setTheme,
  setTitle,
  setUsername,
  setLoadRequest,
  setIsReady,
  setAssetsPath,
} from '../../redux-store/PresentationReducer/actions';

import {
  getTheme,
  getTitle,
  getAssetsPath,
} from '../../redux-store/PresentationReducer/selectors';
import './index.css';
import history from '../../../utils/history';

const themeOptions = [
  {
    key: 'CERN 1',
    text: 'CERN 1',
    value: 'CERN 1',
  },
  {
    key: 'CERN 2',
    text: 'CERN 2',
    value: 'CERN 2',
  },
  {
    key: 'CERN 3',
    text: 'CERN 3',
    value: 'CERN 3',
  },
  {
    key: 'CERN 4',
    text: 'CERN 4',
    value: 'CERN 4',
  },
  {
    key: 'CERN 5',
    text: 'CERN 5',
    value: 'CERN 5',
  },
  {
    key: 'CERN 6',
    text: 'CERN 6',
    value: 'CERN 6',
  },
];

function LandingPage({
  onSetTheme,
  onSetTitle,
  onSetUsername,
  currentTheme,
  currentTitle,
  onSetIsReady,
  onLoadRequest,
  assetsPath,
  onSetAssetsPath,
  userToken,
  authenticated
}) {

  const [title, setTi] = useState(currentTitle);
  const [theme, setTh] = useState(currentTheme);

  const clickHandlerNew = () => {
    onSetTitle(title);
    onSetTheme(theme);
    const user = userToken;
    history.push(`/${user}/${title}/edit/`);
    // make a uuid for this Presentation:
    onSetUsername(user);
    // ready
    onSetIsReady();
  };

  const clickHandlerLoad = () => {
    // set LoadReq
    onLoadRequest();
    // load component will take over and load content
  };

  const settingTitle = (e, { value }) => setTi(value);
  const settingTheme = (e, { value }) => setTh(value);

  // set the assetsFolder, where images will be, in the redux store
  if (assetsPath === '') onSetAssetsPath(config.assetsPath);
  // if isAuthenticated render else Loading...
  return (
    <div className="landing-page">
      <Image src={`${config.assetsPath}/public/Logo-Outline-web-White@200.png`} className="image" centered/>
      <Segment compact>
      <Grid relaxed='very' stackable columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Header className="white" as="h2" textAlign='centered' content="Start New Presentation"/>
            <Form size="large">
              <Segment>
                <Input
                  className="spacing"
                  placeholder="Presentation Title"
                  fluid
                  onChange={settingTitle}
                />
                <Select
                  className="spacing"
                  placeholder="Select Theme"
                  fluid
                  options={themeOptions}
                  onChange={settingTheme}
                />
                <Button color="green" onClick={clickHandlerNew}>
                  <Button.Content visible>Let's GO!</Button.Content>
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
          {/* here i go to the next thing */}
          <Grid.Column>
            <Header className="white" as="h2" textAlign='centered' content="Edit Existing Presentation"/>
            <Button color="blue" onClick={clickHandlerLoad}>
              <Button.Content visible>Upload!</Button.Content>
            </Button>
          </Grid.Column>
          {/* this width makes the Header text take all the required space to be inline */}
        </Grid.Row>
      </Grid>
      <Divider vertical>Or</Divider>
      </Segment>
    </div>
  );
}

LandingPage.propTypes = {
  onSetTheme: PropTypes.func,
  onSetTitle: PropTypes.func,
  onSetUsername: PropTypes.func,
  currentTheme: PropTypes.string,
  currentTitle: PropTypes.string,
  onSetIsReady: PropTypes.func,
  onLoadRequest: PropTypes.func,
  assetsPath: PropTypes.string,
  onSetAssetsPath: PropTypes.func,
  authenticated: PropTypes.bool,
  userToken: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSetTheme: theme => dispatch(setTheme(theme)),
    onSetTitle: title => dispatch(setTitle(title)),
    onSetUsername: user => dispatch(setUsername(user)),
    onLoadRequest: () => dispatch(setLoadRequest(true)),
    onSetIsReady: () => dispatch(setIsReady(true)),
    onSetAssetsPath: path => dispatch(setAssetsPath(path)),
  };
}

export default connect(
  state => ({
    currentTheme: getTheme(state),
    currentTitle: getTitle(state),
    assetsPath: getAssetsPath(state),
    authenticated: state.keycloak.authenticated,
    userToken: state.keycloak.userToken.cern_upn,
  }),
  mapDispatchToProps,
)(LandingPage);
