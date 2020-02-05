import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Button, Progress, Icon, Message } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react';

// import Notifications, { notify } from 'react-notify-toast';
import Dropzone from './Dropzone';
import { selectPendingImageUploadRequest } from '../../../redux-store/selectors';

// check where can i store the images
export function Upload({ uploadRequest }) {
  const [uploading, setUploading] = useState(uploadRequest);
  useEffect(() => {
    setUploading(uploadRequest);
  }, [uploadRequest]);

  return (
    <Modal dimmer="blurring" open={uploading}>
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
    uploadRequest: selectPendingImageUploadRequest(state),
  }),
  null,
)(Upload);
