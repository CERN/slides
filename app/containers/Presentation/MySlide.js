import React, { memo } from 'react';
import { Slide, Text } from 'spectacle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectDeckOfSlides, makeSelectCurrentSlide } from './selectors';

import { changeSlide } from './actions';
import reducer from './reducer';

const key = 'myslide';

function MySlide({ content, id, onChangeSlide }) {
  useInjectReducer({ key, reducer });

  console.log('...... it is : ', content, id);
  onChangeSlide(id);
  const presentTexts = textArray =>
    textArray.map(elem => <Text>{elem.data}</Text>);
  const presentImages = imageArray => imageArray;
  const present = () =>
    // first run through the text array
    // run through the image array
    presentTexts(content.textArray).concat(presentImages(content.imageArray));

  return <Slide id={id}>{present()}</Slide>;
}

MySlide.propTypes = {
  content: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  onChangeSlide: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSlide: id => dispatch(changeSlide(id)),
  };
}

const withConnect = connect(mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(MySlide);
