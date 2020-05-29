import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import Settings from '../Settings';
import Canvas from '../Canvas';
import SideBar from '../SideBar';
import SavePresentation from '../../SavePresentation';
import LoadPresentation from '../../LoadPresentation';
import { getIsReady } from '../../redux-store/PresentationReducer/selectors';
import { setPresentationMode } from '../../redux-store/PresentationReducer/actions';
import Upload from '../components/image/Upload';
import StyleComponent from '../../StyleComponent';
import ThemeSelector from '../../ThemeSelector';
import PageNotFound from '../../NotFoundPage';

export function Container({ isReady, onSetPresentationMode }) {

  useEffect(() => {
    onSetPresentationMode();
  });

  return (
      <div>
        {isReady ? (
          <div className="parent">
            <Settings className="div1" />
            <SideBar className="div2" />
            <Canvas className="div3" />
            <SavePresentation />
            <LoadPresentation />
            <Upload />
            <StyleComponent />
            <ThemeSelector />
          </div>
        ) :
        (
          <PageNotFound />
        )}
      </div>
  );
}

Container.propTypes = {
  isReady: PropTypes.bool,
  onSetPresentationMode: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onSetPresentationMode: () => dispatch(setPresentationMode(false)),
  };
}

export default connect(
  state => ({
    isReady: getIsReady(state),
  }),
  mapDispatchToProps,
)(Container);
