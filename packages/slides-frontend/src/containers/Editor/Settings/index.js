import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Icon, Popup } from 'semantic-ui-react';
import history from '../../../utils/history';
import {
  setSaveRequest,
  setStyleRequest,
  setLoadRequest,
  themeRequest,
  setPresentationMode,
} from '../../redux-store/PresentationReducer/actions';
import { getTitle } from '../../redux-store/PresentationReducer/selectors';
import './index.css';

function Settings({
  onSaveRequest,
  onStyleRequest,
  onLoadRequest,
  onThemeRequest,
  username,
  title,
  onSetPresentationMode
}) {
  const onClickHandler = item => {
    switch (item) {
      case 'cloud upload':
        onLoadRequest();
        break;
      case 'save':
        onSaveRequest();
        break;
      case 'paint brush':
        onStyleRequest();
        break;
      case 'theme':
        onThemeRequest();
        break;
      case 'eye':
        onSetPresentationMode();
        history.push(`/present/${username}/${title}/`);
        break;
      case 'cloud download':
        console.log("export pdf button");
        break;
      default:
        break;
    }
  };
  const Item = (item, description) => (
    <Menu.Item onClick={() => onClickHandler(item)}>
      <Popup
        inverted
        trigger={<Icon name={item} />}
        content={description}
        position="right center"
      />
    </Menu.Item>
  );
  return (
    <div className="settings">
      <Menu inverted vertical fluid icon="labeled">
        {Item('eye', 'Slideshow')}
        {Item('save', 'Save Presentation')}
        {/* {Item('play', 'Present (Ctrl+E)')} */}
        {/* {Item('setting', 'Presentation Settings')} */}
        {Item('paint brush', 'Change Background Color')}
        {Item('theme', 'Change Theme')}
        {/* {Item('ordered list', 'Arrange Slides')} */}
        {Item('cloud upload', 'Upload existing presentation')}
        {Item('cloud download', 'Export as PDF (pending)')}
      </Menu>
    </div>
  );
}

Settings.propTypes = {
  onSaveRequest: PropTypes.func,
  onStyleRequest: PropTypes.func,
  onLoadRequest: PropTypes.func,
  onThemeRequest: PropTypes.func,
  username: PropTypes.string,
  title: PropTypes.string,
  onSetPresentationMode: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSaveRequest: () => dispatch(setSaveRequest(true)),
    onStyleRequest: () => dispatch(setStyleRequest(true)),
    onLoadRequest: () => dispatch(setLoadRequest(true)),
    onThemeRequest: () => dispatch(themeRequest(true)),
    onSetPresentationMode: () => dispatch(setPresentationMode(true)),
  };
}

export default connect(
  state => ({
    username: state.keycloak.userToken.cern_upn,
    title: getTitle(state),
  }),
  mapDispatchToProps,
)(Settings);
