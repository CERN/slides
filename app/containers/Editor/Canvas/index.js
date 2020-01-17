import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Deck } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

import {
  selectDeckOfSlides,
  selectTheme,
  selectTitle,
  selectDescription,
} from '../redux-store/selectors';

import MySlide from '../MySlide';
import './index.css';
import getTheme from '../../../theming/theme';

function Canvas({ DeckOfSlides, title, theme, description }) {
  const deck = useRef();
  // check if it works the same with history
  // const addingSlide = () => {
  //   onAddSlide();
  //   window.location = `#/${currentSlide + 1}`; // because slides here are starting from 1
  // };

  // const removingSlide = () => {
  //   onRemoveSlide();
  //   if (currentSlide === 0) {
  //     // window.location = `#/${1}`;
  //     window.location = `#/${0}`;
  //   } else window.location = `#/${currentSlide - 1}`;
  // };
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
          contentWidth="90px"
          // controls={false} // show or hide the move buttons
        >
          {DeckOfSlides.map((item, id) => (
            <MySlide key={item} id={id} />
          ))}
        </Deck>
      </div>
    </div>
  );
}

Canvas.propTypes = {
  DeckOfSlides: PropTypes.array,
  title: PropTypes.string,
  theme: PropTypes.string,
  description: PropTypes.string,
};

export default connect(
  state => ({
    DeckOfSlides: selectDeckOfSlides(state),
    theme: selectTheme(state),
    title: selectTitle(state),
    description: selectDescription(state),
  }),
  null,
)(Canvas);
