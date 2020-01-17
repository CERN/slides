// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// import { Image } from 'spectacle';
// import {
//   selectDeckOfSlides,
//   selectCurrentSlide,
// } from '../../redux-store/selectors';
// import ImageComponent from './ImageComponent';
// // import images from './images';

// export function MyImage({ DeckOfSlides, currentSlide }) {
//   // console.log('mplampla....', images);
//   return <div />;
// }

// MyImage.propTypes = {
//   DeckOfSlides: PropTypes.array,
//   currentSlide: PropTypes.number,
// };

// export default connect(state => ({
//   DeckOfSlides: selectDeckOfSlides(state),
//   currentSlide: selectCurrentSlide(state),
// }))(MyImage);

// <div>
//   {DeckOfSlides[currentSlide] &&
//     DeckOfSlides[currentSlide].imageArray.map(elem => (
//       <ImageComponent key={elem.id} imageArrayEntry={elem.id} />
//     ))}
// </div>
