import React from 'react';
import { Slide, Text } from 'spectacle';
import PropTypes from 'prop-types';

function MySlide({ content, id }) {
  console.log("...... it is : ", content, id)
  const presentTexts = textArray => {
    let resultTexts = [];
    console.log("textarray is", textArray)
    resultTexts = textArray.map(elem => {
      <Text>{elem.data}</Text>
    })
    console.log("resultsTextssssss ", resultTexts)
    return resultTexts;
  }
  const presentImages = imageArray => imageArray;
  const present = (content) => {
    // first run through the text array
    // run through the image array
    return presentTexts(content.textArray).concat(presentImages(content.imageArray));
  }
  return <Slide id={id}>{present(content)}</Slide>;
}

MySlide.propTypes = {
  content: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};
export default MySlide;
