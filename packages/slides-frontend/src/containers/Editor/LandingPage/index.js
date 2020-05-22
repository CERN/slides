import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { titleCheck } from '../../../utils/requests';
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
  setLoadRequest,
  setIsReady,
  setAssetsPath,
  setBackgroundColor,
} from '../../redux-store/PresentationReducer/actions';

import {
  getTheme,
  getTitle,
  getAssetsPath,
} from '../../redux-store/PresentationReducer/selectors';
import './index.css';
import history from '../../../utils/history';
import warning from '../../Alerts/warning';

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
  currentTheme,
  currentTitle,
  onSetIsReady,
  onLoadRequest,
  assetsPath,
  onSetAssetsPath,
  username,
  token,
  onSetBackgroundColor
}) {

  const [title, setTi] = useState(currentTitle);
  const [theme, setTh] = useState(currentTheme);
  const [loadingIndicator, setLoading] = useState(false);  

  const clickHandlerNew = () => {
    // first check in server if title is good
    setLoading(true);
    if (title === '') {
      // alert for bad title
      warning("Title can't be empty!");
      setLoading(false);
      return;
    }
    titleCheck(assetsPath, username, title, token).then(res => {
      if (res.status === 200) {
        // all went good
        onSetTitle(title);
        onSetTheme(theme);
        if (theme === 'CERN 5' || theme === 'CERN 6') {
          onSetBackgroundColor('#FFFFFF'); // make background white in theme 5 and 6
        }
        else {
          onSetBackgroundColor('#0053A1');
        }
        const user = username;
        history.push(`/${user}/${title}/edit/`);
        // ready
        onSetIsReady();
      }
      setLoading(false);
    }).catch(err => {
      console.log('error in title is', err);
      // alert for bad title
      warning('Presentation with the same title already exists!')
      setLoading(false);  
    })
  };

  const clickHandlerLoad = () => {
    // set LoadReq
    onLoadRequest();
    // load component will take over and load content
  };
  // this .trim() removes trailing whitespaces from both ends of the string
  const settingTitle = (e, { value }) => setTi(value.trim());
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
            <Header className="white" as="h2" content="Start New Presentation" />
            <Form size="large">
              <Segment>
                  {/* Don't leave it empty, don't have default */}
                <Input
                  className="spacing"
                  placeholder="Presentation Title"
                  fluid
                  onChange={settingTitle}
                  />
                  {/* make changes here */}
                <Select 
                  className="spacing"
                  placeholder="Select Theme"
                  fluid
                  options={themeOptions}
                  onChange={settingTheme}
                />
                <Button color="blue" onClick={clickHandlerNew} loading={loadingIndicator}>
                  <Button.Content visible>Let's GO!</Button.Content>
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
          {/* here i go to the next thing */}
          <Grid.Column>
            <Header className="white" as="h2" content="Edit Existing Presentation" />
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
  currentTheme: PropTypes.string,
  currentTitle: PropTypes.string,
  onSetIsReady: PropTypes.func,
  onLoadRequest: PropTypes.func,
  assetsPath: PropTypes.string,
  onSetAssetsPath: PropTypes.func,
  username: PropTypes.string,
  token: PropTypes.string,
  onSetBackgroundColor: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSetTheme: theme => dispatch(setTheme(theme)),
    onSetTitle: title => dispatch(setTitle(title)),
    onLoadRequest: () => dispatch(setLoadRequest(true)),
    onSetIsReady: () => dispatch(setIsReady(true)),
    onSetAssetsPath: path => dispatch(setAssetsPath(path)),
    onSetBackgroundColor: color => dispatch(setBackgroundColor(color)),
  };
}

export default connect(
  state => ({
    currentTheme: getTheme(state),
    currentTitle: getTitle(state),
    assetsPath: getAssetsPath(state),
    username: state.keycloak.userToken.cern_upn,
    token: state.keycloak.instance.token,
  }),
  mapDispatchToProps,
)(LandingPage);
