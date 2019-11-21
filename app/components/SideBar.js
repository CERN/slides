import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './Settings.css';

function ContentEditBar({ addSlide, removeSlide, addText, removeText }) {
  return (
    <div className="content-edit-bar">
      <Menu vertical inverted icon="labeled">
        <Menu.Item name="AddSlide" onClick={addSlide}>
          <Icon name="plus" />
          Add a New Slide
        </Menu.Item>
        <Menu.Item name="RemoveSlide" onClick={removeSlide}>
          <Icon name="trash alternate" />
          Remove This Slide
        </Menu.Item>
        <Menu.Item name="AddText" onClick={addText}>
          <Icon name="pencil alternate" />
          Add Text
        </Menu.Item>
        <Menu.Item name="RemoveText" onClick={removeText}>
          <Icon name="trash" />
          Remove Text
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default ContentEditBar;

ContentEditBar.propTypes = {
  addSlide: PropTypes.func.isRequired,
  removeSlide: PropTypes.func.isRequired,
  addText: PropTypes.func.isRequired,
  removeText: PropTypes.func.isRequired,
};
