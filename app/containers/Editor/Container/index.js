import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import { ToastProvider } from 'react-toast-notifications';
import Settings from '../Settings';
import Canvas from '../Canvas';
import SideBar from '../SideBar';
import LandingPage from '../LandingPage';
import SavePresentation from '../../SavePresentation';
import LoadPresentation from '../../LoadPresentation';
import { getIsReady } from '../../redux-store/PresentationReducer/selectors';
import Upload from '../components/image/Upload';
import StyleComponent from '../../StyleComponent';

export function Container({ isReady }) {
  return (
    <ToastProvider>
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
          </div>
        ) : (
          <div className="themeSelector">
            <div className="inside">
              <LandingPage />
              <LoadPresentation />
            </div>
          </div>
        )}
      </div>
    </ToastProvider>
  );
}

Container.propTypes = {
  isReady: PropTypes.bool,
};

export default connect(
  state => ({
    isReady: getIsReady(state),
  }),
  null,
)(Container);
