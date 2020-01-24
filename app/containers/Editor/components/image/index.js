import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Images from './Images';
import Upload from './Uploader/Upload';
import { uploadImageRequest } from '../../redux-store/actions';
import { selectPendingImageUploadRequests } from '../../redux-store/selectors';

// import { API_URL } from './config';
import './index.css';

// make the upload image functionality tomorrow
// https://github.com/LukasMarx/react-file-upload

// I will render the current Images
// I will render the Uploader component
export function MyImage({ onImageRequest, uploadRequests }) {
  const [uploading, setUploading] = useState(false);
  const images = [];

  // const onChange = () => {
  //   console.log('eimai sthn onchange');
  //   setUploading(true);
  //   onImageRequest();
  // };

  // useEffect(() => {
  //   if (uploadRequests === 1) onChange();
  // }, [uploadRequests]);

  // const filter = id => images.filter(i => i.public_id !== id);

  // const removeImage = id => {
  //   images = filter(id);
  // };

  // const onError = id => {
  //   toast('Oops, something went wrong', 'custom', 2000, toastColor);
  //   images = filter(id);
  // };

  // const content = () => {
  //   // eslint-disable-next-line default-case
  //   switch (true) {
  //     case uploading:
  //       return <Spinner />;
  //     case images.length > 0:
  //       return (
  //         <Images images={images} removeImage={removeImage} onError={onError} />
  //       );
  //   }
  // };

  return <Upload />;
}

MyImage.propTypes = {
  onImageRequest: PropTypes.func,
  uploadRequests: PropTypes.number,
};

function mapDispatchToProps(dispatch) {
  return {
    onImageRequest: () => dispatch(uploadImageRequest(-1)),
  };
}

export default connect(
  state => ({
    uploadRequests: selectPendingImageUploadRequests(state),
  }),
  mapDispatchToProps,
)(MyImage);
