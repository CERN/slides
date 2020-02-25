import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { post } from 'axios';
import { useToasts } from 'react-toast-notifications';

import { setSaveRequest } from '../redux-store/PresentationReducer/actions';

// when i load the state how can i put it in my state?
// DONT STORE IN THE CLIENT SIDE, STORE IN THE SERVER SIDE IN EOS USING FS

function SavePresentation({ stateStringified, onSaveRequest }) {
  // use a save endpoint in the server
  // title and uuid and savereq can be extracted from state
  const { addToast } = useToasts();
  const obj = JSON.parse(stateStringified);
  const { assetsPath, saveRequest } = obj.presentation;

  const Save = () => {
    // I need to make the body of the post request and send a request that includes the params
    const url = `${assetsPath}/save`;
    post(
      url,
      { state: stateStringified },
      { headers: { 'Content-Type': 'application/json' } },
    )
      .then(response => {
        // console.log('response:', response);
        if (response.status === 200) {
          // notify with success
          addToast(`Saved successfully! 😊`, {
            appearance: 'success',
            autoDismiss: true,
          });
        }
      })
      .catch(error => {
        console.log(error);
        addToast('Saving Failed...', {
          appearance: 'error',
          autoDismiss: true,
        });
      });

    onSaveRequest();
  };
  if (saveRequest) Save();

  return <div />;
}

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
