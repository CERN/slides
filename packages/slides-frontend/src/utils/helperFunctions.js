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

export {
    canDeleteImageFromBackend,
    deepCopyFunction,
};
