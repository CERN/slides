/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageItem from './ImageItem';
import {
  selectCurrentImageArray,
} from '../../redux-store/selectors';
import { changeImagePosition } from '../../redux-store/actions';
import './Images.css';

function Images({ currentImageArray }) {
  // this base will be the server's address base for every image , localhost:3000/public/static/images
  // the base I will be assetsPath
  // const imagePaths = currentImageArray.map(img => `${assetsPath}/static/${img.src}`);
  // const imagePosition = currentImageArray.map(img => ({x: img.position.x, y: img.position.y}));
  // console.log("imagePaths.......", imagePaths)
  // console.log("blabla    ",  "current imagew", imageObj ? imageObj.position : "not ready")

  // const [deltaPositionArray, setDeltaPosition] = useState(imagePosition.map(img => ({x:0, y:0})));
  // const [deltaPositionArray, setDeltaPositionArray] = useState(currentImageArray.map(i => ({x:0,y:0})));

  const images = currentImageArray.map(img => (
    <ImageItem key={img.id} id={img.id} />
  ));
  // return <div className="container">{images}</div>;
  return <div>{images}</div>
}

Images.propTypes = {
  currentImageArray: PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSaveRequest: position => dispatch(changeImagePosition(position)),
  };
}

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
