import produce from 'immer';
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
  TOGGLE_FOCUS,
  CLONE_SLIDE,
} from './constants';
import { Item, newItem, ItemTypes, Text, Deck, Slide} from './definitions';

const uuidv4 = require("uuid/v4");


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

        // this code is to add two text Boxes by default in any new slide
        // START
        const TitleBox = {
          type: ItemTypes.TEXT,
        }
        const DescriptionBox = {
          type: ItemTypes.TEXT,
        }
        const itm1: Item = newItem(TitleBox);
        const itm2: Item = newItem(DescriptionBox);

        // itm1 - Title
        itm1.Position = {
          x: 0.30,
          y: 0.20,
        }
        itm1.Size = {
          width: 0.25,
          height: 0.05,
        }

        // itm2 - Description
        // this weird number comes from this calculation: title's med is: 30 + 25/2 = 42.5
        // to reach this percentage and have the texts inline, the description's x + width/2 = 42.5
        // width/2 is 20so x is 22.5 or 0.225
        itm2.Position = {
          x: 0.225,
          y: 0.30,
        }
        itm2.Size = {
          width: 0.40,
          height: 0.40,
        }
        slide.itemsArray.push(itm1);
        slide.itemsArray.push(itm2);
        // END
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
      case CLONE_SLIDE: {
        // create a new blank slide
        let slide:Slide = {
          ID: uuidv4(),
          itemsArray: [],
        }
        // with a loop over the current itemsArray, create and push newItems in the new itemsArray
        slide.itemsArray = draft.slides[draft.currentSlide].itemsArray.map(currentItem => {
          console.log("itemmmmmmmmmmmmm", currentItem)
          const itemObj: Item = newItem(currentItem);
          console.log(" the itemobj isssssssss", itemObj)
          // change size and position
          itemObj.Size = currentItem.Size;
          itemObj.Position = currentItem.Position;
          // !!if text change data as well!!
          // if (itemObj.type === ItemTypes.TEXT) {
          //   itemObj.Data = currentItem.Data;
          // }
          return itemObj;
        })

        // push the cloned slide in the slides array
        draft.slides.splice(draft.currentSlide + 1, 0, slide);
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
      case TOGGLE_FOCUS: {
        const ind: number = draft.slides[draft.currentSlide].itemsArray.findIndex((itm: Item) => itm.ID === action.id);
        if (ind === -1) break;
        draft.slides[draft.currentSlide].itemsArray[ind].Focused = action.focus;
        break;
      }
    }
});

export default DeckState;
