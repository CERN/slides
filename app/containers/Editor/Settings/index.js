import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Icon, Popup } from 'semantic-ui-react';
import {
  setSaveRequest,
  setStyleRequest,
} from '../../redux-store/PresentationReducer/actions';

import './index.css';

function Settings({ onSaveRequest, onStyleRequest }) {
  const onClickHandler = item => {
    // turn on a save request
    if (item === 'save') onSaveRequest();
    if (item === 'paint brush') onStyleRequest();
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
        {/* {Item('undo', 'Undo (Ctrl+Z)')} */}
        {Item('save', 'Save')}
        {/* {Item('play', 'Present (Ctrl+E)')} */}
        {/* {Item('setting', 'Presentation Settings')} */}
        {Item('paint brush', 'Change Background Color')}
        {/* {Item('ordered list', 'Arrange Slides')} */}
        {/* {Item('time', 'Revision history')} */}
        {Item('cloud upload', 'Import from my CERNBox')}
        {Item('cloud download', 'Export')}
        {/* {Item('image', 'Media')} */}
        {/* {Item('share alternate', 'Share')} */}
        {/* {Item('ellipsis vertical')} */}
        {/* have to make a popup specially for this one, https://react.semantic-ui.com/modules/popup/#usage-nested */}
        {/* <Menu.Item className="lastitem"> */}
        {/* same for this one */}
        {/* <Icon name="content" /> */}
        {/* </Menu.Item> */}
      </Menu>
    </div>
  );
}

Settings.propTypes = {
  onSaveRequest: PropTypes.func,
  onStyleRequest: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSaveRequest: () => dispatch(setSaveRequest(true)),
    onStyleRequest: () => dispatch(setStyleRequest(true)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Settings);
