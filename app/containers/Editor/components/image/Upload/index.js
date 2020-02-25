import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Button, Progress, Icon, Message } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react';

import Dropzone from './Dropzone';
import { getImgUploadRequest } from '../../../../redux-store/PresentationReducer/selectors';

// check where can i store the images
export function Upload({ uploadRequest }) {
  console.log('uploadRequest: ', uploadRequest);
  return (
    <Modal dimmer="blurring" open={uploadRequest}>
      <Modal.Header>Upload an Image</Modal.Header>
      <Modal.Content>
        <Dropzone />
      </Modal.Content>
    </Modal>
  );
}

Upload.propTypes = {
  uploadRequest: PropTypes.bool,
};

export default connect(
  state => ({
    uploadRequest: getImgUploadRequest(state),
  }),
  null,
)(Upload);
