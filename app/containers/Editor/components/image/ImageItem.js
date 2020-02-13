import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { Image } from 'semantic-ui-react';

import { changeImagePosition } from '../../redux-store/actions';
import {
  selectAssetsPath,
  selectCurrentImageObject,
} from '../../redux-store/selectors';

function ImageItem({ id, imageObj, assetsPath, onChangePosition }) {
  // every image gets his id from the caller
  // and keeps his delta position
  // his normal position
  // and his source
  // then renders the Draggable Component and inside the Image component
  const [myDeltaPosition, setMyDeltaPosition] = useState({ x: 0, y: 0 });
  const myPath = `${assetsPath}/static/${imageObj.src}`;
  const position = { x: imageObj.position.x, y: imageObj.position.y };
  // it should be capable of updating its own position
  // it should be able to trace its delta and update local state and redux state
  const handleDrag = (e, ui) => {
    console.log('ui', ui.deltaX, ui.deltaY);
    const { x, y } = myDeltaPosition;
    setMyDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };
  const handleDragStop = () => {
    onChangePosition(id, {
      x: position.x + myDeltaPosition.x,
      y: position.y + myDeltaPosition.y,
    });
  };
  console.log('myDeltaPosition', myDeltaPosition, 'position', position);
  // render the draggable image
  return (
    <Draggable
      key={id}
      positionOffset={position}
      onDrag={handleDrag}
      onStop={handleDragStop}
    >
      <Image
        size="medium" // fix the size
        src={myPath}
        alt=""
        // className="img-responsive"
      />
    </Draggable>
  );
}

ImageItem.propTypes = {
  id: PropTypes.number,
  imageObj: PropTypes.object,
  onChangePosition: PropTypes.func,
  assetsPath: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePosition: (id, position) =>
      dispatch(changeImagePosition(id, position)),
  };
}

export default connect(
  state => ({
    assetsPath: selectAssetsPath(state),
    imageObj: selectCurrentImageObject(state),
  }),
  mapDispatchToProps,
)(ImageItem);
