import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { addData } from './actions';
import { selectCurrentTextArray } from './selectors';

function TextEditor({ textArrayEntry, currentTextArray, onAddData }) {
  const onChange = content => {
    console.log('onChange', content);
  };

  return (
    <ReactSummernote
      value=""
      options={{
        lang: 'en-EN',
        height: 350,
        dialogsInBody: true,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['fontname', ['fontname']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview']],
        ],
      }}
      onChange={onChange}
    />
  );
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
