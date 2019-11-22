import React, { useState } from 'react';
import { Slide } from 'spectacle';
import { Rnd } from 'react-rnd';
import { Input } from 'semantic-ui-react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function NewText() {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px blue',
    background: 'transparent',
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
      <Input transparent placeholder="Type something...">
        {/* <CKEditor type="inline" data="<p>This is a CKEditor 5 WYSIWYG editor instance created by ️⚛️ React.</p>" />, */}
      </Input>

      {/* <ReactQuill value={text} onChange={handleChange} modules={modules} formats={formats} placeholder="Type your text here" /> */}
    </Rnd>
  );
}

export default NewText;
