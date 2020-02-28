import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import { Grid, GridColumn } from 'semantic-ui-react';
import { ToastProvider } from 'react-toast-notifications';
import Settings from '../Settings';
import Canvas from '../Canvas';
import SideBar from '../SideBar';
import LandingPage from '../LandingPage';
import SavePresentation from '../../SavePresentation';
import LoadPresentation from '../../LoadPresentation';
import { getIsReady } from '../../redux-store/PresentationReducer/selectors';
import { Upload } from '../components/image/Upload';

export function Container({ isReady }) {
  return (
    <ToastProvider>
      <div>
        {isReady ? (
          <div className="container">
            <Grid>
              <GridColumn className="settings">
                <Settings />
              </GridColumn>
              <GridColumn className="sidebar">
                <SideBar />
              </GridColumn>
              <GridColumn className="canvas">
                <Canvas />
              </GridColumn>
            </Grid>
            <SavePresentation />
            <Upload />
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
