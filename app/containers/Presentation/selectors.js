/**
 * Presentation selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const makeSelectDeckOfSlides = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.DeckOfSlides,
  );

const makeSelectCurrentSlide = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentSlide,
  );

export { makeSelectDeckOfSlides, makeSelectCurrentSlide };
