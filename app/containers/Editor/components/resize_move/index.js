import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Rnd } from 'react-rnd';
import Draggable from 'react-draggable';
// IF I USE DRAGGABLE PLACE A DIV INSIDE IT
import { connect } from 'react-redux';

import MyItem from '../item';
import { getItems } from '../../../redux-store/DeckReducer/selectors';
import {
  changeItemPosition,
  changeItemSize,
} from '../../../redux-store/DeckReducer/actions';

// im only getting the itm ID
function MoveResize({ ID, itemsArray, onChangePosition, onChangeSize }) {
  const item = itemsArray.find(itm => itm.ID === ID);
  // const [myDeltaPosition, setMyDeltaPosition] = useState({ x: 0, y: 0 });
  // const position = { x: item.Position.x, y: item.Position.y };
  // const focused = item.Focused;
  // console.log('ID ', ID, ' position', position);
  // const handleDrag = (e, ui) => {
  //   const { x, y } = myDeltaPosition;
  //   setMyDeltaPosition({
  //     x: x + ui.deltaX,
  //     y: y + ui.deltaY,
  //   });
  // };
  // const handleDragStop = () => {
  //   onChangePosition(ID, {
  //     x: position.x + myDeltaPosition.x,
  //     y: position.y + myDeltaPosition.y,
  //   });
  // };

  return (
    // <Draggable
    //   // bounds=".deck"
    //   positionOffset={position}
    //   onDrag={handleDrag}
    //   onStop={handleDragStop}
    // >
      // <div>
        <MyItem itemObj={item} />
      // </div>
    // </Draggable>
  );
  // return (
  //   <div>
  //     {item.type === 'Text' && item.}
  //   </div>
  // )
}

MoveResize.propTypes = {
  ID: PropTypes.string,
  itemsArray: PropTypes.array,
  onChangePosition: PropTypes.func,
  onChangeSize: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePosition: (id, position) =>
      dispatch(changeItemPosition(id, position)),
    onChangeSize: (id, position) => dispatch(changeItemSize(id, position)),
  };
}

export default connect(
  state => ({
    itemsArray: getItems(state),
  }),
  mapDispatchToProps,
)(MoveResize);
