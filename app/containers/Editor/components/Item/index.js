// this is a very important file
// it is a generic component
// can be text or image
// and knows its position and size
// it can be focused or put in the background
// it has keyboard listeners for delete
// it can be resized and move
// it is the div inside which we will render the text or image
// it has a ref
// every itemObj from the store has it's own id
// its parent component is an array of them
// i have only one array of elements in the redux but has a type  text/image
// depending on that the obj is different and will be rendered differently
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Item({ itemObj }) {
  const ref = useRef(null);
  const { position, size, type } = itemObj;
  // this is something that doesn't need to be stored in store
  // will change in with clicks
  const [focused, setFocused] = useState(false);
}
