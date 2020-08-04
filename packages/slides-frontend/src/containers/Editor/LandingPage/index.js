import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {titleCheck} from '../../../utils/requests';
import {Button, Form, Header, Image, Segment, Input, Grid, Divider} from 'semantic-ui-react';
import config from '../../../config';

import {
  setTitle,
  setLoadRequest,
  setIsReady,
  setAssetsPath,
} from '../../redux-store/PresentationReducer/actions';

import {getTitle, getAssetsPath} from '../../redux-store/PresentationReducer/selectors';

import './index.css';
import history from '../../../utils/history';
import warning from '../../Alerts/warning';

function LandingPage({
  onSetTitle,
  currentTitle,
  onSetIsReady,
  onLoadRequest,
  assetsPath,
  onSetAssetsPath,
  username,
  token,
}) {
  const [title, setTi] = useState(currentTitle);
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
    titleCheck(assetsPath, username, title, token)
      .then(res => {
        if (res.status === 200) {
          // all went good
          onSetTitle(title);
          const user = username;
          history.push(`/edit/${user}/${title}/`);
          // ready
          onSetIsReady();
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('error in title is', err);
        // alert for bad title
        warning('Presentation with the same title already exists!');
        setLoading(false);
      });
  };

  const clickHandlerLoad = () => {
    // set LoadReq
    onLoadRequest();
    // load component will take over and load content
  };
  // this .trim() removes trailing whitespaces from both ends of the string
  const settingTitle = (e, {value}) => setTi(value.trim());

  // set the assetsFolder, where images will be, in the redux store
  if (assetsPath === '') onSetAssetsPath(config.assetsPath);
  // if isAuthenticated render else Loading...
  return (
    <div className="landing-page">
      <Image
        alt="CERN_Slides_App_logo_by_L.Zacharova_and_D.Taborsky"
        src={`${config.assetsPath}/public/Slides-S.png`}
        className="image"
        centered
      />
      <Segment placeholder>
        <Segment.Inline>
          <Grid relaxed="very" stackable columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header className="white" as="h2" content="Start New Presentation" />
                <Form size="large">
                  <Segment>
                    <Input
                      className="spacing"
                      placeholder="Presentation Title"
                      fluid
                      onChange={settingTitle}
                    />
                    <Button color="blue" onClick={clickHandlerNew} loading={loadingIndicator}>
                      <Button.Content visible>Let's GO!</Button.Content>
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Header className="white" as="h2" content="Edit Existing Presentation" />
                <Button color="blue" onClick={clickHandlerLoad}>
                  <Button.Content visible>Upload!</Button.Content>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment.Inline>
      </Segment>
      <Segment inverted vertical style={{margin: '50em 2em 3em'}}>
        <Image
          alt="CERN logo"
          src={`${config.assetsPath}/public/Logo-Outline-web-White@200.png`}
          size="mini"
          floated="left"
          verticalAlign="middle"
        />
        <span style={{left: '4em', position: 'absolute', top: '2.3em'}}>
          <a href="https://home.cern/" target="_blank" title="CERN - Birthplace of the Web">
            CERN Copyright
          </a>
        </span>
      </Segment>
    </div>
  );
}

LandingPage.propTypes = {
  onSetTitle: PropTypes.func,
  currentTitle: PropTypes.string,
  onSetIsReady: PropTypes.func,
  onLoadRequest: PropTypes.func,
  assetsPath: PropTypes.string,
  onSetAssetsPath: PropTypes.func,
  username: PropTypes.string,
  token: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSetTitle: title => dispatch(setTitle(title)),
    onLoadRequest: () => dispatch(setLoadRequest(true)),
    onSetIsReady: () => dispatch(setIsReady(true)),
    onSetAssetsPath: path => dispatch(setAssetsPath(path)),
  };
}

export default connect(
  state => ({
    currentTitle: getTitle(state),
    assetsPath: getAssetsPath(state),
    username: state.keycloak.userToken.cern_upn,
    token: state.keycloak.instance.token,
  }),
  mapDispatchToProps
)(LandingPage);
