import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import './TextEditor.css';

export default function TextEditor({ onChange, initialData }) {
  const handleEditorChange = evt => {
    onChange(evt.editor.getData());
  };
  return (
    <CKEditor
      // this is to prevent an error with the editor that multiple instances of the editor exists
      // eslint-disable-next-line no-return-assign
      onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
      data={initialData}
      config={{
        uiColor: '#0053A1',
        toolbar: [
          {
            name: 'clipboard',
            items: [
              'Cut',
              'Copy',
              'Paste',
              'PasteText',
              'PasteFromWord',
              '-',
              'Undo',
              'Redo',
            ],
          },
          {
            name: 'basicstyles',
            items: [
              'Bold',
              'Italic',
              'Underline',
              'Strike',
              'Subscript',
              'Superscript',
              '-',
              'CopyFormatting',
              'RemoveFormat',
            ],
          },
          {
            name: 'paragraph',
            items: [
              'NumberedList',
              'BulletedList',
              '-',
              'Blockquote',
              'CreateDiv',
              '-',
              'JustifyLeft',
              'JustifyCenter',
              'JustifyRight',
              'JustifyBlock',
              '-',
              'BidiLtr',
              'BidiRtl',
              'Language',
            ],
          },
          { name: 'links', items: ['Link', 'Unlink'] },
          { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
          { name: 'colors', items: ['TextColor', 'BGColor'] },
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
