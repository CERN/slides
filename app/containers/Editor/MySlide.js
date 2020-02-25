import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import MyText from './components/text';
// import MyImage from './components/image';
import StandardSlide from '../../theming/StandardSlide';
import { getTheme } from '../redux-store/PresentationReducer/selectors';

function MySlide({ theme }) {
  const StandardSlideTemplate = StandardSlide(theme);
  return (
    <StandardSlideTemplate>
      {/* <MyText />
      <MyImage /> */}
      <h1>Hello my Slide</h1>
    </StandardSlideTemplate>
  );
}

MySlide.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    theme: getTheme(state),
  }),
  null,
)(MySlide);
