import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Icon, Popup } from 'semantic-ui-react';
import { setSaveRequest } from '../../redux-store/PresentationReducer/actions';

import './index.css';

function Settings({ onSaveRequest }) {
  const onClickHandler = item => {
    // turn on a save request
    if (item === 'save') onSaveRequest();
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
    <Menu inverted vertical fluid icon="labeled" className="settings">
      {Item('eye', 'Preview (^F)')}
      {Item('undo', 'Undo (Ctrl+Z)')}
      {Item('save', 'Save')}
      {Item('play', 'Present (Ctrl+E)')}
      {Item('setting', 'Presentation Settings')}
      {Item('paint brush', 'Style')}
      {Item('ordered list', 'Arrange Slides')}
      {Item('time', 'Revision history')}
      {Item('cloud upload', 'Import from my CERNBox')}
      {Item('cloud download', 'Export')}
      {Item('image', 'Media')}
      {Item('share alternate', 'Share')}
      {Item('ellipsis vertical')}
      {/* have to make a popup specially for this one, https://react.semantic-ui.com/modules/popup/#usage-nested */}
      <Menu.Item className="lastitem">
        {/* same for this one */}
        <Icon name="content" />
      </Menu.Item>
    </Menu>
  );
}

Settings.propTypes = {
  onSaveRequest: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSaveRequest: () => dispatch(setSaveRequest(true)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Settings);
