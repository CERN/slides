import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getIsReady, getTitle, getTheme, getBackgroundColor } from '../../redux-store/PresentationReducer/selectors';
import { getDeck } from '../../redux-store/DeckReducer/selectors';
import { Helmet } from 'react-helmet';

import './index.css';
import { Deck } from 'spectacle';
import MySlide from '../MySlide';
import createTheme from 'spectacle/lib/themes/default/index';
import getterTheme from '../../../theming/theme';

import PageNotFound from '../../NotFoundPage';

function Presentation({ isReady, DeckOfSlides, title, theme, backgroundColor }) {
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
                        <title>Present: {title}</title>
                    </Helmet>
                    <Deck
                        transition={['zoom', 'slide']}
                        transitionDuration={500}
                        theme={myTheme}
                        progress="pacman"
                        showFullscreenControl={true}
                        // controls={false} // show or hide the move buttons
                    >
                        {DeckOfSlides.map(item => (
                        <MySlide key={item.ID} />
                        ))}
                    </Deck>
                </div>    
            ) : (
                <PageNotFound />
            )}
        </div>
    );
}

Presentation.propTypes = {
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
    null,
)(Presentation);
