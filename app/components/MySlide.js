import React, { useState } from 'react';
import { Slide, Text } from 'spectacle';
import PropTypes from 'prop-types';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import MyText from './MyText';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as SlideActions from '../../actions/deck';

// Make the
function MySlide({ content, id }) {
  // const [content, setContent] = useState([]);
  // const [textArray, setTextArray] = useState([]);
  // const [imageArray, setImageArray] = useState([]);

  // const onAddText = () => {
  //     setTextArray([...textArray, <MyText />])
  // }
  const presentText = textArray => textArray;
  return <Slide id={id}>{presentText(content.textArray)}</Slide>;
}

MySlide.propTypes = {
  content: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

// function mapStateToProps(state, prop) {
//     return {
//         slide: state.slide
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         action: bindActionCreators(SlideActions, dispatch)
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MySlide);
export default MySlide;
