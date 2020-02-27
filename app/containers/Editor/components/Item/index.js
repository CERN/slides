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
import { Rnd } from 'react-rnd';
import {
  removeItem,
  changeItemPosition,
  changeItemSize,
  setEditMode,
} from '../../../redux-store/DeckReducer/actions';
import { getAssetsPath } from '../../../redux-store/PresentationReducer/selectors';
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
}) {
  const itemRef = useRef(null);
  const { Position, Size, type } = itemObj;
  const [curSize, setCurSize] = useState(Size);
  const [curPosition, setCurPosition] = useState(Position);
  const [focused, setFocused] = useState(false);
  console.log('itemObj', itemObj);
  // this is something that doesn't need to be stored in store
  // will change in with clicks
  const handleDragStop = (e, pos) => {
    e.preventDefault();
    setCurPosition(pos);
    onChangePosition(itemObj.ID, pos);
  };

  const handleResizeStop = (e, siz) => {
    e.preventDefault();
    setCurSize(siz);
    onChangeSize(itemObj.ID, siz);
  };

  const delImageReq = () => {
    const url = `${assetsPath}/image/${itemObj.Src}`;
    console.log('url in deleter is ', url);
    return axios.delete(url);
  };

  const deleter = e => {
    e.preventDefault();
    console.log('deleter called', itemObj.ID);
    // send a delete in Redux
    onRemoveItem(itemObj.ID);
    // send a delete in Server if it is an Image
    if (itemObj.type === 'IMAGE') delImageReq();
  };

  const onDoubleClick = evt => {
    evt.preventDefault();
    if (itemRef.current.contains(evt.target)) {
      // inside click
      // then edit
      // console.log('double click');
      // onChangePosition(itemObj.ID, curPosition);
      // onChangeSize(itemObj.ID, curSize);
      onSetEditMode(itemObj.ID, true);
    }
  };

  const handleClick = e => {
    e.preventDefault();
    if (itemRef.current.contains(e.target)) {
      // inside click
      itemRef.current.focus();
      setFocused(true);
      // then move
      return;
    }
    // outside click
    // console.log('outside clicki');
    itemRef.current.blur();
    setFocused(false);
    // onAddData(currentText, text);
    onSetEditMode(itemObj.ID, false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  // deleter only called when the element is focused

  return (
    <div ref={itemRef}>
      <Rnd
        className="item-style"
        style={style}
        size={{ width: curSize.width, height: curSize.height }}
        position={{ x: curPosition.x, y: curPosition.y }}
        onDragStop={(e, d) => handleDragStop(e, { x: d.x, y: d.y })}
        onResizeStop={(e, direction, ref, delta, position) => {
          handleResizeStop(e, {
            width: ref.style.width,
            height: ref.style.height,
          });
        }}
        minWidth={500}
        minHeight={70}
        onDoubleClick={onDoubleClick}
      >
        <KeyboardEventHandler
          handleKeys={['backspace', 'del']}
          onKeyEvent={(key, e) => focused && deleter(e)}
        />
        <h1>Hello my item</h1>
      </Rnd>
    </div>
  );
}

Item.propTypes = {
  itemObj: PropTypes.object,
  assetsPath: PropTypes.string,
  onRemoveItem: PropTypes.func,
  onChangePosition: PropTypes.func,
  onChangeSize: PropTypes.func,
  onSetEditMode: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePosition: (id, position) =>
      dispatch(changeItemPosition(id, position)),
    onChangeSize: (id, position) => dispatch(changeItemSize(id, position)),
    onRemoveItem: id => dispatch(removeItem(id)),
    onSetEditMode: (id, edit) => dispatch(setEditMode(id, edit)),
  };
}

export default connect(
  state => ({
    assetsPath: getAssetsPath(state),
  }),
  mapDispatchToProps,
)(Item);
