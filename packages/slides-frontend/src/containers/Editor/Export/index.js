import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {
  getIsReady,
  getTitle,
  getTheme,
  getBackgroundColor,
} from '../../redux-store/PresentationReducer/selectors';
import {getDeck} from '../../redux-store/DeckReducer/selectors';
import {Helmet} from 'react-helmet';
import history from '../../../utils/history';
import {Deck, Slide} from 'spectacle';
// import createTheme from 'spectacle/lib/themes/default/index';
// import getterTheme from '../../../theming/theme';
// import MyExportedSlides from './MyExportedSlides';
import exportPDFinfo from './alerting';
import './index.css';

/*
    Update spectacle
    Fix themes
    Update the way of exporting PDFs because it works better in the latest version
*/

function Export({isReady, DeckOfSlides, title, theme, backgroundColor}) {
  // const themeObj = getterTheme(theme);
  // // change fontconfig from here
  // const newTheme = {
  //   ...themeObj,
  //   themeConfig: {
  //     ...themeObj.themeConfig,
  //     secondary: backgroundColor,
  //   },
  // };

  // const myTheme = createTheme(newTheme.themeConfig, newTheme.fontConfig);
  const myTheme = {};
  return (
    <div>
      {isReady ? (
        <div>
          <Helmet>
            <title>Export: {title}</title>
          </Helmet>
          {exportPDFinfo()}
          <Deck
            theme={myTheme}
            progress="none"
            showFullscreenControl={false}
            history={DeckOfSlides.length > 1 ? history : null}
            disableKeyboardControls={true}
            controls={false}
          >
            {/* {DeckOfSlides.map(item => (
                <MySlide key={item.ID} />
              ))} */}
            {/* <MyExportedSlides /> */}
            <Slide />
            <Slide />
          </Deck>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

Export.propTypes = {
  isReady: PropTypes.bool,
  DeckOfSlides: PropTypes.array,
  title: PropTypes.string,
  theme: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default connect(
  state => ({
    isReady: getIsReady(state),
    DeckOfSlides: getDeck(state),
    title: getTitle(state),
    theme: getTheme(state),
    backgroundColor: getBackgroundColor(state),
  }),
  null
)(Export);
