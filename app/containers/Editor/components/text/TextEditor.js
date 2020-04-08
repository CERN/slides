// import React from 'react';
// import PropTypes from 'prop-types';
// // import style manually
// import './TextEditor.css';
// import 'react-trumbowyg/dist/trumbowyg.min.css';
// import Trumbowyg from 'react-trumbowyg';

// export default function TextEditor({ onChange, initialData }) {
//   // const handleEditorChange = e => {
//   //   console.log('handleEditorChange', e.target.innerHTML);
//   //   // onChange(e.target.innerHTML);
//   // };

//   const handleEditorChange = e => {
//     const nodeList = e.currentTarget.childNodes;
//     const res = Array.from(nodeList).reduce((content, node) => {
//       if (node.nodeType === 1) {
//         return content + node.outerHTML;
//       }
//       if (node.nodeType === 3) {
//         return `${content}<p>${node.textContent}</p>`;
//       }
//       return content;
//     }, '');
//     console.log('ressssssssssss', res);
//     onChange(res);
//   };

//   return (
//     <Trumbowyg
//       id="react-trumbowyg"
//       name="input-box"
//       autogrow
//       // placeholder="Type your text!"
//       buttons={[
//         ['formatting'],
//         ['strong', 'em', 'del'],
//         ['superscript', 'subscript'],
//         ['link'],
//         ['table'],
//         ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
//         ['unorderedList', 'orderedList'],
//         ['removeformat'],
//       ]}
//       // data={initialData}
//       value={initialData}
//       data={!initialData ? '' : undefined} // <- This is the important part
//       onChange={handleEditorChange}
//     />
//   );
// }

// TextEditor.propTypes = {
//   onChange: PropTypes.func,
//   initialData: PropTypes.string,
// };

// // config={{
// //   skin: 'kama',
// //   toolbar: [
// //     { name: 'styles', items: ['Format', 'FontSize'] }, // font size not working
// //     { name: 'colors', items: ['TextColor'] }, // not working
// //     {
// //       name: 'basicstyles',
// //       items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat'], // underline not working
// //     },
// //     {
// //       name: 'paragraph',
// //       items: [
// //         'NumberedList',
// //         'BulletedList',
// //         'Blockquote',
// //         '-',
// //         'JustifyLeft',
// //         'JustifyCenter',
// //         'JustifyRight',
// //         'JustifyBlock',
// //       ], // the justifies not working
// //     },
// //     { name: 'links', items: ['Link', 'Unlink'] },
// //   ],
// // }}

// import React from 'react';
// import PropTypes from 'prop-types';
// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles
// // import 'react-summernote/lang/summernote-en-EN'; // you can import any other locale

// // Import bootstrap(v3 or v4) dependencies
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/tooltip';
// import 'bootstrap/dist/css/bootstrap.css';

// import './TextEditor.css';

// export default function TextEditor({ onChange, initialData }) {
//   // const handleEditorChange = evt => {
//   //   console.log(evt.editor.getData());
//   //   onChange(evt.editor.getData());
//   // };
//   const onDataChange = content => {
//     console.log('onDataChange', content);
//     onChange(content);
//   };

//   return (
//     <ReactSummernote
//       value=""
//       placeholder="Holder"
//       options={{
//         // lang: 'en-EN',
//         height: 350,
//         // airMode: true, this is for inline
//         popover: {
//           image: [],
//           link: [],
//           air: [],
//         },
//         // popover disable annoying popover
//         dialogsInBody: true,
//         fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
//         styleTags: ['p', 'h1', 'h2', 'h3'],
//         // fontsize: [15, 20, 25, 30, 35],
//         // fontSize: 20,
//         lineHeights: ['0.0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0'],
//         toolbar: [
//           ['style', ['style']],
//           ['fontname', ['fontname']],
//           [
//             'font',
//             [
//               'bold',
//               'italic',
//               'underline',
//               'clear',
//               'strikethrough',
//               'superscript',
//               'subscript',
//             ],
//           ],
//           ['fontsize', ['fontsize']],
//           // ['color', ['color']],
//           ['para', ['ul', 'ol', 'paragraph', 'height']],
//           ['insert', ['table', 'link', 'video', 'hr']],
//         ],
//       }}
//       onChange={onDataChange}
//     />
//   );
// }

// TextEditor.propTypes = {
//   onChange: PropTypes.func,
//   initialData: PropTypes.string,
// };

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TextEditor.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { editorConfig } from './editorConfig';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default function TextEditor({ onChange, initialData }) {
  const handleEditorChange = newState => {
    setEditorState(newState);
    const myhtml = draftToHtml(convertToRaw(newState.getCurrentContent()));
    console.log('myhtml,,,,,,,,', myhtml);
    onChange(myhtml);
  };
  const contentBlock = htmlToDraft(initialData);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(contentBlock.contentBlocks),
    ),
  );

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbar={editorConfig}
        placeholder="start typing..."
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleEditorChange}
      />
    </div>
  );
}

TextEditor.propTypes = {
  onChange: PropTypes.func,
  initialData: PropTypes.string,
};
