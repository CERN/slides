import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectDeckOfSlides, selectCurrentSlide } from './selectors';
import ImageComponent from './ImageComponent';

export function MyImage({ DeckOfSlides, currentSlide }) {
  return (
    <div>
      {DeckOfSlides[currentSlide] &&
        DeckOfSlides[currentSlide].imageArray.map(elem => (
          <ImageComponent key={elem.id} imageArrayEntry={elem.id} />
        ))}
    </div>
  );
}

MyImage.propTypes = {
  DeckOfSlides: PropTypes.array,
  currentSlide: PropTypes.number,
};

export default connect(state => ({
  DeckOfSlides: selectDeckOfSlides(state),
  currentSlide: selectCurrentSlide(state),
}))(MyImage);
