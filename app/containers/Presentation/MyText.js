import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectDeckOfSlides, selectCurrentSlide } from './selectors';
import TextComponent from './TextComponent';

export function MyText({ DeckOfSlides, currentSlide }) {
  return (
    <div>
      {DeckOfSlides[currentSlide] &&
        DeckOfSlides[currentSlide].textArray.map(elem => (
          <TextComponent key={elem.id} textArrayEntry={elem.id} />
        ))}
    </div>
  );
}

MyText.propTypes = {
  DeckOfSlides: PropTypes.array,
  currentSlide: PropTypes.number,
};

export default connect(state => ({
  DeckOfSlides: selectDeckOfSlides(state),
  currentSlide: selectCurrentSlide(state),
}))(MyText);
