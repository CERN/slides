import React, { useEffect, useState, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import axios, { post } from 'axios';

import { uploadImageRequest, addImage } from '../../../redux-store/actions';
import './Dropzone.css';
import BMF from 'browser-md5-file';
// Add notification and check System

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};
export function Dropzone({ onImageRequest, onAddImage }) {
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
    const url = 'http://localhost:3000/upload';
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
    filesUpload().then(response => {
      console.log('The response is: ', response.data);
    });
    // Save images in Redux Store
    // find md5 of the file and append name
    files.forEach(f => {
      const bmf = new BMF();
      bmf.md5(f, (err, hash) => {
        console.log('DROPZONE === md5 string:', hash);
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
        <p>Drag 'n' drop some files here, or click to select files</p>
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
};

function mapDispatchToProps(dispatch) {
  return {
    onImageRequest: () => dispatch(uploadImageRequest(false)),
    onAddImage: src => dispatch(addImage(src)),
  };
}

export default connect(
  state => ({
    bull: JSON.stringify(state),
  }),
  mapDispatchToProps,
)(Dropzone);
