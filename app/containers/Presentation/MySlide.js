import React from 'react';
// import { Slide } from 'spectacle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyText from './MyText';
import StandardSlide from '../../theming/StandardSlide';
import { selectTheme } from './selectors';

function MySlide({ id, theme }) {
  const StandardSlideTemplate = StandardSlide(theme);
  return (
    <StandardSlideTemplate>
      <MyText id={id} />
    </StandardSlideTemplate>
  );
}

MySlide.propTypes = {
  id: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    theme: selectTheme(state),
  };
}
export default connect(
  mapStateToProps,
  null,
)(MySlide);
