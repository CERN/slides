// import happy from '../../assets/happy.jpg';

// export default function ImageComponent() {
//   console.log('kalesthka???');
//   return <Image src={happy} width={800} />;
// }
/// needs work
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'spectacle';
import { Rnd } from 'react-rnd';
import {
  selectDeckOfSlides,
  selectCurrentSlide,
  selectCurrentImageArray,
} from './selectors';
import { addData, changePosition, toggleEditMode } from './actions';
import './styles.css';
export function ImageComponent({
  DeckOfSlides,
  currentSlide,
  imageArrayEntry,
  currentImageArray,
}) {

    const imageLocation = currentImageArray[imageArrayEntry].location;
    import image from imageLocation;
  const pos = currentImageArray[imageArrayEntry].position;
  const [position, setPosition] = useState({
    width: pos.width,
    height: pos.height,
    x: pos.x,
    y: pos.y,
  });

  const onHandlePosition = (evt, posi) => {
    evt.preventDefault();
    setPosition(posi);
  };

  return (

        <Rnd
          className="text-style"
          style={style}
          // default={position}
          size={{ width: position.width, height: position.height }}
          position={{ x: position.x, y: position.y }}
          onDragStop={(e, d) => {
            onHandlePosition(e, {
              width: position.width,
              height: position.height,
              x: d.x,
              y: d.y,
            });
            //   // d.y is going up when i drag down
            //   // d.x is going up when i drag left
          }}
          onResizeStop={(e, direction, ref, delta, posi) => {
            onHandlePosition(e, {
              width: ref.style.width,
              height: ref.style.height,
              ...posi,
            });
          }}
          minWidth={500}
          minHeight={70}
          bounds="body"
          onDoubleClick={onDoubleClick}
        >
          <Image src={happy} width={800} />
        </Rnd>

  );
}

ImageComponent.propTypes = {
  DeckOfSlides: PropTypes.array,
  currentSlide: PropTypes.number,
  onAddData: PropTypes.func,
  textArrayEntry: PropTypes.number,
  onChangePosition: PropTypes.func,
  currentTextArray: PropTypes.array,
  onToggleEditMode: PropTypes.func,
  editMode: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAddData: (id, data) => dispatch(addData(id, data)),
    onChangePosition: (id, position) => dispatch(changePosition(id, position)),
    onToggleEditMode: () => dispatch(toggleEditMode()),
  };
}

export default connect(
  state => ({
    DeckOfSlides: selectDeckOfSlides(state),
    currentSlide: selectCurrentSlide(state),
    currentTextArray: selectCurrentTextArray(state),
    editMode: selectEditMode(state),
  }),
  mapDispatchToProps,
)(ImageComponent);
