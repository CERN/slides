import React from 'react';
import Images from './Images';
import Upload from './Upload';

// I will render the current Images
// I will render the Uploader component
export default function MyImage() {
  return (
    <div>
      <Upload />
      <Images />
    </div>
  );
}
