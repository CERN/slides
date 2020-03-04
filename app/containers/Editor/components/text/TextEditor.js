import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
// import style manually
import './TextEditor.css';

export default function TextEditor({ onChange, initialData }) {
  const handleEditorChange = evt => {
    console.log('handleEditorChange', evt.editor.getData());
    onChange(evt.editor.getData());
  };

  return (
    <div>
      <CKEditor
        onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
        data={initialData}
        type="inline"
        onChange={handleEditorChange}
        className="text-editor"
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
      />
    </div>
  );
}

TextEditor.propTypes = {
  onChange: PropTypes.func,
  initialData: PropTypes.string,
};
