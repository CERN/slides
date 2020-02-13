/**
 * Presentation selectors
 */

const selectDeckOfSlides = state => state.global.DeckOfSlides;
const selectCurrentSlide = state => state.global.currentSlide;
const selectTheme = state => state.global.theme;
const selectTitle = state => state.global.title;
const selectDescription = state => state.global.description;
const selectCurrentText = state =>
  state.global.DeckOfSlides[state.global.currentSlide].currentText;
const selectCurrentImage = state =>
  state.global.DeckOfSlides[state.global.currentSlide].currentImage;
const selectEditMode = state =>
  state.global.DeckOfSlides[state.global.currentSlide].textArray[
    state.global.DeckOfSlides[state.global.currentSlide].currentText
  ].edit;
const selectCurrentImageArray = state =>
  state.global.DeckOfSlides[state.global.currentSlide].imageArray;
const selectCurrentTextArray = state =>
  state.global.DeckOfSlides[state.global.currentSlide].textArray;
const selectCurrentTextData = state =>
  state.global.DeckOfSlides[state.global.currentSlide].textArray[
    state.global.DeckOfSlides[state.global.currentSlide].currentText
  ].data;
const selectCurrentImageSrc = state =>
  state.global.DeckOfSlides[state.global.currentSlide].imageArray[
    state.global.DeckOfSlides[state.global.currentSlide].currentImage
  ].src;

const selectCurrentImageObject = state =>
  state.global.DeckOfSlides[state.global.currentSlide].imageArray[
    state.global.DeckOfSlides[state.global.currentSlide].currentImage
  ];
const selectPendingImageUploadRequest = state =>
  state.global.pendingImageUploadRequest;

const selectAssetsPath = state => state.global.assetsPath;
const selectUsername = state => state.global.username;
const selectSaveRequest = state => state.global.saveRequest;
const selectLoadRequest = state => state.global.loadRequest;
const selectIsReady = state => state.global.isReady;

export {
  selectDeckOfSlides,
  selectCurrentSlide,
  selectTheme,
  selectCurrentTextArray,
  selectEditMode,
  selectCurrentImageArray,
  selectTitle,
  selectDescription,
  selectCurrentText,
  selectCurrentTextData,
  selectCurrentImage,
  selectCurrentImageSrc,
  selectPendingImageUploadRequest,
  selectAssetsPath,
  selectUsername,
  selectSaveRequest,
  selectLoadRequest,
  selectIsReady,
  selectCurrentImageObject,
};
