import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Container.css';
import { connect } from 'react-redux';
import Settings from '../../components/Settings';
import Presentation from './index';
import ThemeSelector from '../../components/ThemeSelector';
import history from '../../utils/history';

import { setTheme } from './actions';

function Container({ onSetTheme }) {
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState('New Presentation');
  const [description, setDescription] = useState('');

  const readyFunc = (selectedTitle, selectedTheme, selectedDescription) => {
    setReady(true);
    setTitle(selectedTitle);
    setDescription(selectedDescription);
    // set the url
    // username will be the one I get after his authentication
    history.push(`/username/${selectedTitle}/edit/`);
    // push in the store the new value for the theme
    onSetTheme(selectedTheme);
  };
  return (
    <div>
      {ready ? (
        <div className="Container">
          <div className="settings">
            <Settings />
          </div>
          <div className="presentation">
            <Presentation title={title} description={description} />
          </div>
        </div>
      ) : (
        <div className="ThemeSelector">
          <ThemeSelector readyFunc={readyFunc} />
        </div>
      )}
    </div>
  );
}

Container.propTypes = {
  onSetTheme: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSetTheme: theme => dispatch(setTheme(theme)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Container);
