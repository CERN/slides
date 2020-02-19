import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';
import { Text } from 'spectacle';
import TextEditor from './TextEditor';
import {
  selectCurrentTextArray,
  selectEditMode,
  selectCurrentTextData,
  selectCurrentText,
} from '../../redux-store/selectors';
import {
  addData,
  changePosition,
  toggleEditMode,
} from '../../redux-store/actions';
import './index.css';
export function TextComponent({
  onAddData,
  currentText,
  onChangePosition,
  currentTextArray,
  onToggleEditMode,
  editMode,
  currentData,
}) {
  const node = useRef(null);
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  };
  // text's content
  const [text, setText] = useState(currentData);
  // text's position
  const pos = currentTextArray[currentText].position;
  const [position, setPosition] = useState({
    width: pos.width,
    height: pos.height,
    x: pos.x,
    y: pos.y,
  });
  const onChangeFunc = input => {
    setText(input);
  };

  const onDoubleClick = evt => {
    // evt.preventDefault();
    if (node.current.contains(evt.target)) {
      // inside click
      // then edit
      // console.log('double click');
      onChangePosition(currentText, position);
      onToggleEditMode(currentText, true);
    }
  };

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      // node.current.focus();
      // then move
      return;
    }
    // outside click
    // console.log('outside clicki');
    // node.current.blur();
    onAddData(currentText, text);
    onToggleEditMode(currentText, false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
  // i have to unsubscribe the component when the other component is being rendered

  const onHandlePosition = (evt, posi) => {
    evt.preventDefault();
    setPosition(posi);
  };

  // console.log('textedit is ', editMode, text);
  return (
    <div
      ref={node}
      // style={{ top: position.x, left: position.y }}
      // onClick={handleClicks}
    >
      {editMode ? (
        <TextEditor onChange={onChangeFunc} initialData={text} />
      ) : (
        <Rnd
          className="text-style"
          style={style}
          // default={position}
          size={{ width: position.width, height: position.height }}
          position={{ x: position.x, y: position.y }}
          onDragStop={(e, d) => {
            onHandlePosition(e, {
              width: position.width,
              height: position.height,
              x: d.x,
              y: d.y,
            });
            //   // d.y is going up when i drag down
            //   // d.x is going up when i drag left
          }}
          onResizeStop={(e, direction, ref, delta, posi) => {
            onHandlePosition(e, {
              width: ref.style.width,
              height: ref.style.height,
              ...posi,
            });
          }}
          minWidth={500}
          minHeight={70}
          bounds="body"
          onDoubleClick={onDoubleClick}
        >
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </Rnd>
      )}
    </div>
  );
}

TextComponent.propTypes = {
  onAddData: PropTypes.func,
  currentText: PropTypes.number,
  onChangePosition: PropTypes.func,
  currentTextArray: PropTypes.array,
  onToggleEditMode: PropTypes.func,
  editMode: PropTypes.bool,
  currentData: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAddData: (id, data) => dispatch(addData(id, data)),
    onChangePosition: (id, position) => dispatch(changePosition(id, position)),
    onToggleEditMode: (id, edit) => dispatch(toggleEditMode(id, edit)),
  };
}

export default connect(
  state => ({
    currentTextArray: selectCurrentTextArray(state),
    editMode: selectEditMode(state),
    currentData: selectCurrentTextData(state),
    currentText: selectCurrentText(state),
  }),
  mapDispatchToProps,
)(TextComponent);
