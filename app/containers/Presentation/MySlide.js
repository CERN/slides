import React from 'react';
import { Slide } from 'spectacle';
import PropTypes from 'prop-types';
import MyText from './MyText';

function MySlide({ id }) {
  return (
    <Slide id={id}>
      <MyText />
    </Slide>
  );
}

MySlide.propTypes = {
  id: PropTypes.number.isRequired,
};

export default MySlide;
