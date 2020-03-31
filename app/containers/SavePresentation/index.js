import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { post } from 'axios';
import { useToasts } from 'react-toast-notifications';

import { saveAs } from 'file-saver';
import { setSaveRequest } from '../redux-store/PresentationReducer/actions';
import { getTitle } from '../redux-store/PresentationReducer/selectors';
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

const makeZip = (stateStringified, title) => {
  zip.file('presentation.JSON', stateStringified);
  zip.folder('assets');
  zip
    .generateAsync({
      type: 'blob',
      mimeType: 'application/slides',
    })
    .then(blob => {
      saveAs(blob, `${title}.slides`);
    });
};
/*
SO
when from browser
send request to server
server --> responds with the blob
frontend uses saveas to give the blob to the user
*/
function SavePresentation({ stateStringified, onSaveRequest, title }) {
  // use a save endpoint in the server
  // title and uuid and savereq can be extracted from state
  const { addToast } = useToasts();
  const obj = JSON.parse(stateStringified);
  const { assetsPath, saveRequest } = obj.presentation;

  // it is not working it gives the backend an empty formdata
  const sendToPhoenix = () => {
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
        onSaveRequest();
      });
  };

  const sendToUser = () => {
    // make a blob and save it locally give it to user for download
    // I need to make the body of the post request and send a request that includes the params
    const url = `${assetsPath}/save`;
    post(
      url,
      { state: JSON.parse(stateStringified) },
      {
        headers: {
          Accept: 'application/slides',
        },
        responseType: 'arraybuffer',
      },
    )
      .then(response => response.status === 200 && response.data)
      .then(fileAsBuffer => {
        // notify with success
        addToast(`Saved successfully! 😊`, {
          appearance: 'success',
          autoDismiss: true,
        });
        // here i have an arraybuffer
        const blob = new Blob([fileAsBuffer]);
        return saveAs(blob, `${title}.slides`);
      })
      .catch(error => {
        console.log(error);
        // i couldn't make the blob in the backend
        addToast('Saving Failed...', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
    onSaveRequest();
  };

  const Save = () => {
    // First of all, see if I am using Browser of Phoenix
    if (JSON.parse(stateStringified).presentation.isPhoenixMode) {
      sendToPhoenix();
    } else {
      sendToUser();
    }
  };
  if (saveRequest) Save();

  return <div />;
}

SavePresentation.propTypes = {
  stateStringified: PropTypes.string,
  onSaveRequest: PropTypes.func,
  title: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSaveRequest: () => dispatch(setSaveRequest(false)),
  };
}

export default connect(
  state => ({
    stateStringified: JSON.stringify(state),
    title: getTitle(state),
  }),
  mapDispatchToProps,
)(SavePresentation);

// const sendToUser = () => {
//   // I need to make the body of the post request and send a request that includes the params
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
// };
