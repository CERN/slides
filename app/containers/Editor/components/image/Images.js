/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageItem from './ImageItem';
import {
  selectCurrentImageArray,
} from '../../redux-store/selectors';
import './Images.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function Images({ currentImageArray }) {
  return (
    <div>
      {currentImageArray.map(img => (
        <ImageItem key={img.src} imageObj={img} />
      ))}
    </div>
  )}

Images.propTypes = {
  currentImageArray: PropTypes.array,
};

export default connect(
  state => ({
    currentImageArray: selectCurrentImageArray(state),
  }),
  null,
)(Images);

// import Image from 'spectacle';
// interface ImageProps {
//   alt?: string;
//   className?: BaseProps['className'];
//   display?: string;
//   height?: number | string;
//   margin?: BaseProps['margin'];
//   padding?: BaseProps['padding'];
//   src?: string;
//   width?: number | string;
// }


// return (
//   <Image
//     key={1}
//     size="medium"
//     src="http://souvlaki:3000/static/happy.jpg"
//     alt=""
//     className="img-responsive"
//   />
// )
