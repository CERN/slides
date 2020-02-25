import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Menu, Icon } from 'semantic-ui-react';
import {
  addSlide,
  removeSlide,
  addItem,
} from '../../redux-store/DeckReducer/actions';
import { uploadImageRequest } from '../../redux-store/PresentationReducer/actions';
import { getCurrentSlide } from '../../redux-store/DeckReducer/selectors';
import './index.css';
import { Text } from '../../redux-store/DeckReducer/definitions';
// when i render SideBar onClick they will render something in the middle

function SideBar({
  onAddSlide,
  onRemoveSlide,
  onAddText,
  currentSlide,
  onAddImage,
}) {
  const addingSlide = () => {
    onAddSlide();
    window.location = `#/${currentSlide + 1}`; // because slides here are starting from 1
  };
  const removingSlide = () => {
    onRemoveSlide();
    if (currentSlide === 0) {
      window.location = `#/${0}`;
    } else window.location = `#/${currentSlide - 1}`;
  };
  return (
    <div className="content-edit-bar">
      <Menu vertical inverted fluid icon="labeled">
        <Menu.Item name="AddSlide" onClick={addingSlide}>
          <Icon name="plus" />
          Add a New Slide
        </Menu.Item>
        <Menu.Item name="RemoveSlide" onClick={removingSlide}>
          <Icon name="trash alternate" />
          Remove This Slide
        </Menu.Item>
        <Menu.Item name="AddText" onClick={onAddText}>
          <Icon name="pencil alternate" />
          Add Text
        </Menu.Item>
        <Menu.Item name="UploadImage" onClick={onAddImage}>
          <Icon name="image outline" />
          Add Image
        </Menu.Item>
      </Menu>
    </div>
  );
}

SideBar.propTypes = {
  onAddSlide: PropTypes.func,
  onRemoveSlide: PropTypes.func,
  onAddText: PropTypes.func,
  onAddImage: PropTypes.func,
  currentSlide: PropTypes.number,
};

function mapDispatchToProps(dispatch) {
  return {
    onAddSlide: () => dispatch(addSlide()),
    onRemoveSlide: () => dispatch(removeSlide()),
    onAddText: () => dispatch(addItem(new Text())),
    onAddImage: () => dispatch(uploadImageRequest(true)),
  };
}

export default connect(
  state => ({
    currentSlide: getCurrentSlide(state),
  }),
  mapDispatchToProps,
)(SideBar);
