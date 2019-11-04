// /*
//  * AppReducer
//  *
//  * The reducer takes care of our data. Using actions, we can
//  * update our application state. To add a new action,
//  * add it to the switch statement in the reducer function
//  *
//  */
// /*
//  * PresentationReducer
//  *
//  * The reducer takes care of our data. Using actions, we can
//  * update our application state. To add a new action,
//  * add it to the switch statement in the reducer function
//  *
//  */
// import produce from 'immer';
// import { ADD_SLIDE, REMOVE_SLIDE } from './constants';

// // The initial state of the App
// export const initialState = {
//     DeckOfSlides: [
//         {
//             textArray: ["That's the first Slide", "That's the second text of the slide"],
//             imageArray: [],
//         },
//         {
//             textArray: ["That's the second Slide"],
//             imageArray: [],
//         },
//     ],
//     currentSlide: 0,
// };

// /* eslint-disable default-case, no-param-reassign */
// const PresentationReducer = (state = initialState, action) =>
//     produce(state, draft => {
//         switch (action.type) {
//             case ADD_SLIDE:
//                 draft.currentSlide = 23;
//                 break;
//         }
//     });

// // produce((draft, action) => {
// //   switch (action.type) {
// //     case ADD_SLIDE:
// //       draft.currentSlide = action.payload + 1;
// //       draft.DeckOfSlides.push({
// //         textArray: ["That's another Slide"],
// //         imageArray: [],
// //       })
// //       break;
// //     case REMOVE_SLIDE:
// //       draft.DeckOfSlides.splice(action.id, 1); // check again may not be working
// //       break;
// //   }
// // });

// export default PresentationReducer;
