const sanitizeHtml = require('sanitize-html');

const stateSanitizer = stateObj =>
  stateObj.deck.slides.forEach(slide => {
    slide.itemsArray.forEach(item => {
      if (item.type === 'TEXT') {
        const newItem = {...item};
        newItem.Data = sanitizeHtml(item.Data);
        return newItem;
      }
      return item;
    });
  });
export default stateSanitizer;
