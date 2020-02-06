/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import {
  selectCurrentImageArray,
  selectAssetsPath,
} from '../../redux-store/selectors';
import './Images.css';

function Images({ currentImageArray, assetsPath }) {
  // this base will be the server's address base for every image , localhost:3000/public/static/images
  // the base I will be assetsPath
  const imagePaths = currentImageArray.map(img => `${assetsPath}/${img.src}`);
  console.log("imagePaths.......", imagePaths)
  const images = imagePaths.map(img => (
    <Image
      key={img}
      size="medium"
      src={img}
      alt=""
      className="img-responsive"
    />
  ));
  // return <div className="container">{images}</div>;
  return <div>{images}</div>
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


// return (
//   <Image
//     key={1}
//     size="medium"
//     src="http://souvlaki:3000/static/happy.jpg"
//     alt=""
//     className="img-responsive"
//   />
// )
