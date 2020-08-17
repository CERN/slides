// check if the image name string appears in state
// if only one, it means that it is the last time the image appears in the slides and has to be deleted

// const canDeleteImageFromBackend = (imageName, slidesStringified) => {
//     console.log("slidesStringified:", slidesStringified)
//     console.log("imageName:", imageName)
//     const newimageName = `"type":"IMAGE","Src":"${imageName}"`
//     console.log("imageName:", newimageName)
//     return (slidesStringified.match(new RegExp(newimageName, "g")) || []).length === 1;
// }

const canDeleteImageFromBackend = (imageName, slidesStringified) => {
    const slides = JSON.parse(slidesStringified);
    console.log("slides:", slides);

    const imageArray = slides.map(slide =>
        slide.itemsArray.map(item => {
            if (item.type === "IMAGE" && item.Src === imageName) {
                return item.Src;
            }
        })
    );
    console.log("imageArray", imageArray)
    return (imageArray || []).length === 1;
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
