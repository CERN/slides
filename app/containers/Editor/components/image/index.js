import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications, { notify } from 'react-notify-toast';
import Spinner from './Spinner';
import Images from './Images';
import uploadImages from './UploadImages';
import { uploadImageRequest } from '../../redux-store/actions';
import { selectPendingImageUploadRequests } from '../../redux-store/selectors';

// import { API_URL } from './config';
import './index.css';

const toastColor = {
  background: '#505050',
  text: '#fff',
};

// make the upload image functionality tomorrow
// https://github.com/LukasMarx/react-file-upload

export function MyImage({ onImageRequest, uploadRequests }) {
  const [uploading, setUploading] = useState(false);
  let images = [];
  const toast = notify.createShowQueue();

  const onChange = e => {
    console.log('eimai st6hn onchange');
    const errs = [];
    const files = Array.from(e.target.files);

    // check if there are too many files
    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time';
      return toast(msg, 'custom', 2000, toastColor);
    }

    const formData = new FormData(); // maybe change this with semantic-ui
    const types = ['image/png', 'image/jpeg', 'image/gif'];

    files.forEach((file, i) => {
      // #2 Catching wrong file types on the client
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
      }

      // #3 Catching files that are too large on the client
      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`);
      }

      formData.append(i, file);
    });

    if (errs.length) {
      return errs.forEach(err => toast(err, 'custom', 2000, toastColor));
    }
    // after all tests passed, start uploading

    setUploading(true);
    uploadImages(files);
    onImageRequest();
    // upload
    // fetch(`${API_URL}/image-upload`, {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then(res => {
    //     if (!res.ok) {
    //       throw res;
    //     }
    //     return res.json();
    //   })
    //   .then(i => {
    //     setUploading(false);
    //     images.push(i);
    //   })
    //   .catch(err => {
    //     err.json().then(e => {
    //       toast(e.message, 'custom', 2000, toastColor);
    //       setUploading(false);
    //     });
    //   });
  };

  useEffect(
    e => {
      if (uploadRequests === 1) onChange(e);
    },
    [uploadRequests],
  );

  const filter = id => images.filter(i => i.public_id !== id);

  const removeImage = id => {
    images = filter(id);
  };

  const onError = id => {
    toast('Oops, something went wrong', 'custom', 2000, toastColor);
    images = filter(id);
  };

  const content = () => {
    // eslint-disable-next-line default-case
    switch (true) {
      case uploading:
        return <Spinner />;
      case images.length > 0:
        return (
          <Images images={images} removeImage={removeImage} onError={onError} />
        );
    }
  };

  return (
    <div className="container">
      <Notifications />
      <div className="Button">{content()}</div>
    </div>
  );
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
