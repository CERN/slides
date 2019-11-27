/**
 * Presentation selectors
 */

const selectDeckOfSlides = state => state.global.DeckOfSlides;
const selectCurrentSlide = state => state.global.currentSlide;
const selectTheme = state => state.global.theme;

export { selectDeckOfSlides, selectCurrentSlide, selectTheme };
