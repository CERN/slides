const uuidv4 = require("uuid/v4");

export type position = {
    x: number
    y: number
  }
export type size = {
    width: number
    height: number
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
      this.Size = { width: 0, height: 0 };
      this.Focused = false;
    }
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
      this.Size = { width: 500, height: 80 };
    }
  }

export class Image extends baseItem {
    readonly type: string
    Src: string
    constructor(src: string){
      super();
      this.type = ItemTypes.IMAGE;
      this.Src = src;
      this.Size = { width: 500, height: 300 };
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
        const { Src } = obj;
        return new Image(Src);
      default:
        throw new Error('Object type is not TEXT neither IMAGE');
    }
}
