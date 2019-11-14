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
  CHANGE_POSITION,
} from './constants';

const initialPosition = () => ({
  width: '500px',
  height: '70px',
  x: 400,
  y: 250,
});

// The initial state of the App
export const initialState = {
  DeckOfSlides: [
    {
      currentText: 0,
      textArray: [
        {
          id: 0,
          data: "That's 0 Slide",
          position: initialPosition,
        },
      ],
      imageArray: [],
    },
  ],
  currentSlide: 0,
};

/* eslint-disable default-case, no-param-reassign */
const PresentationReducer = (state = initialState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line no-console
    switch (action.type) {
      case ADD_SLIDE:
        draft.DeckOfSlides.splice(draft.currentSlide + 1, 0, {
          currentText: 0,
          textArray: [
            {
              id: 0,
              data: `That's ${draft.currentSlide + 1} Slide`,
              position: initialPosition,
            },
          ],
          imageArray: [],
        });
        break;
      case REMOVE_SLIDE:
        if (draft.DeckOfSlides.length > 1) {
          draft.DeckOfSlides.splice(draft.currentSlide, 1);
          // eslint-disable-next-line no-alert
        } else alert('Not possible to remove the only slide');
        break;
      case ADD_TEXT:
        draft.DeckOfSlides[draft.currentSlide].textArray.push({
          id: draft.DeckOfSlides[draft.currentSlide].currentText + 1,
          data: 'Type Something...',
          position: initialPosition,
        });
        draft.DeckOfSlides[draft.currentSlide].currentText += 1;
        break;
      case REMOVE_TEXT:
        if (draft.DeckOfSlides[draft.currentSlide].currentText >= 0) {
          draft.DeckOfSlides[draft.currentSlide].textArray.splice(
            draft.DeckOfSlides[draft.currentSlide].currentText,
            1,
          );
          draft.DeckOfSlides[draft.currentSlide].currentText -= 1;
          // eslint-disable-next-line no-alert
        } else alert("There aren't any text to remove");
        break;
      case ADD_DATA:
        draft.DeckOfSlides[draft.currentSlide].textArray[action.id].data =
          action.data;
        break;
      case CHANGE_POSITION:
        // const { width, height, x, y } = action.position;
        // const obj = { width, height, x, y };
        // console.log9('.... obj: ', obj);
        draft.DeckOfSlides[draft.currentSlide].textArray[action.id].position =
          action.position;
        break;
      case CHANGE_SLIDE:
        draft.currentSlide = Number(action.payload.location.hash.substr(2));
        break;
    }
  });

export default PresentationReducer;
