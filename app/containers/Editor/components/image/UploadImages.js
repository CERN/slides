import React from 'react';
import PropTypes from 'prop-types';

export default function UploadImages({ files }) {
  console.log('the files i got in UploadImages', files);
  return files;
}
UploadImages.propTypes = {
  files: PropTypes.array,
};
