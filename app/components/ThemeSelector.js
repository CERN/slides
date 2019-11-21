import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Input,
  Select,
  TextArea,
  Icon,
} from 'semantic-ui-react';
import img from '../images/CERN-Logo.png';
import './Container.css';
import preloader from '../utils/preloader';

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

function ThemeSelector({ readyFunc }) {
  const [title, setTitle] = useState('New Presentation');
  const [url, setURL] = useState(title);
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');

  const clickHandler = () => readyFunc(title, url, theme, description);

  const settingTitle = (e, { value }) => setTitle(value);
  const settingURL = (e, { value }) => setURL(value);
  const settingTheme = (e, { value }) => setTheme(value);
  const settingDescription = (e, { value }) => setDescription(value);

  return (
    <div>
      <Grid className="grid" textAlign="center">
        <Grid.Column style={{ maxWidth: 500 }}>
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
              <Input
                className="spacing"
                label="slides.web.cern.ch/"
                fluid
                placeholder="URL"
                onChange={settingURL}
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
      </Grid>
    </div>
  );
}

export default ThemeSelector;

ThemeSelector.propTypes = {
  readyFunc: PropTypes.func,
};
