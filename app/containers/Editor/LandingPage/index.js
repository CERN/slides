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
  TextArea,
  Icon,
  Grid,
  Divider,
} from 'semantic-ui-react';

import {
  setTheme,
  setTitle,
  setDescription,
  setUsername,
} from '../redux-store/actions';

import {
  selectTheme,
  selectTitle,
  selectDescription,
  selectUsername,
} from '../redux-store/selectors';
import img from '../../../images/CERN-Logo.png';
import './index.css';
import preloader from '../../../utils/preloader';
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

preloader(img);

function LandingPage({
  onSetTheme,
  onSetTitle,
  onSetDescription,
  onSetUsername,
  currentTheme,
  currentTitle,
  currentDescription,
  currentUser,
  readyFunc,
}) {
  const [title, setTi] = useState(currentTitle);
  const [theme, setTh] = useState(currentTheme);
  const [description, setDes] = useState(currentDescription);
  const [user, setUser] = useState(currentUser);

  const clickHandler = () => {
    onSetTitle(title);
    onSetTheme(theme);
    onSetDescription(description);
    history.push(`/${user}/${title}/edit/`);
    // make a uuid for this Presentation:
    onSetUsername(user);
    readyFunc();
  };

  const settingTitle = (e, { value }) => setTi(value);
  const settingTheme = (e, { value }) => setTh(value);
  const settingDescription = (e, { value }) => setDes(value);
  const settingUser = (e, { value }) => setUser(value);

  return (
    <div className="landing-page">
      <Image src={img} size="medium" centered />
      <Grid columns={2} relaxed="very" stackable textAlign="center">
        <Grid.Row>
          <Grid.Column width={12}>
            <Header className="white" size="large">
              Start New Presentation
            </Header>
            <Form size="large">
              <Segment>
                <Input
                  className="spacing"
                  placeholder="Username"
                  fluid
                  onChange={settingUser}
                />
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
                <TextArea
                  className="spacing"
                  placeholder="What is your Presentation about?"
                  onChange={settingDescription}
                />
                <Button
                  color="green"
                  size="large"
                  onClick={clickHandler}
                  animated
                >
                  <Button.Content visible>Let's GO!</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
          <Divider horizontal>Or</Divider>
          <Grid.Column>
            <Header className="white" size="large">
              Edit Existing Presentation
            </Header>
            <Button primary>Upload</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

LandingPage.propTypes = {
  onSetTheme: PropTypes.func,
  onSetTitle: PropTypes.func,
  onSetDescription: PropTypes.func,
  onSetUsername: PropTypes.func,
  currentTheme: PropTypes.string,
  currentTitle: PropTypes.string,
  currentDescription: PropTypes.string,
  currentUser: PropTypes.string,
  readyFunc: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSetTheme: theme => dispatch(setTheme(theme)),
    onSetTitle: title => dispatch(setTitle(title)),
    onSetDescription: description => dispatch(setDescription(description)),
    onSetUsername: user => dispatch(setUsername(user)),
  };
}

export default connect(
  state => ({
    currentTheme: selectTheme(state),
    currentTitle: selectTitle(state),
    currentDescription: selectDescription(state),
    currentUser: selectUsername(state),
  }),
  mapDispatchToProps,
)(LandingPage);
