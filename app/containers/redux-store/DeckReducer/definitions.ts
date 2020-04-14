const uuidv4 = require("uuid/v4");

export type position = {
    x: number
    y: number
  }
export type size = {
    width: string
    height: string
  }

export const ItemTypes = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
}

class baseItem {
    ID: string
    Position: position
    Size: size
    Focused: boolean
    constructor(){
      this.ID = uuidv4();
      this.Position= {x: 0, y: 0};
      this.Size = { width: '15em', height: '15em' }; // make it bigger 
      // doesn't work from here, it takes semantic size
      this.Focused = false;
    }
    // changePosition(position: position) {
    //   this.Position = {...position};
    // }
    // changeSize(size: size) {
    //   this.Size = {...size};
    // }
    // toggleFocus(focus: boolean) {
    //   this.Focused = focus;
    // }
}

export class Text extends baseItem {
    readonly type: string
    Data: string
    Edit: boolean
    constructor(){
      super();
      this.type = ItemTypes.TEXT
      this.Data = "<p></p>\n";
      this.Edit = false;
    }
    // toggleEdit(edit: boolean){
    //   this.Edit = edit;
    // }
    // setData(data: string){
    //   this.Data = data;
    // }
  }

export class Image extends baseItem {
    readonly type: string
    Src: string
    constructor(src: string){
      super();
      this.type = ItemTypes.IMAGE;
      this.Src = src;
    }
  }

export type Item = Text | Image;

export type Slide = {
  ID: string
  itemsArray: Array<Item>
}

export type Deck = {
  currentSlide: number
  slides: Array<Slide>
}

export const newItem = (obj: any): Item => {
    switch(obj.type){
      case ItemTypes.TEXT:
        return new Text();
      case ItemTypes.IMAGE:
        const { src } = obj;
        return new Image(src);
      default:
        throw new Error('Object type is not TEXT neither IMAGE');
    }
}
