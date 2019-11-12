import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ContentEditable from 'react-contenteditable';
import { Rnd } from 'react-rnd';
import CKEditor from 'ckeditor4-react';
import { Text } from 'spectacle';
// import onClickOutside from 'react-onclickoutside';
import { selectDeckOfSlides, selectCurrentSlide } from './selectors';
import { addData, changePosition } from './actions';
import './styles.css';

// change current text when i should
export function TextComponent({
  DeckOfSlides,
  currentSlide,
  onAddData,
  textArrayEntry,
  // onChangePosition,
}) {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: 'solid 1px blue',
    // background: 'transparent',
  };
  // single-double click handlers
  const [textEdit, setTextEdit] = useState(false);
  // const [textMove, setTextMove] = useState(true);
  // text's content
  const [text, setText] = useState(
    DeckOfSlides[currentSlide].textArray[textArrayEntry].data,
  );
  // text's position
  // const pos = DeckOfSlides[currentSlide].textArray[textArrayEntry].position;
  // const [position, setPosition] = useState({
  //   width: pos.width,
  //   height: pos.height,
  //   x: pos.x,
  //   y: pos.y,
  // });
  const onChangeFunc = evt => {
    setText(evt.editor.getData());
    onAddData(textArrayEntry, evt.editor.getData());
    // console.log('-> evt.target.val', evt.target.value);
    // setText(evt.target.value);
    // onAddData(textArrayEntry, evt.target.value);
  };
  // const onClick = () => {
  //   setTextMove(true);
  //   setTextEdit(false);
  // };

  const onDoubleClick = evt => {
    evt.preventDefault();
    // setTextMove(false);
    setTextEdit(!textEdit);
  };
  // const onClick = evt => {
  //   evt.preventDefault();
  //   setTextEdit(false);
  // };

  return (
    // <Rnd
    //   className="text-style"
    //   style={style}
    //   default={{
    //     x: 250,
    //     y: 250,
    //     width: 500,
    //     height: 70,
    //   }}
    //   // size={{ width: display.width, height: display.height }}
    //   // pos={{ x: display.x, y: display.y }}
    //   // onDragStop={(e, d) => {
    //   //   setDisplay({
    //   //     width: display.width,
    //   //     height: display.height,
    //   //     x: d.x,
    //   //     y: d.y,
    //   //   });
    //   //   onChangePosition(textArrayEntry, {
    //   //     width: display.width,
    //   //     height: display.height,
    //   //     x: d.x,
    //   //     y: d.y,
    //   //   });
    //   // }}
    //   // onResizeStop={(e, direction, ref, delta, pos) => {
    //   //   setDisplay({
    //   //     width: ref.style.width,
    //   //     height: ref.style.height,
    //   //     ...pos,
    //   //   });
    //   //   onChangePosition(textArrayEntry, {
    //   //     width: ref.style.width,
    //   //     height: ref.style.height,
    //   //     x: display.x,
    //   //     y: display.y,
    //   //   });
    //   // }}
    //   minWidth={500}
    //   minHeight={70}
    //   bounds="body"
    // >
    // <div onClick={onClick} onDoubleClick={onDoubleClick}>
    //   <p>Click or double click</p>
    //   <CKEditor
    //     data={text}
    //     type="inline"
    //     onChange={onChangeFunc}
    //   />
    // </div>
    // </Rnd>
    // <Text height={position.height}>{text}</Text>
    <div onDoubleClick={onDoubleClick}>
      {textEdit ? (
        <CKEditor data={text} type="inline" onChange={onChangeFunc} />
      ) : (
        <Rnd
          className="text-style"
          style={style}
          default={{
            x: 250,
            y: 250,
            width: 500,
            height: 70,
          }}
          minWidth={500}
          minHeight={70}
          bounds="body"
        >
          {<Text>{text}</Text>}
        </Rnd>
      )}
    </div>
  );
}

TextComponent.propTypes = {
  DeckOfSlides: PropTypes.array,
  currentSlide: PropTypes.number,
  onAddData: PropTypes.func,
  textArrayEntry: PropTypes.number,
  // onChangePosition: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAddData: (id, data) => dispatch(addData(id, data)),
    onChangePosition: (id, position) => dispatch(changePosition(id, position)),
  };
}

export default connect(
  state => ({
    DeckOfSlides: selectDeckOfSlides(state),
    currentSlide: selectCurrentSlide(state),
  }),
  mapDispatchToProps,
)(TextComponent);
