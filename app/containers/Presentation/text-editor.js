import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addData } from './actions';
import { selectCurrentTextArray } from './selectors';

function TextEditor({ textArrayEntry, currentTextArray, onAddData }) {
  console.log('editorrrrrrrrrrrr', textArrayEntry, currentTextArray);
  const [value, setValue] = useState(currentTextArray[textArrayEntry].data);
  const handleChange = event => {
    setValue(event.target.value);
  };

  return <textarea value={value} onChange={handleChange} />;
}

TextEditor.propTypes = {
  textArrayEntry: PropTypes.number,
  currentTextArray: PropTypes.array,
  onAddData: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAddData: (id, data) => dispatch(addData(id, data)),
  };
}

export default connect(
  state => ({
    currentTextArray: selectCurrentTextArray(state),
  }),
  mapDispatchToProps,
)(TextEditor);

// transparent background , another editor, send back only when clicked outside the area only then update the text
// try again with ckeditor , or React Draft WYSIWYG, dante2 dante2 seems promising
