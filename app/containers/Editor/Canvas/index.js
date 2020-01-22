import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Deck } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

import {
  selectTheme,
  selectTitle,
  selectDescription,
  selectDeckOfSlides,
} from '../redux-store/selectors';

import MySlide from '../MySlide';
import './index.css';
import getTheme from '../../../theming/theme';

function Canvas({ title, theme, description, DeckOfSlides }) {
  const deck = useRef();
  const themeObj = getTheme(theme);
  const myTheme = createTheme(themeObj.themeConfig, themeObj.fontConfig);
  // // now make the check if it is cern 3,4,5 then add intro and end slide
  // // use this hook to be able to move to next previous slide in adding removing slides
  useEffect(() => {
    window.slideCount = deck.current.props.children.length;
  });

  return (
    <div>
      <Helmet>
        <title>Edit: {title}</title>
        <meta name="Canvas" content={description} />
      </Helmet>
      <div>
        <Deck
          ref={deck}
          transition={['zoom', 'slide']}
          transitionDuration={500}
          theme={myTheme}
          progress="number"
          showFullscreenControl={false}
          // contentWidth="90px"
          // controls={false} // show or hide the move buttons
        >
          {/* <MySlide /> */}
          {DeckOfSlides.map(item => (
            <MySlide key={item} />
          ))}
        </Deck>
      </div>
    </div>
  );
}

Canvas.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.string,
  description: PropTypes.string,
  DeckOfSlides: PropTypes.array,
};

export default connect(
  state => ({
    theme: selectTheme(state),
    title: selectTitle(state),
    description: selectDescription(state),
    DeckOfSlides: selectDeckOfSlides(state),
  }),
  null,
)(Canvas);
