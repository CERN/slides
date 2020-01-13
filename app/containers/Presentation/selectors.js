/**
 * Presentation selectors
 */

const selectDeckOfSlides = state => state.global.DeckOfSlides;
const selectCurrentSlide = state => state.global.currentSlide;
const selectTheme = state => state.global.theme;
const selectCurrentTextArray = state =>
  state.global.DeckOfSlides[state.global.currentSlide].textArray;

export {
  selectDeckOfSlides,
  selectCurrentSlide,
  selectTheme,
  selectCurrentTextArray,
};
