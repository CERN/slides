import React from 'react';
import { Slide } from 'spectacle';
import PropTypes from 'prop-types';
import MyText from './MyText';
import StandardSlide from '../../theming/StandardSlide';

const StandardSlideTemplate = StandardSlide();

function MySlide({ id }) {
  return (
    <StandardSlideTemplate>
      <MyText id={id} />
    </StandardSlideTemplate>
  );
}

MySlide.propTypes = {
  id: PropTypes.number.isRequired,
};

export default MySlide;
