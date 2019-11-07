import React, { memo } from 'react';
import { Slide, Text } from 'spectacle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { selectDeckOfSlides, selectCurrentSlide } from './selectors';

import reducer from './reducer';

function MySlide({ content, id }) {
  // useInjectReducer({ key, reducer });

  // because the

  // const presentTexts = textArray =>
  //   textArray.map(elem => <Text>{elem.data}</Text>);
  // const presentImages = imageArray => imageArray;
  // const present = () =>
  //   // first run through the text array
  //   // run through the image array
  //   presentTexts(content.textArray).concat(presentImages(content.imageArray));
  console.log('content is : ', content);
  return (
    <Slide id={id}>
      {content.textArray.map(elem => (
        <Text>{elem.data}</Text>
      ))}
    </Slide>
  );
}

MySlide.propTypes = {
  content: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  // currentSlide: PropTypes.number,
};

// const mapStateToProps = state => ({
//   DeckOfSlides: selectDeckOfSlides(state),
//   currentSlide: selectCurrentSlide(state),
// });

// export function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(MySlide);
export default MySlide;
