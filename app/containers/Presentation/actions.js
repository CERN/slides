/*
 * Presentation Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  ADD_SLIDE,
  REMOVE_SLIDE,
  ADD_TEXT,
  REMOVE_TEXT,
  ADD_DATA,
  CHANGE_SLIDE,
} from './constants';

/**
 * Adds a New Slide
 *
 *
 * @return {object} An action object with a type of ADD_SLIDE
 */
export function addSlide() {
  return {
    type: ADD_SLIDE,
  };
}

/**
 * Removes a Slide
 *
 *
 * @return {object} An action object with a type of REMOVE_SLIDE
 */
export function removeSlide() {
  return {
    type: REMOVE_SLIDE,
  };
}

/**
 * Adds text to slide
 *
 *
 * @return {object} An action object with a type of ADD_TEXT
 */
export function addText() {
  return {
    type: ADD_TEXT,
  };
}

/**
 * Removes text to slide
 *
 *
 * @return {object} An action object with a type of REMOVE_TEXT
 */
export function removeText() {
  return {
    type: REMOVE_TEXT,
  };
}

/**
 * Adds text to slide
 * @param  {string} data
 *
 * @return {object} An action object with a type of ADD_DATA
 */
export function addData(data) {
  return {
    type: ADD_DATA,
    data,
  };
}

/**
 * Adds text to slide
 * @param  {number} id
 *
 * @return {object} An action object with a type of CHANGE_SLIDE
 */
export function changeSlide(id) {
  return {
    type: CHANGE_SLIDE,
    id,
  };
}
