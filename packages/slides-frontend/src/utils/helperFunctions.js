// check if the image name string appears in state
// if only one, it means that it is the last time the image appears in the slides and has to be deleted

const deleteImageFromBackend = (imageName, slidesStringified) => (slidesStringified.match(new RegExp(imageName,"g")) || []).length === 1;

export {
    deleteImageFromBackend,
};
