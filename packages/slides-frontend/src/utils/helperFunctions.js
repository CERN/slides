const canDeleteImageFromBackend = (imageName, slides) => {
    let counter = 0;
    slides.forEach(slide =>
        slide.itemsArray.forEach(item => {
            if (item.type === "IMAGE" && item.Src === imageName) {
                counter = counter + 1;
            }
        })
    );
    return counter === 1;
}

const deepCopyFunction = inObject => {
    let outObject, value, key;
    if (typeof inObject !== "object" || inObject === null) {
      return inObject;
    }
    outObject = Array.isArray(inObject) ? [] : {};
    for (key in inObject) {
      value = inObject[key];
      outObject[key] = deepCopyFunction(value);
    }
    return outObject;
}

// utils to transform between percentages and pixels
const getPercentage = (px, screenAttribute) => px / screenAttribute;

const getPixels = (percentage, screenAttribute) => percentage * screenAttribute;

const getBarsWidth = () => document.getElementById("sidebar").offsetWidth + document.getElementById("settings").offsetWidth;

const getWidthInEditMode = () => window.innerWidth - getBarsWidth();

const getWidth = presentationMode => presentationMode ? window.innerWidth : getWidthInEditMode();

export {
    canDeleteImageFromBackend,
    deepCopyFunction,
    getPercentage,
    getPixels,
    getWidth
};
