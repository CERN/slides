import React, { useState, useEffect } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Draggable from 'react-draggable';
import { Image } from 'semantic-ui-react';
import {
  changeImagePosition,
  changeImageSize,
  deleteImage,
} from '../../redux-store/actions';
import { selectAssetsPath } from '../../redux-store/selectors';

// fix the wrong mounting of this component
function ImageItem({
  id,
  imageObj,
  assetsPath,
  onChangePosition,
  onChangeImageSize,
  onDeleteImage,
}) {
  // this base will be the server's address base for every image , localhost:3000/public/static/images
  // every image gets his id from the caller
  // and keeps his delta position
  // his normal position
  // and his source
  // then renders the Draggable Component and inside the Image component
  const [myDeltaPosition, setMyDeltaPosition] = useState({ x: 0, y: 0 });
  const myPath = `${assetsPath}/static/${imageObj.src}`;
  const position = { x: imageObj.position.x, y: imageObj.position.y };
  const handleDrag = (e, ui) => {
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


  const delImageReq = () => {
    const url = `${assetsPath}/image`;
    return axios.delete(url, { params: { id: `${imageObj.src}` } });
  };

  const delImage = e => {
    e.preventDefault();
    // send a delete in Redux
    onDeleteImage(id);
    // send a delete in Server
    delImageReq().then(response => {
      console.log('Delete response is: ', response);
    });
  };
  // useeffect [] this is only mount and unmount

  // render the draggable image
  return (
    <div>
      <KeyboardEventHandler
        handleKeys={['backspace', 'del']}
        onKeyEvent={(key, e) => delImage(e)}
      />
      <Draggable
        // key={id}
        positionOffset={position}
        onDrag={handleDrag}
        onStop={handleDragStop}
      >
        <Image src={myPath} alt="" size="medium" />
      </Draggable>
    </div>
  );
}

ImageItem.propTypes = {
  id: PropTypes.number,
  imageObj: PropTypes.object,
  onChangePosition: PropTypes.func,
  onChangeImageSize: PropTypes.func,
  assetsPath: PropTypes.string,
  onDeleteImage: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePosition: (id, position) =>
      dispatch(changeImagePosition(id, position)),
    onChangeImageSize: (id, position) =>
      dispatch(changeImageSize(id, position)),
    onDeleteImage: id => dispatch(deleteImage(id)),
  };
}

export default connect(
  state => ({
    assetsPath: selectAssetsPath(state),
  }),
  mapDispatchToProps,
)(ImageItem);
