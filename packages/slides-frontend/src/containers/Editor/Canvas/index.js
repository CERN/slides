import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Deck } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

import {
  getTheme,
  getTitle,
  getAssetsPath,
  getBackgroundColor,
} from '../../redux-store/PresentationReducer/selectors';

import { getDeck } from '../../redux-store/DeckReducer/selectors';

import MySlide from '../MySlide';
import './index.css';
import getterTheme from '../../../theming/theme';

function Canvas({ title, theme, DeckOfSlides, backgroundColor }) {
  const deck = useRef();
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
  // // now make the check if it is cern 3,4,5 then add intro and end slide
  // // use this hook to be able to move to next previous slide in adding removing slides
  useEffect(() => {
    window.slideCount = deck.current.props.children.length;
  });
  // catch reload event
  
  useEffect(() => {
    window.onbeforeunload = e => {
      e.preventDefault();
      return('Are you sure you want to reload?')
    }
  })
  useEffect(() => {
    window.onunload = e => {
      e.preventDefault();
      console.log("I am now unloading")
      // so delete things from server
      // ideally one api request
      // and navigate to home page
    }
  })

  return (
    <div>
      <Helmet>
        <title>Edit: {title}</title>
      </Helmet>
      <div className="deck">
        <Deck
          ref={deck}
          transition={['zoom', 'slide']}
          transitionDuration={500}
          theme={myTheme}
          progress="number"
          showFullscreenControl={false}
          // controls={false} // show or hide the move buttons
        >
          {DeckOfSlides.map(item => (
            <MySlide key={item.ID} />
          ))}
        </Deck>
      </div>
    </div>
  );
}

Canvas.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.string,
  DeckOfSlides: PropTypes.array,
  backgroundColor: PropTypes.string,
};

export default connect(
  state => ({
    theme: getTheme(state),
    title: getTitle(state),
    DeckOfSlides: getDeck(state),
    assetsPath: getAssetsPath(state),
    backgroundColor: getBackgroundColor(state),
  }),
  null,
)(Canvas);
