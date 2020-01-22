import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyText from './components/text';
import MyImage from './components/image/MyImage';
import StandardSlide from '../../theming/StandardSlide';
import { selectTheme, selectCurrentSlide } from './redux-store/selectors';

function MySlide({ theme, currentSlide }) {
  const StandardSlideTemplate = StandardSlide(theme);
  return (
    <StandardSlideTemplate>
      <MyText id={currentSlide} />
      {/* <MyImage id={id} /> */}
    </StandardSlideTemplate>
  );
}

MySlide.propTypes = {
  theme: PropTypes.string.isRequired,
  currentSlide: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    theme: selectTheme(state),
    currentSlide: selectCurrentSlide(state),
  };
}
export default connect(
  mapStateToProps,
  null,
)(MySlide);
