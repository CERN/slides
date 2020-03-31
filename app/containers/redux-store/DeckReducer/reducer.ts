import produce from 'immer';
const uuidv4 = require("uuid/v4");

import { Action } from './actions';
import {
  ADD_SLIDE,
  REMOVE_SLIDE,
  CHANGE_SLIDE,
  ADD_ITEM,
  REMOVE_ITEM,
  CHANGE_ITEM_POSITION,
  CHANGE_ITEM_SIZE,
  EDIT_DATA,
  SET_EDIT_MODE,
  LOAD_DECK_STATE,
} from './constants';
import { Item, newItem, ItemTypes, Text, Deck, Slide} from './definitions';

export let initialDeck:Deck = {
  currentSlide: 0,
  slides: [],
}
export const newSlide:Slide = {
  ID: uuidv4(),
  itemsArray: [],
}
initialDeck.slides.push(newSlide);

const DeckState = (state: Deck = initialDeck, action: Action): Deck =>
  produce(state, (draft:Deck) => {
    // eslint-disable-next-line no-console
    switch (action.type) {
      case ADD_SLIDE: {
        const slide:Slide = {
          ID: uuidv4(),
          itemsArray: [], // add a box that can be image or text
        }
        draft.slides.splice(draft.currentSlide + 1, 0, slide);
        break;
      }
      case REMOVE_SLIDE: {
        if (draft.slides.length > 1) {
          draft.slides.splice(draft.currentSlide, 1);
          // eslint-disable-next-line no-alert
        } else alert('Not possible to remove the only slide');
        break;
      }
      case CHANGE_SLIDE: {
        draft.currentSlide = Number(action.payload.location.hash.substr(2));
        break;
      }
      case ADD_ITEM: {
        // user wants to add text or image
        // an object with the properties of an image or text
        const itm:Item = newItem(action.item);
        draft.slides[draft.currentSlide].itemsArray.push(itm);
        break;
      }
      case REMOVE_ITEM: {
        const ind:number = draft.slides[draft.currentSlide].itemsArray.findIndex((itm:Item) => itm.ID === action.id);
        if (ind === -1) break; // otherwise it will delete the last item
        draft.slides[draft.currentSlide].itemsArray.splice(ind, 1);
        break;
      }
      case CHANGE_ITEM_POSITION: {
        const ind:number = draft.slides[draft.currentSlide].itemsArray.findIndex((itm:Item) => itm.ID === action.id);
        if (ind === -1) break;
        draft.slides[draft.currentSlide].itemsArray[ind].Position = {...action.position};
        break;
      }
      case CHANGE_ITEM_SIZE: {
        const ind:number = draft.slides[draft.currentSlide].itemsArray.findIndex((itm:Item) => itm.ID === action.id);
        if (ind === -1) break;
        // draft.slides[draft.currentSlide].itemsArray[ind].changeSize(action.size);
        draft.slides[draft.currentSlide].itemsArray[ind].Size = {...action.size};
        break;
      }
      case EDIT_DATA: {
        const ind:number = draft.slides[draft.currentSlide].itemsArray.findIndex((itm:Item) => itm.ID === action.id);
        if (ind === -1) break;
        if(draft.slides[draft.currentSlide].itemsArray[ind].type === ItemTypes.IMAGE){
          throw new Error("I got an editDate for an Image");
        }
        const currentText = (draft.slides[draft.currentSlide].itemsArray[ind] as Text);
        currentText.Data = action.data;
        (draft.slides[draft.currentSlide].itemsArray[ind] as Text) = (currentText as Text);
        break;
      }
      case SET_EDIT_MODE: {
        const ind:number = draft.slides[draft.currentSlide].itemsArray.findIndex((itm:Item) => itm.ID === action.id);
        if (ind === -1) break;
        if(draft.slides[draft.currentSlide].itemsArray[ind].type === ItemTypes.IMAGE){
          throw new Error("I got an editMode for an Image");
        }
        const currentText = {...(draft.slides[draft.currentSlide].itemsArray[ind] as Text)};
        currentText.Edit = action.edit;
        (draft.slides[draft.currentSlide].itemsArray[ind] as Text) = (currentText as Text);
        break;
      }
      case LOAD_DECK_STATE: {
        const newDeckState: Deck = {
          ...action.state,
        }
        Object.assign(draft, newDeckState);
        break;
      }
    }
});

export default DeckState;
