// this is a very important file
// it is a generic component
// can be text or image
// and knows its position and size
// it can be focused or put in the background
// it has keyboard listeners for delete
// it can be resized and move
// it is the div inside which we will render the text or image
// it has a ref
// every itemObj from the store has it's own id
// its parent component is an array of them
// i have only one array of elements in the redux but has a type  text/image
// depending on that the obj is different and will be rendered differently
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { deleteImage } from '../../../../utils/requests';

import {
  removeItem,
  changeItemPosition,
  changeItemSize,
  editData,
  toggleFocus,
} from '../../../redux-store/DeckReducer/actions';
import {
  getAssetsPath,
  getTitle,
  getPresentationMode,
} from '../../../redux-store/PresentationReducer/selectors';
import { getCurrentSlide } from '../../../redux-store/DeckReducer/selectors';
import Text from '../text';
import Image from '../image';
import './index.css';

function Item({
  itemObj,
  onRemoveItem,
  onChangePosition,
  onChangeSize,
  assetsPath,
  currentSlide,
  onEditData,
  title,
  username,
  onToggleFocus,
  token,
  presentationMode,
}) {
  const itemRef = useRef(null);

  const { type, ID, Focused } = itemObj;
  const ItemComponent = type === 'TEXT' ? Text : Image;

  const deleter = e => {
    e.preventDefault(); // super IMPORTANT here otherwise it propagates the event
    // send a delete in Redux
    if (presentationMode) return;
    if (type === 'TEXT' && itemObj.Edit) {
      // text in edit mode so don't delete it
      return;
    }
    onRemoveItem(ID);
    // send a delete in Server if it is an Image
    if (type === 'IMAGE') {
      deleteImage(assetsPath, username, title, itemObj.Src, token);
    }
  };

  const singleClick = e => {
    if (presentationMode) return;
    if (itemRef.current.contains(e.target)) {
      // inside click
      itemRef.current.focus();
      onToggleFocus(ID, true);
      return;
    }
    if (type === 'TEXT' && itemObj.Edit) {
      // if text is still editing then ignore the outside click
      return;
    }
    itemRef.current.blur();
    onToggleFocus(ID, false);
  };
  
  // disable when presentation
  useEffect(() => {
    document.addEventListener('mousedown', singleClick);
    return () => {
      document.removeEventListener('mousedown', singleClick);
    };
  });

  // in case of Presentation Mode I want to disable deleting and blue border
  return (
    <div>
      {presentationMode ? (
        <ItemComponent ID={ID} />
      ): (
        <div ref={itemRef} className="item-style">
          <KeyboardEventHandler
            handleKeys={['backspace', 'del']}
            onKeyEvent={(key, e) => Focused && deleter(e)}
          />
          <ItemComponent ID={ID} />
        </div>
      )}
    </div>
  );
}

Item.propTypes = {
  itemObj: PropTypes.object,
  assetsPath: PropTypes.string,
  onRemoveItem: PropTypes.func,
  onChangePosition: PropTypes.func,
  onChangeSize: PropTypes.func,
  currentSlide: PropTypes.number,
  onEditData: PropTypes.func,
  username: PropTypes.string,
  title: PropTypes.string,
  onToggleFocus: PropTypes.func,
  token: PropTypes.string,
  presentationMode: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePosition: (id, position) =>
      dispatch(changeItemPosition(id, position)),
    onChangeSize: (id, position) => dispatch(changeItemSize(id, position)),
    onRemoveItem: id => dispatch(removeItem(id)),
    onEditData: (id, data) => dispatch(editData(id, data)),
    onToggleFocus: (id, focus) => dispatch(toggleFocus(id, focus)),
  };
}

export default connect(
  state => ({
    assetsPath: getAssetsPath(state),
    currentSlide: getCurrentSlide(state),
    title: getTitle(state),
    username: state.keycloak.userToken.cern_upn,
    token: state.keycloak.instance.token,
    presentationMode: getPresentationMode(state),
  }),
  mapDispatchToProps,
)(Item);
