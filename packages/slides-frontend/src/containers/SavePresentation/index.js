import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import {
  setSaveRequest,
  setTitle,
} from '../redux-store/PresentationReducer/actions';
import {
  getTitle,
} from '../redux-store/PresentationReducer/selectors';
import history from '../../utils/history';

import AlertForSaving from '../Alerts/AlertForSaving';
import success from '../Alerts/success';
import fail from '../Alerts/fail';
import { savePresentation, renamePresentation } from '../../utils/requests';
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

/*
SO
when from browser
send request to server
server --> responds with the blob
frontend uses saveas to give the blob to the user
*/

// returns true or false if everything with the renaming in the background was successful
async function renamePres(assetsPath, username, oldTitle, newTitle, token) {
  if (oldTitle === newTitle) {
    // then no rename
    return true;
  }
  const renaming = renamePresentation(assetsPath, username, oldTitle, newTitle, token).then(res => {
    if (res.data === 'Already Exists') {
      // already exists
      return false;
    }
    return true;
  });
  return renaming.then(() => true).catch(() => false);
}

async function sendSaveRequest(assetsPath, stateStringified, newTitle, token, user) {
  const url = `${assetsPath}/presentation/save`;
  savePresentation(url, stateStringified, user, token)
    .then(response => response.status === 200 && response.data)
    .then(fileAsBuffer => {
      // create the alert so the user can select a filename
      // make a toast here that is successful
      success('Your work has been saved');
      // here i have an arraybuffer
      const blob = new Blob([fileAsBuffer]);
      return saveAs(blob, `${newTitle}.slides`);
    })
    .catch(error => {
      console.log(error);
      // i couldn't make the blob in the backend
      // create an alert for the user
      // `${newTitle}.slides file creation failed...`
      fail(`${newTitle}.slides file creation failed...`);
    });
}

function SavePresentation({
  stateStringified,
  onSaveRequest,
  title,
  onSetTitle,
  user,
  token,
}) {
  // use a save endpoint in the server
  // title and uuid and savereq can be extracted from state
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
    AlertForSaving(title).then(newTitle => {
      if (!newTitle) {
        onSaveRequest();
        return;
      }
      // check if I can rename in the background first
      renamePres(assetsPath, user, title, newTitle, token).then(res => {
        if (!res) {
          // failed
          fail('A Presentation with the same name already exists');
          onSaveRequest();
        } else {
          // set new filename as title in the presentation
          onSetTitle(newTitle);
          // state is not gonna update in time
          const newObj = JSON.parse(stateStringified);
          newObj.presentation.title = newTitle;
          newObj.deck.currentSlide = 0;
          // newObj.router.location.pathname = `/edit/${user}/${newTitle}/`;
          delete newObj.keycloak; 
          delete newObj.router;
          const newStateStringified = JSON.stringify(newObj);
          console.log("newStateStringified", newStateStringified)
          sendSaveRequest(assetsPath, newStateStringified, newTitle, token, user).then(
            () => {
              onSaveRequest();
              // push the new title in the URL bar
              history.push(`/edit/${user}/${newTitle}/`);
            },
          );
        }
      });
    });
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
  onSetTitle: PropTypes.func,
  title: PropTypes.string,
  user: PropTypes.string,
  token: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSaveRequest: () => dispatch(setSaveRequest(false)),
    onSetTitle: title => dispatch(setTitle(title)),
  };
}

export default connect(
  state => ({
    stateStringified: JSON.stringify(state),
    title: getTitle(state),
    user: state.keycloak.userToken.cern_upn,
    token: state.keycloak.instance.token,
  }),
  mapDispatchToProps,
)(SavePresentation);

// const sendToUser = () => {
//   // I need to make the body of the post request and send a request that includes the params
//   const url = `${assetsPath}/save`;
//   post(
//     url,
//     { state: stateStringified },
//     { headers: { 'Content-Type': 'application/json' }, Authorization: `Bearer ${token}` },
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
