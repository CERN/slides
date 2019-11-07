import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Rnd } from 'react-rnd';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Input } from 'semantic-ui-react';
import { selectDeckOfSlides, selectCurrentSlide } from './selectors';
import { addData } from './actions';

export function MyText({ DeckOfSlides, currentSlide, onAddData }) {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px blue',
    background: 'transparent',
  };
  const [text, setText] = useState(
    DeckOfSlides[currentSlide].textArray[0].data,
  );
  const onChangeFunc = evt => {
    setText(evt.target.value);
    onAddData(evt.target.value);
  };
  return (
    <Rnd
      style={style}
      default={{
        x: 600,
        y: 500,
        width: 500,
        height: 70,
      }}
      bounds="parent"
    >
      <Input
        transparent
        // placeholder="Type something..."
        value={text}
        onChange={onChangeFunc}
      />
      {/* <CKEditor type="inline" data="<p>This is a CKEditor 5 WYSIWYG editor instance created by ️⚛️ React.</p>" />, */}

      {/* <ReactQuill value={text} onChange={handleChange} modules={modules} formats={formats} placeholder="Type your text here" /> */}
    </Rnd>
  );
}

MyText.propTypes = {
  DeckOfSlides: PropTypes.array,
  currentSlide: PropTypes.number,
  onAddData: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAddData: data => dispatch(addData(data)),
  };
}

export default connect(
  state => ({
    DeckOfSlides: selectDeckOfSlides(state),
    currentSlide: selectCurrentSlide(state),
  }),
  mapDispatchToProps,
)(MyText);
