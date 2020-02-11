import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { post } from 'axios';
import { useDropzone } from 'react-dropzone';
import { Modal, Button, Icon } from 'semantic-ui-react';
import {
  selectLoadRequest,
  selectAssetsPath,
} from '../Editor/redux-store/selectors';
import {
  setLoadRequest,
  loadState,
  setIsReady,
} from '../Editor/redux-store/actions';
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
  thumbsContainer,
} from '../Editor/styles';
import './index.css';
// load will be a post request
// make possible to upload only one presentation at a point
// when i load the state how can i put it in my state?
// I do something wrong with the image extracting check it
function LoadPresentation({
  onLoadRequest,
  loadRequest,
  onSetIsReady,
  assetsPath,
}) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: '.slides',
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject],
  );
  // use a load endpoint in the server
  // so get the .slides
  // send it as post in server
  // server extracts, saves the images
  // send as response the stringified state
  // frontend sets the state that it got using a redux dispatch action
  // fix UI and redux is correct and server api more or less ready
  const presentationUpload = () => {
    // const url = 'http://localhost:3000/load';
    const url = `${assetsPath}/load`;
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return post(url, formData, config);
  };
  const sendLoadRequest = e => {
    e.preventDefault();

    // the response is correct
    presentationUpload().then(response => {
      console.log(
        'The response should be the string of the state or the object check: ',
        response.data.state.reduxStateOBJ,
      );
    });
    // extract the state information and call the loadstate action to copy the whole string to the current state
    // now that the request is done I can say I am ready for and can move from landing page
    onLoadRequest();
    onSetIsReady();
  };
  const onCancelHandler = () => {
    onLoadRequest();
  };
  const acceptedFilesItems = acceptedFiles.map(file => (
    // presentation icon
    <div key={file.path}>
      <h4>Presentation:</h4>
      <Icon name="file" /> {file.path} - {file.size} bytes
    </div>
  ));
  // return a window to upload a file from local computer
  // check that it is .slides and send it to load endpoint and try to open and process it, if it is not processed show an error message
  return (
    <Modal dimmer="blurring" open={loadRequest}>
      <Modal.Header>Load Presentation</Modal.Header>
      <Modal.Content>
        <div className="dropzone">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>
              Drag 'n' drop a presentation file here, or click to select file
            </p>
            <em>(Only *.slides presentations will be accepted)</em>
          </div>
          <aside style={thumbsContainer}>{acceptedFilesItems}</aside>
          <Button color="red" onClick={onCancelHandler}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={sendLoadRequest}>
            <Icon name="checkmark" /> Upload
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}

LoadPresentation.propTypes = {
  onLoadRequest: PropTypes.func,
  loadRequest: PropTypes.bool,
  onSetIsReady: PropTypes.func,
  assetsPath: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoadRequest: () => dispatch(setLoadRequest(false)),
    onLoadState: state => dispatch(loadState(state)),
    onSetIsReady: () => dispatch(setIsReady(true)),
  };
}

export default connect(
  state => ({
    loadRequest: selectLoadRequest(state),
    assetsPath: selectAssetsPath(state),
  }),
  mapDispatchToProps,
)(LoadPresentation);
