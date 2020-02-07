/*
 * PresentationConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const ADD_SLIDE = 'Slides/Presentation/ADD_SLIDE';
export const REMOVE_SLIDE = 'Slides/Presentation/REMOVE_SLIDE';
export const ADD_TEXT = 'Slides/Presentation/ADD_TEXT';
export const REMOVE_TEXT = 'Slides/Presentation/REMOVE_TEXT';
export const ADD_DATA = 'Slides/Presentation/ADD_DATA';
export const CHANGE_POSITION = 'Slides/Presentation/CHANGE_POSITION';
export const SET_THEME = 'Slides/Presentation/SET_THEME';
export const TOGGLE_EDIT_MODE = 'Slides/Presentation/TOGGLE_EDIT_MODE';
export const SET_TITLE = 'Slides/Presentation/SET_TITLE';
export const SET_DESCRIPTION = 'Slides/Presentation/SET_DESCRIPTION';
export const ADD_IMAGE = 'Slides/Presentation/ADD_IMAGE';
export const IMAGE_UPLOAD_REQUEST = 'Slides/Presentation/IMAGE_UPLOAD_REQUEST';
export const SET_ASSETS_PATH = 'Slides/Presentation/SET_ASSETS_PATH';
export const LOAD_PRESENTATION = 'Slides/Presentation/LOAD_PRESENTATION';
export const SAVE_PRESENTATION = 'Slides/Presentation/SAVE_PRESENTATION';
export const SET_USER = 'Slides/Presentation/SET_USER';
export const SAVE_REQUEST = 'Slides/Presentation/SAVE_REQUEST';
export const LOAD_REQUEST = 'Slides/Presentation/LOAD_REQUEST';

export const CHANGE_SLIDE = '@@router/LOCATION_CHANGE';
