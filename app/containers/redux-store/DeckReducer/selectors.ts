/**
 * Selectors
 */

 import { Deck } from './definitions';

const getDeck = (state: { deck: Deck; }) => state.deck.slides;
const getCurrentSlide = (state: { deck: Deck; }) => state.deck.currentSlide;
const getItems = (state: { deck: Deck; }) => state.deck.slides[state.deck.currentSlide].itemsArray;

export {
  getDeck,
  getCurrentSlide,
  getItems,
};

// const getCurrentText = state =>
//   state.global.DeckOfSlides[state.global.currentSlide].currentText;


// const getCurrentImage = state =>
//   state.global.DeckOfSlides[state.global.currentSlide].currentImage;

// const getCurrentTextData = state =>
//   state.global.DeckOfSlides[state.global.currentSlide].textArray[
//     state.global.DeckOfSlides[state.global.currentSlide].currentText
//   ].data;
// const getCurrentImageSrc = state =>
//   state.global.DeckOfSlides[state.global.currentSlide].imageArray[
//     state.global.DeckOfSlides[state.global.currentSlide].currentImage
//   ].src;

// const getCurrentImageObject = state =>
//   state.global.DeckOfSlides[state.global.currentSlide].imageArray[
//     state.global.DeckOfSlides[state.global.currentSlide].currentImage
//   ];
