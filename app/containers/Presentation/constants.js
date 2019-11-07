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

export const ADD_SLIDE = 'iPresent/Presentation/ADD_SLIDE';
export const REMOVE_SLIDE = 'iPresent/Presentation/REMOVE_SLIDE';
export const ADD_TEXT = 'iPresent/Presentation/ADD_TEXT';
export const REMOVE_TEXT = 'iPresent/Presentation/REMOVE_TEXT';
export const ADD_DATA = 'iPresent/Presentation/ADD_DATA';
export const CHANGE_SLIDE = '@@router/LOCATION_CHANGE';
