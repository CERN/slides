import React from 'react';
import PropTypes from 'prop-types';

import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor({ initialContent, textUpdateFunction }) {
  const handleEditorChange = e => {
    console.log('Content was updated:', e.target.getContent());
    textUpdateFunction(e.target.getContent());
  };

  return (
    <Editor
      initialValue={initialContent}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
      }}
      onChange={handleEditorChange}
    />
  );
}

TextEditor.propTypes = {
  initialContent: PropTypes.string,
  textUpdateFunction: PropTypes.func,
};

// transparent background , another editor, send back only when clicked outside the area only then update the text
