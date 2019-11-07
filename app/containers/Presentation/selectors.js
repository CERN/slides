/**
 * Presentation selectors
 */

// import { createSelector } from 'reselect';
// import { initialState } from './reducer';

// const makeSelectDeckOfSlides = () =>
//   createSelector(
//     selectGlobal,
//     globalState => globalState.DeckOfSlides,
//   );

// const makeSelectCurrentSlide = () =>
//   createSelector(
//     selectGlobal,
//     globalState => globalState.currentSlide,
//   );

const selectDeckOfSlides = state => state.global.DeckOfSlides;
const selectCurrentSlide = state => state.global.currentSlide;

export { selectDeckOfSlides, selectCurrentSlide };
