/**
 * Selectors
 */
// Item
 import { Deck } from './definitions';

const getDeck = (state: { deck: Deck; }) => state.deck.slides;
const getCurrentSlide = (state: { deck: Deck; }) => state.deck.currentSlide;
const getItems = (state: { deck: Deck; }) => state.deck.slides[state.deck.currentSlide].itemsArray;
// const getFocus = (state: { deck: Deck; }, id: string) => {
//   const ind:number = state.deck.slides[state.deck.currentSlide].itemsArray.findIndex((itm:Item) => itm.ID === id);
//   if (ind === -1) return false;
//   return state.deck.slides[state.deck.currentSlide].itemsArray[ind].Focused;
// }
export {
  getDeck,
  getCurrentSlide,
  getItems,
  // getFocus,
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
