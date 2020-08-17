
const canDeleteImageFromBackend = (imageName, slidesStringified) => {
    const slides = JSON.parse(slidesStringified);
    let counter = 0;
    slides.map(slide =>
        slide.itemsArray.map(item => {
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
      return inObject; // Return the value if inObject is not an object
    }
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
    for (key in inObject) {
      value = inObject[key];
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopyFunction(value);
    }
    return outObject;
}

export {
    canDeleteImageFromBackend,
    deepCopyFunction,
};
