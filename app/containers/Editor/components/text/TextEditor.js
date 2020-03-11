import React from 'react';
import PropTypes from 'prop-types';
// import style manually
import './TextEditor.css';
import 'react-trumbowyg/dist/trumbowyg.min.css';
import Trumbowyg from 'react-trumbowyg';

export default function TextEditor({ onChange, initialData }) {
  // const handleEditorChange = evt => {
  //   console.log('handleEditorChange', evt.editor.getData());
  //   onChange(evt.editor.getData());
  // };

  return <Trumbowyg id="react-trumbowyg" />;
}

TextEditor.propTypes = {
  onChange: PropTypes.func,
  initialData: PropTypes.string,
};

// config={{
//   skin: 'kama',
//   toolbar: [
//     { name: 'styles', items: ['Format', 'FontSize'] }, // font size not working
//     { name: 'colors', items: ['TextColor'] }, // not working
//     {
//       name: 'basicstyles',
//       items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat'], // underline not working
//     },
//     {
//       name: 'paragraph',
//       items: [
//         'NumberedList',
//         'BulletedList',
//         'Blockquote',
//         '-',
//         'JustifyLeft',
//         'JustifyCenter',
//         'JustifyRight',
//         'JustifyBlock',
//       ], // the justifies not working
//     },
//     { name: 'links', items: ['Link', 'Unlink'] },
//   ],
// }}
