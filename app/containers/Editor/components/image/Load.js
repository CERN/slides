// const images = [
//     { id: 1, src: './assets/image01.jpg', title: 'foo', description: 'bar' },
//     { id: 2, src: './assets/image02.jpg', title: 'foo', description: 'bar' },
//     { id: 3, src: './assets/image03.jpg', title: 'foo', description: 'bar' },
//     { id: 4, src: './assets/image04.jpg', title: 'foo', description: 'bar' },
//     { id: 5, src: './assets/image05.jpg', title: 'foo', description: 'bar' },
//     ...etc
//   ];

//   function imageLoader() {
//     return images;
//   }

//   export default imageLoader;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'spectacle';
import {
  selectCurrentImageArray,
  selectCurrentImageSrc,
} from '../../redux-store/selectors';

function ImageLoader({ currentImageArray, currentImg }) {
  console.log('ImageLoader issssss', currentImg);
  return currentImg;
}

ImageLoader.propTypes = {
  currentImageArray: PropTypes.array,
};

export default connect(
  state => ({
    currentImageArray: selectCurrentImageArray(state),
    currentImg: selectCurrentImageSrc(state),
  }),
  null,
)(ImageLoader);
