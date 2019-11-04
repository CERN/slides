/*
 * PresentationReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import { ADD_SLIDE, REMOVE_SLIDE } from './constants';

// The initial state of the App
export const initialState = {
  DeckOfSlides: [
    {
      currentText: 0,
      textArray: ["That's the first Slide"],
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
        draft.currentSlide = action.id + 1;
        draft.DeckOfSlides.splice(draft.currentSlide, 0, {
          currentText: 0,
          textArray: [`That's `, action.id, ` Slide`],
          imageArray: [],
        });
        break;
      case REMOVE_SLIDE:
        draft.currentSlide -= 1;
        draft.DeckOfSlides.splice(action.id, 1);
        break;
      case ADD_TEXT:
        break;
      case REMOVE_TEXT:
        break;
    }
  });

export default PresentationReducer;
