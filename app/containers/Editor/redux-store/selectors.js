/**
 * Presentation selectors
 */

const selectDeckOfSlides = state => state.global.DeckOfSlides;
const selectCurrentSlide = state => state.global.currentSlide;
const selectTheme = state => state.global.theme;
const selectEditMode = state => state.global.textEditMode;
const selectCurrentImageArray = state =>
  state.global.DeckOfSlides[state.global.currentSlide].imageArray;
const selectCurrentTextArray = state =>
  state.global.DeckOfSlides[state.global.currentSlide].textArray;
const selectTitle = state => state.global.title;
const selectDescription = state => state.global.description;

export {
  selectDeckOfSlides,
  selectCurrentSlide,
  selectTheme,
  selectCurrentTextArray,
  selectEditMode,
  selectCurrentImageArray,
  selectTitle,
  selectDescription,
};