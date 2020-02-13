import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyText from './components/text';
import MyImage from './components/image';
import StandardSlide from '../../theming/StandardSlide';
import { selectTheme } from './redux-store/selectors';

function MySlide({ theme }) {
  const StandardSlideTemplate = StandardSlide(theme);
  return (
    <StandardSlideTemplate>
      <MyText />
      <MyImage />
    </StandardSlideTemplate>
  );
}

MySlide.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    theme: selectTheme(state),
  }),
  null,
)(MySlide);
