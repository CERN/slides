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
      slide: {
        textArray: ["That's the first Slide"],
        imageArray: [],
      },
    },
  ],
  currentSlide: 0,
};

const PresentationReducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log("let's seeee ", action.type);
    // eslint-disable-next-line default-case
    switch (action.type) {
      case ADD_SLIDE:
        draft.currentSlide = state.currentSlide + 1;
        draft.DeckOfSlides.push({
          slide: { textArray: ["That's a new slide"], imageArray: [] },
        });
        // draft.DeckOfSlides = state.DeckOfSlides.splice(
        //   action.id,
        //   0,
        //   'new data',
        // ); // check again may not be working
        // console.log('afterrrrrrr', draft);
        break;
      case REMOVE_SLIDE:
        draft.DeckOfSlides.splice(action.id, 1); // check again may not be working
        break;
    }
  });

export default PresentationReducer;
