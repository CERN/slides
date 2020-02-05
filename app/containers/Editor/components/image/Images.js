/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import preloader from '../../../../utils/preloader';

import {} from '../../redux-store/actions';
import {
  selectCurrentImageArray,
  selectAssetsPath,
} from '../../redux-store/selectors';
import './Images.css';


// fix image rendering
// import img from '';

// preloader(img);

function Images({ currentImageArray, assetsPath }) {
  const base = "../../../../../public/static/images";
  const imagePaths = currentImageArray.map(img => `${base}/${img.src}`);
  console.log('............imagePaths: ', imagePaths);

  const images = currentImageArray.map(img => (
    <Image
      key={img}
      size="medium"
      src={require(`../../../../../public/static/images/${img.src}`)}
      alt=""
      className="img-responsive"
    />
  ));
  return <div className="container">{images}</div>;
}

Images.propTypes = {
  currentImageArray: PropTypes.array,
  assetsPath: PropTypes.string,
};

export default connect(
  state => ({
    currentImageArray: selectCurrentImageArray(state),
    assetsPath: selectAssetsPath(state),
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
