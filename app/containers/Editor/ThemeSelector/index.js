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
} from 'semantic-ui-react';

import { setTheme, setTitle, setDescription } from '../redux-store/actions';

import {
  selectTheme,
  selectTitle,
  selectDescription,
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

function ThemeSelector({
  onSetTheme,
  onSetTitle,
  onSetDescription,
  currentTheme,
  currentTitle,
  currentDescription,
  readyFunc,
}) {
  const [title, setTi] = useState(currentTitle);
  const [theme, setTh] = useState(currentTheme);
  const [description, setDes] = useState(currentDescription);

  const clickHandler = () => {
    onSetTitle(title);
    onSetTheme(theme);
    onSetDescription(description);
    history.push(`/username/${title}/edit/`);
    readyFunc();
  };

  const settingTitle = (e, { value }) => setTi(value);
  const settingTheme = (e, { value }) => setTh(value);
  const settingDescription = (e, { value }) => setDes(value);

  return (
    <div className="theme-selector">
      <Image src={img} size="medium" centered />
      <Header className="white" size="large">
        Start your Presentation
      </Header>
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
          <TextArea
            className="spacing"
            placeholder="What is your Presentation about?"
            onChange={settingDescription}
          />
          <Button color="green" size="large" onClick={clickHandler} animated>
            <Button.Content visible>Let's GO!</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Segment>
      </Form>
    </div>
  );
}

ThemeSelector.propTypes = {
  onSetTheme: PropTypes.func,
  onSetTitle: PropTypes.func,
  onSetDescription: PropTypes.func,
  currentTheme: PropTypes.string,
  currentTitle: PropTypes.string,
  currentDescription: PropTypes.string,
  readyFunc: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSetTheme: theme => dispatch(setTheme(theme)),
    onSetTitle: title => dispatch(setTitle(title)),
    onSetDescription: description => dispatch(setDescription(description)),
  };
}

export default connect(
  state => ({
    currentTheme: selectTheme(state),
    currentTitle: selectTitle(state),
    currentDescription: selectDescription(state),
  }),
  mapDispatchToProps,
)(ThemeSelector);
