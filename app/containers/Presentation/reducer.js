/*
 * PresentationReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import {
  ADD_SLIDE,
  REMOVE_SLIDE,
  ADD_TEXT,
  REMOVE_TEXT,
  ADD_DATA,
  CHANGE_SLIDE,
} from './constants';

// The initial state of the App
export const initialState = {
  DeckOfSlides: [
    {
      currentText: 0,
      textArray: [{ id: 0, data: "That's the first Slide" }],
      imageArray: [],
    },
  ],
  currentSlide: 0,
};

/* eslint-disable default-case, no-param-reassign */
const PresentationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_SLIDE:
        draft.DeckOfSlides.splice(draft.currentSlide, 0, {
          currentText: 0,
          textArray: [{ id: 0, data: `That's ${draft.currentSlide} Slide` }],
          imageArray: [],
        });
        draft.currentSlide += 1;
        break;
      case REMOVE_SLIDE:
        draft.DeckOfSlides.splice(draft.currentSlide, 1);
        draft.currentSlide -= 1;
        break;
      case ADD_TEXT:
        draft.DeckOfSlides[draft.currentSlide].textArray.push({
          id: draft.DeckOfSlides[draft.currentSlide].currentText,
          data: "That's a new Text box",
        });
        draft.DeckOfSlides[draft.currentSlide].currentText += 1;
        break;
      case REMOVE_TEXT:
        draft.DeckOfSlides[draft.currentSlide].textArray.splice(
          draft.DeckOfSlides[draft.currentSlide].currentText,
          1,
        );
        draft.DeckOfSlides[draft.currentSlide].currentText -= 1;
        break;
      case ADD_DATA:
        draft.DeckOfSlides[draft.currentSlide].textArray[
          draft.DeckOfSlides[draft.currentSlide].currentText
        ].data = action.data;
        break;
      case CHANGE_SLIDE:
        draft.currentSlide = action.id;
        break;
    }
  });

export default PresentationReducer;
