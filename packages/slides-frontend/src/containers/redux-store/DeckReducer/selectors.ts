/**
 * Selectors
 */
import { Deck } from './definitions';

const getDeck = (state: { deck: Deck; }) => state.deck.slides;
const getCurrentSlide = (state: { deck: Deck; }) => state.deck.currentSlide;
const getItems = (state: { deck: Deck; }) => state.deck.slides[state.deck.currentSlide].itemsArray;

export {
  getDeck,
  getCurrentSlide,
  getItems,
};
