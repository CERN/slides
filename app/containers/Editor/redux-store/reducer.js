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
  SET_THEME,
  TOGGLE_EDIT_MODE,
  SET_TITLE,
  SET_DESCRIPTION,
  ADD_IMAGE,
  IMAGE_UPLOAD_REQUEST,
  SET_ASSETS_PATH,
  SET_USER,
  SAVE_REQUEST,
  LOAD_REQUEST,
  IS_READY,
  LOAD_STATE,
  CHANGE_IMAGE_POSITION,
  CHANGE_IMAGE_SIZE,
  DELETE_IMAGE,
} from './constants';

// The initial state of the App
export const initialState = {
  username: 'achionis',
  DeckOfSlides: [
    {
      currentText: -1,
      currentImage: 0,
      textArray: [],
      imageArray: [
        {
          id: 0,
          src: 'afb2451a03547549408920c27a68ac10-happy.jpg',
          position: {
            width: '200px',
            height: '70px',
            x: 500,
            y: 250,
          },
        },
      ],
    },
  ],
  assetsPath: '',
  pendingImageUploadRequest: false,
  saveRequest: false,
  loadRequest: false,
  currentSlide: 0,
  theme: 'CERN 1',
  title: 'New Presentation',
  description: '',
  isReady: false,
};

/* eslint-disable default-case, no-param-reassign */
const PresentationReducer = (state = initialState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line no-console
    switch (action.type) {
      case ADD_SLIDE:
        draft.DeckOfSlides.splice(draft.currentSlide + 1, 0, {
          currentText: -1,
          currentImage: -1,
          textArray: [],
          imageArray: [],
        });
        break;
      case REMOVE_SLIDE:
        if (draft.DeckOfSlides.length > 1) {
          draft.DeckOfSlides.splice(draft.currentSlide, 1);
          // eslint-disable-next-line no-alert
        } else alert('Not possible to remove the only slide');
        break;
      case ADD_TEXT: {
        draft.DeckOfSlides[draft.currentSlide].textArray.push({
          id: draft.DeckOfSlides[draft.currentSlide].currentText + 1,
          data: 'Type Something...',
          edit: false,
          position: {
            width: '500px',
            height: '70px',
            x: 400,
            y: 250,
          },
        });
        draft.DeckOfSlides[draft.currentSlide].currentText += 1;
        break;
      }
      case ADD_IMAGE:
        draft.DeckOfSlides[draft.currentSlide].imageArray.push({
          id: draft.DeckOfSlides[draft.currentSlide].currentImage + 1,
          src: action.src,
          position: {
            width: '200px',
            height: '60px',
            x: 400,
            y: 250,
          },
        });
        draft.DeckOfSlides[draft.currentSlide].currentImage += 1;
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
      case DELETE_IMAGE:
        if (draft.DeckOfSlides[draft.currentSlide].currentImage >= 0) {
          draft.DeckOfSlides[draft.currentSlide].imageArray.splice(
            action.id,
            1,
          );
          draft.DeckOfSlides[draft.currentSlide].currentImage -= 1;
          // eslint-disable-next-line no-alert
        } else alert("There aren't any images to remove");
        break;

      case ADD_DATA:
        draft.DeckOfSlides[draft.currentSlide].textArray[action.id].data =
          action.data;
        break;
      case CHANGE_POSITION:
        draft.DeckOfSlides[draft.currentSlide].textArray[action.id].position =
          action.position;
        break;
      case CHANGE_IMAGE_POSITION: {
        const newPosition = { ...action.position };
        console.log('newPosition.............', newPosition);
        draft.DeckOfSlides[draft.currentSlide].imageArray[
          action.id
        ].position.x = newPosition.x;
        draft.DeckOfSlides[draft.currentSlide].imageArray[
          action.id
        ].position.y = newPosition.y;
        break;
      }
      case CHANGE_IMAGE_SIZE: {
        const newSize = { ...action.size };
        console.log('newSize.............', newSize);
        draft.DeckOfSlides[draft.currentSlide].imageArray[
          action.id
        ].position.width = newSize.width;
        draft.DeckOfSlides[draft.currentSlide].imageArray[
          action.id
        ].position.height = newSize.height;
        break;
      }
      case CHANGE_SLIDE:
        draft.currentSlide = Number(action.payload.location.hash.substr(2));
        break;
      case SET_THEME:
        // now that the theme is set, push first and last slide in the deck if the theming requires it
        draft.theme = action.theme;
        break;
      case TOGGLE_EDIT_MODE:
        draft.DeckOfSlides[draft.currentSlide].textArray[action.id].edit =
          action.edit;
        break;
      case SET_TITLE:
        draft.title = action.title;
        break;
      case SET_DESCRIPTION:
        draft.description = action.description;
        break;
      case IMAGE_UPLOAD_REQUEST:
        draft.pendingImageUploadRequest = action.request;
        break;
      case SAVE_REQUEST:
        draft.saveRequest = action.request;
        break;
      case LOAD_REQUEST:
        draft.loadRequest = action.request;
        break;
      case SET_ASSETS_PATH:
        draft.assetsPath = action.path;
        break;
      case LOAD_STATE: {
        // get the json from the action
        // set the state using:
        const newState = { ...action.state.global };
        Object.keys(newState).map(s => {
          draft[s] = newState[s];
        });
        draft.saveRequest = false;
        break;
      }
      case SET_USER:
        draft.username = action.user;
        break;
      case IS_READY:
        draft.isReady = action.ready;
    }
  });

export default PresentationReducer;

// {
//   id: 0,
//   data: "That's 0 Slide",
//   edit: false,
//   position: {
//     width: '500px',
//     height: '70px',
//     x: 400,
//     y: 250,
//   },
// },

// {
//   id: 0,
//   src: 'happy.jpg',
//   position: {
//     width: '800px',
//     height: '70px',
//     x: 500,
//     y: 250,
//   },
// },
