import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import './TextEditor.css';

export default function TextEditor({ onChange, initialData }) {
  const handleEditorChange = e => {
    console.log(e.target.getContent());
    onChange(e.target.getContent());
  };
  return (
    <Editor
      initialValue={initialData}
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
  onChange: PropTypes.func,
  initialData: PropTypes.string,
};
