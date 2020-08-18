import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Menu, Icon} from 'semantic-ui-react';
import {addSlide, removeSlide, addItem, cloneSlide} from '../../redux-store/DeckReducer/actions';
import {getCurrentSlide, getItems} from '../../redux-store/DeckReducer/selectors';
import {uploadImageRequest} from '../../redux-store/PresentationReducer/actions';
import {getAssetsPath, getTitle} from '../../redux-store/PresentationReducer/selectors';
import {deleteImage} from '../../../utils/requests';
import {ItemTypes} from '../../redux-store/DeckReducer/definitions';
import './index.css';
// when i render SideBar onClick they will render something in the middle

function SideBar({
  onAddSlide,
  onRemoveSlide,
  onAddText,
  currentSlide,
  onAddImage,
  onCloneSlide,
  itemsArray,
  assetsPath,
  username,
  title,
  token,
  slides
  }) {

  const addingSlide = () => {
    onAddSlide();
    window.location = `#/${currentSlide + 1}`;
  };

  const removingSlide = () => {
    // check if pictures should be deleted from backend
    itemsArray.forEach(item => {
      if (item.type === 'IMAGE') {
        deleteImage(assetsPath, username, title, item.Src, token, slides);
      }
    })
    onRemoveSlide();
    if (currentSlide === 0) {
      window.location = `#/${0}`;
    } else window.location = `#/${currentSlide - 1}`;
  };
  const cloningSlide = () => {
    onCloneSlide();
    window.location = `#/${currentSlide + 1}`;
  };
  return (
    <div className="sidebar">
      <Menu vertical inverted fluid icon="labeled">
        <Menu.Item name="CloneSlide" onClick={cloningSlide}>
          <Icon name="clone" />
          Clone Slide
        </Menu.Item>
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
  itemsArray: PropTypes.array,
  assetsPath: PropTypes.string,
  username: PropTypes.string,
  title: PropTypes.string,
  token: PropTypes.string,
  slides: PropTypes.array,
};

function mapDispatchToProps(dispatch) {
  return {
    onAddSlide: () => dispatch(addSlide()),
    onRemoveSlide: () => dispatch(removeSlide()),
    onAddText: () => dispatch(addItem({type: ItemTypes.TEXT})),
    onAddImage: () => dispatch(uploadImageRequest(true)),
    onCloneSlide: () => dispatch(cloneSlide()),
  };
}

export default connect(
  state => ({
    currentSlide: getCurrentSlide(state),
    itemsArray: getItems(state),
    assetsPath: getAssetsPath(state),
    title: getTitle(state),
    username: state.keycloak.userToken.cern_upn,
    token: state.keycloak.instance.token,
    slides: state.deck.slides,
  }),
  mapDispatchToProps
)(SideBar);
