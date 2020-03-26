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
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import axios from 'axios';
import Draggable from 'react-draggable';

import {
  removeItem,
  changeItemPosition,
  changeItemSize,
  setEditMode,
  editData,
} from '../../../redux-store/DeckReducer/actions';
import { getAssetsPath } from '../../../redux-store/PresentationReducer/selectors';
import { getCurrentSlide } from '../../../redux-store/DeckReducer/selectors';
import Text from '../text';
import Image from '../image';
import './index.css';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
};

function Item({
  itemObj,
  onRemoveItem,
  onChangePosition,
  onChangeSize,
  assetsPath,
  onSetEditMode,
  currentSlide,
  onEditData,
}) {
  const itemRef = useRef(null);

  const { Position, Size, type, ID, Edit } = itemObj;
  const [curSize, setCurSize] = useState(Size);
  const [curPosition, setCurPosition] = useState(Position);
  const [focused, setFocused] = useState(false);
  // console.log('itemObj', itemObj, currentSlide);
  const ItemName = type === 'TEXT' ? Text : Image;
  // this is something that doesn't need to be stored in store
  // will change in with clicks
  const handleDragStop = (e, pos) => {
    // e.preventDefault();
    const posi = { x: pos.x, y: pos.y };
    console.log('posssssssssssssssss', pos, 'posiiiiiiiiiiiiiii', posi);
    setCurPosition(posi);
    onChangePosition(ID, posi);
  };

  // const handleResizeStop = (e, siz) => {
  //   // e.preventDefault();
  //   setCurSize(siz);
  //   onChangeSize(ID, siz);
  // };

  const delImageReq = () => {
    const url = `${assetsPath}/image/${itemObj.Src}`;
    console.log('url in deleter is ', url);
    return axios.delete(url);
  };

  const deleter = e => {
    // e.preventDefault();
    console.log('deleter called', ID);
    // send a delete in Redux
    onRemoveItem(ID);
    // send a delete in Server if it is an Image
    if (type === 'IMAGE') delImageReq();
  };

  const singleClick = e => {
    if (itemRef.current.contains(e.target)) {
      // inside click
      setFocused(true);
      return;
    }
    setFocused(false);
  };

  const doubleClick = () =>
    type === 'TEXT' && !Edit ? onSetEditMode(ID, true) : null;

  useEffect(() => {
    document.addEventListener('mousedown', singleClick);
    return () => {
      document.removeEventListener('mousedown', singleClick);
    };
  });

  return (
    <Draggable onStop={handleDragStop} defaultPosition={curPosition}>
      <div ref={itemRef} onDoubleClick={doubleClick} className="item-style">
        <KeyboardEventHandler
          handleKeys={['backspace', 'del']}
          onKeyEvent={(key, e) => focused && deleter(e)}
        />
        <ItemName ref={itemRef} ID={ID} />
      </div>
    </Draggable>
  );
}

Item.propTypes = {
  itemObj: PropTypes.object,
  assetsPath: PropTypes.string,
  onRemoveItem: PropTypes.func,
  onChangePosition: PropTypes.func,
  onChangeSize: PropTypes.func,
  onSetEditMode: PropTypes.func,
  currentSlide: PropTypes.number,
  onEditData: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePosition: (id, position) =>
      dispatch(changeItemPosition(id, position)),
    onChangeSize: (id, position) => dispatch(changeItemSize(id, position)),
    onRemoveItem: id => dispatch(removeItem(id)),
    onSetEditMode: (id, edit) => dispatch(setEditMode(id, edit)),
    onEditData: (id, data) => dispatch(editData(id, data)),
  };
}

export default connect(
  state => ({
    assetsPath: getAssetsPath(state),
    currentSlide: getCurrentSlide(state),
  }),
  mapDispatchToProps,
)(Item);
