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

import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import './TextEditor.css';

export default function TextEditor({ onChange, initialData }) {
  const handleEditorChange = evt => {
    console.log(evt.editor.getData());
    onChange(evt.editor.getData());
  };
  return (
    <CKEditor
      // this is to prevent an error with the editor that multiple instances of the editor exists
      // eslint-disable-next-line no-return-assign
      onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
      data={initialData}
      config={{
        skin: 'kama',
        toolbar: [
          { name: 'styles', items: ['Format', 'FontSize'] }, // font size not working
          { name: 'colors', items: ['TextColor'] }, // not working
          {
            name: 'basicstyles',
            items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat'], // underline not working
          },
          {
            name: 'paragraph',
            items: [
              'NumberedList',
              'BulletedList',
              'Blockquote',
              '-',
              'JustifyLeft',
              'JustifyCenter',
              'JustifyRight',
              'JustifyBlock',
            ], // the justifies not working
          },
          { name: 'links', items: ['Link', 'Unlink'] },
        ],
      }}
      // type="inline"
      onChange={handleEditorChange}
    />
  );
}

TextEditor.propTypes = {
  onChange: PropTypes.func,
  initialData: PropTypes.string,
};
