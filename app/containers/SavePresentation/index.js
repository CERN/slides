import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { post } from 'axios';
import { setSaveRequest } from '../Editor/redux-store/actions';

// when i load the state how can i put it in my state?
// DONT STORE IN THE CLIENT SIDE, STORE IN THE SERVER SIDE IN EOS USING FS

function SavePresentation({ stateStringified, onSaveRequest }) {
  // use a save endpoint in the server
  // title and uuid and savereq can be extracted from state
  const obj = JSON.parse(stateStringified);
  const { assetsPath, saveRequest } = obj.global;

  const Save = () => {
    // I need to make the body of the post request and send a request that includes the params
    const url = `${assetsPath}/save`;
    post(
      url,
      { state: stateStringified },
      { headers: { 'Content-Type': 'application/json' } },
    )
      .then(response => {
        console.log('response:', response);
      })
      .catch(error => {
        console.log(error);
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
