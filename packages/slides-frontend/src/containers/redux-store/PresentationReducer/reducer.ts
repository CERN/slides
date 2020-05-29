import { initialState, presentationState } from './definitions';
import produce from "immer";
import {
  SET_THEME,
  SET_TITLE,
  IMAGE_UPLOAD_REQUEST,
  SET_ASSETS_PATH,
  SAVE_REQUEST,
  LOAD_REQUEST,
  IS_READY,
  LOAD_STATE,
  STYLE_REQUEST,
  BACKGROUND_COLOR,
  THEME_REQUEST,
  PRESENTATION_MODE,
} from './constants';
import { Action } from './actions';

const PresentationReducer = (state: presentationState=initialState, action: Action): presentationState =>
  produce(state, (draft: presentationState) => {
    // eslint-disable-next-line no-console
    switch (action.type) {
      case SET_THEME:
        // now that the theme is set, push first and last slide in the deck if the theming requires it
        draft.theme = action.theme;
        break;
      case SET_TITLE:
        draft.title = action.title;
        break;
      case IMAGE_UPLOAD_REQUEST:
        draft.imgUploadRequest = action.request;
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
        // action.state has the information for Presentation reducer
        const newPresentationState:presentationState = {
          ...action.state,
        };
        Object.assign(draft, newPresentationState);
        draft.saveRequest = false;
        break;
      }
      case IS_READY:
        draft.isReady = action.ready;
        break;
      case STYLE_REQUEST:
        draft.styleRequest = action.request;
        break;
      case BACKGROUND_COLOR:
        draft.backgroundColor = action.color;
        break;
      case THEME_REQUEST:
        draft.themeRequest = action.request;
        break;
      case PRESENTATION_MODE:
        draft.presentationMode = action.mode;
        break;
    }
  });

  export default PresentationReducer;
