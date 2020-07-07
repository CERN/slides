import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal} from 'semantic-ui-react';

import Dropzone from './Dropzone';
import {getImgUploadRequest} from '../../../../redux-store/PresentationReducer/selectors';

function Upload({uploadRequest}) {
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
  null
)(Upload);
