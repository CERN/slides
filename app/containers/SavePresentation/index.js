import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { post } from 'axios';
import { useToasts } from 'react-toast-notifications';

import { setSaveRequest } from '../redux-store/PresentationReducer/actions';
const zip = require('jszip')();

// i first need to init and load

// when i load the state how can i put it in my state?
// DONT STORE IN THE CLIENT SIDE, STORE IN THE SERVER SIDE IN EOS USING FS

// create the presentation.JSON
// create the folder with the images
// put them all together
// zip it as a blob
// add it in formdata
// give it to phoenix

// it is not working it gives the backend an empty formdata
const sendFileToPhoenix = stateStringified => {
  zip.file('presentation.JSON', stateStringified);
  zip
    .generateAsync({
      type: 'blob',
      mimeType: 'application/slides',
    })
    .then(content => {
      console.log('blob ...', typeof content, content.arrayBuffer());
      const formData = new FormData();
      formData.append('content', content);

      const req = new Map();

      req.set('event', 'save');
      req.set('slidesFile', formData);

      window.parent.postMessage(
        req,
        '*', // consider changing '*' to specific target
      );
    });
};

function SavePresentation({ stateStringified, onSaveRequest }) {
  // use a save endpoint in the server
  // title and uuid and savereq can be extracted from state
  const { addToast } = useToasts();
  const obj = JSON.parse(stateStringified);
  const { assetsPath, saveRequest } = obj.presentation;
  const Save = () => {
    // I need to make the body of the post request and send a request that includes the params
    //   const url = `${assetsPath}/save`;
    //   post(
    //     url,
    //     { state: stateStringified },
    //     { headers: { 'Content-Type': 'application/json' } },
    //   )
    //     .then(response => {
    //       // console.log('response:', response);
    //       if (response.status === 200) {
    //         // notify with success
    //         addToast(`Saved successfully! 😊`, {
    //           appearance: 'success',
    //           autoDismiss: true,
    //         });
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       addToast('Saving Failed...', {
    //         appearance: 'error',
    //         autoDismiss: true,
    //       });
    //     });
    //   onSaveRequest();
    // Show I have to send a save event for the phoenix to get it and execute the saving back in cernbox
    // send xml give the correct thing in xml field
    sendFileToPhoenix(stateStringified);
    window.onmessage = message => {
      alert('got something', message);
    };
  };
  if (saveRequest) Save();

  return <div />;
}
// notifications maybe in the backend

SavePresentation.propTypes = {
  stateStringified: PropTypes.string,
  onSaveRequest: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSaveRequest: () => dispatch(setSaveRequest(false)),
  };
}

export default connect(
  state => ({
    stateStringified: JSON.stringify(state),
  }),
  mapDispatchToProps,
)(SavePresentation);
