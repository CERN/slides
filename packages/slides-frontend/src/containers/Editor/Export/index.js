import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  getIsReady,
  getTitle,
  getTheme,
  getBackgroundColor,
} from '../../redux-store/PresentationReducer/selectors';
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

function Export({isReady, title, theme, backgroundColor}) {
  const themeObj = getterTheme(theme);
  // change fontconfig from here
  const newTheme = {
    ...themeObj,
    themeConfig: {
      ...themeObj.themeConfig,
      secondary: backgroundColor,
    },
  };

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
              history={history}
              disableKeyboardControls={true}
              controls={false}
            >
            {/* Inside here have a function that statically return
             the array of slides and array of elements of each slide */}
              <MyExportedSlides />
            </Deck>
          </div>
        )
        : (
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
  };

  export default connect(
    state => ({
      isReady: getIsReady(state),
      title: getTitle(state),
      theme: getTheme(state),
      backgroundColor: getBackgroundColor(state),
    }),
    null,
  )(Export);
