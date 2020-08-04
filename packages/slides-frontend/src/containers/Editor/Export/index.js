import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  getIsReady,
  getTitle,
  getTheme,
  getBackgroundColor,
} from '../../redux-store/PresentationReducer/selectors';
import {getDeck} from '../../redux-store/DeckReducer/selectors';
import {Helmet} from 'react-helmet';
import history from '../../../utils/history';
import {Deck} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default/index';
import getterTheme from '../../../theming/theme';
import PageNotFound from '../../NotFoundPage';
import MyExportedSlides from './MyExportedSlides';
import exportPDFinfo from './alerting';
import './index.css';

/*
    Update spectacle
    Fix themes
    Update the way of exporting PDFs because it works better in the latest version
*/

function Export({isReady, title, theme, backgroundColor, DeckOfSlides}) {
  const themeObj = getterTheme(theme);
  // change fontconfig from here
  const newTheme = {
    ...themeObj,
    themeConfig: {
      ...themeObj.themeConfig,
      secondary: backgroundColor,
    },
  };

  // In history I check if there is a second slide or not
  // if there is we need the history in order to get all the slides
  // if it's only 1 slide then no history needed
  const myTheme = createTheme(newTheme.themeConfig, newTheme.fontConfig);
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
            {/* Inside here have a function that statically return
             the array of slides and array of elements of each slide */}
            <MyExportedSlides />
          </Deck>
        </div>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}

Export.propTypes = {
  isReady: PropTypes.bool,
  title: PropTypes.string,
  theme: PropTypes.string,
  backgroundColor: PropTypes.string,
  DeckOfSlides: PropTypes.array,
};

export default connect(
  state => ({
    isReady: getIsReady(state),
    title: getTitle(state),
    theme: getTheme(state),
    backgroundColor: getBackgroundColor(state),
    DeckOfSlides: getDeck(state),
  }),
  null
)(Export);
