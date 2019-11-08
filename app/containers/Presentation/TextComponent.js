import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { Rnd } from 'react-rnd';
import CKEditor from 'ckeditor4-react';
import { selectDeckOfSlides, selectCurrentSlide } from './selectors';
import { addData } from './actions';
import './styles.css';

// change current text when i should
export function TextComponent({
  DeckOfSlides,
  currentSlide,
  onAddData,
  textArrayEntry,
}) {
  // const style = {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // border: 'solid 1px blue',
  //   // background: 'transparent',
  // };
  const [text, setText] = useState(
    DeckOfSlides[currentSlide].textArray[textArrayEntry].data,
  );
  const onChangeFunc = evt => {
    setText(evt.editor.getData());
    onAddData(textArrayEntry, evt.editor.getData());
  };
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
    //   minWidth={500}
    //   minHeight={70}
    //   bounds="body"
    // >
    //   <div>
    <CKEditor data={text} type="inline" onChange={onChangeFunc} />
    //   </div>
    // </Rnd>
  );
}

TextComponent.propTypes = {
  DeckOfSlides: PropTypes.array,
  currentSlide: PropTypes.number,
  onAddData: PropTypes.func,
  textArrayEntry: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAddData: (id, data) => dispatch(addData(id, data)),
  };
}

export default connect(
  state => ({
    DeckOfSlides: selectDeckOfSlides(state),
    currentSlide: selectCurrentSlide(state),
  }),
  mapDispatchToProps,
)(TextComponent);
