import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { post } from 'axios';
import BMF from 'browser-md5-file';
import { selectAssetsPath } from '../../../redux-store/selectors';

import { uploadImageRequest, addImage } from '../../../redux-store/actions';
import './Dropzone.css';
import {
  thumbsContainer,
  thumb,
  thumbInner,
  img,
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from '../../../styles';
// Add notification and check System

export function Dropzone({ onImageRequest, onAddImage, assetsPath }) {
  // and include it as a parameter above
  // console.log('state: ', bull);
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject],
  );

  const filesUpload = () => {
    // const url = 'http://localhost:3000/upload';
    const url = `${assetsPath}/upload`;
    const formData = new FormData();
    files.forEach(f => formData.append('file', f));
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return post(url, formData, config);
  };

  const onUploadHandler = e => {
    e.preventDefault();
    // now i got some files
    // Upload Files in the server
    filesUpload();
    // Save images in Redux Store
    // find md5 of the file and append name
    files.forEach(f => {
      const bmf = new BMF();
      bmf.md5(f, (err, hash) => {
        onAddImage(`${hash}-${f.name}`);
      });
    });
    // destroy the reference to all of the files
    files.forEach(file => URL.revokeObjectURL(file.preview));
    // done! So notify Redux Store
    onImageRequest();
  };

  const onCancelHandler = e => {
    e.preventDefault();
    // notify Redux Store we are done with image Uploading the request is not valid anymore
    onImageRequest();
  };

  return (
    <div className="dropzone">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an Image here, or click to select from files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <Button color="red" onClick={onCancelHandler}>
        <Icon name="remove" /> Cancel
      </Button>
      <Button color="green" onClick={onUploadHandler}>
        <Icon name="checkmark" /> Upload
      </Button>
    </div>
  );
}

Dropzone.propTypes = {
  onImageRequest: PropTypes.func,
  onAddImage: PropTypes.func,
  assetsPath: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    onImageRequest: () => dispatch(uploadImageRequest(false)),
    onAddImage: src => dispatch(addImage(src)),
  };
}

export default connect(
  state => ({
    assetsPath: selectAssetsPath(state),
  }),
  mapDispatchToProps,
)(Dropzone);
