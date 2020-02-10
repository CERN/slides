import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'axios';

import { selectLoadRequest } from '../Editor/redux-store/selectors';
import { setLoadRequest, loadState } from '../Editor/redux-store/actions';

// when i load the state how can i put it in my state?
function LoadPresentation({ onLoadRequest, loadRequest }) {
  // use a load endpoint in the server
  // fix UI and redux is correct and server api more or less ready
  const Load = () => {
    // I need to make the body of the post request and send a request that includes the params
    //     const url = `${assetsPath}/save`;
    //     get(
    //       url,
    //       { state: stateStringified },
    //       { headers: { 'Content-Type': 'application/json' } },
    //     )
    //       .then(response => {
    //         console.log('response:', response);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //     onLoadRequest();
    // make my get request in the server
    // check if the respone is good
    // extract the state information and call the loadstate action to copy the whole string to the current state
  };
  if (loadRequest) Load();

  return <div />;
}

LoadPresentation.propTypes = {
  onLoadRequest: PropTypes.func,
  loadRequest: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoadRequest: () => dispatch(setLoadRequest(false)),
    onLoadState: state => dispatch(loadState(state)),
  };
}

export default connect(
  state => ({
    loadRequest: selectLoadRequest(state),
  }),
  mapDispatchToProps,
)(LoadPresentation);
