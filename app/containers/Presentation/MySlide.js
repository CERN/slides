import React from 'react';
import { Slide } from 'spectacle';
import PropTypes from 'prop-types';
import MyText from './MyText';
import StandardSlide from '../../theming/StandardSlide';

function MySlide({ id }) {
  return (
    <StandardSlide id={id}>
      <MyText />
    </StandardSlide>
  );
}

MySlide.propTypes = {
  id: PropTypes.number.isRequired,
};

export default MySlide;
