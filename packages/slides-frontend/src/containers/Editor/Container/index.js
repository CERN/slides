import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import './index.css';
import Settings from '../Settings';
import Canvas from '../Canvas';
import SideBar from '../SideBar';
import SavePresentation from '../../SavePresentation';
import LoadPresentation from '../../LoadPresentation';
import {getIsReady, getTitle} from '../../redux-store/PresentationReducer/selectors';
import {setPresentationMode, setExportMode} from '../../redux-store/PresentationReducer/actions';
import Upload from '../components/image/Upload';
import StyleComponent from '../../StyleComponent';
import ThemeSelector from '../../ThemeSelector';
import {Loader} from 'semantic-ui-react';

export function Container({isReady, onSetPresentationMode, onSetExportMode, title}) {
  useEffect(() => {
    onSetPresentationMode();
    onSetExportMode();
  });

  return (
    <div className="parent">
      <Settings className="div1" />
      <SideBar className="div2" />
      {/* good case scenario */}
      {isReady && title !== '' && (
        <>
          <Canvas className="div3" />
          <SavePresentation />
          <LoadPresentation />
          <Upload />
          <StyleComponent />
          <ThemeSelector />
        </>
      )}
      {/* the user tries to access '/edit' URL */}
      {/* redirect to '/' */}
      {!isReady && title === '' && <Redirect to="/" />}
      {/* the content will be returned, just waiting for the async call of titleCheck to finish */}
      {!isReady && title !== '' && <Loader active content="Loading..." />}
    </div>
  );
}

Container.propTypes = {
  isReady: PropTypes.bool,
  onSetPresentationMode: PropTypes.func,
  onSetExportMode: PropTypes.func,
  title: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    onSetPresentationMode: () => dispatch(setPresentationMode(false)),
    onSetExportMode: () => dispatch(setExportMode(false)),
  };
}

export default connect(
  state => ({
    isReady: getIsReady(state),
    title: getTitle(state),
  }),
  mapDispatchToProps
)(Container);
