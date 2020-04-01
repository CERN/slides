import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';
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
  const [curSize, setCurSize] = useState(item.Size);
  const [curPosition, setCurPosition] = useState(item.Position);
  //   const [size, setSize] = useState({
  //     width: item.Size.width,
  //     height: item.Size.height,
  //   });
  //   const [pos, setPos] = useState({ x: item.Position.x, y: item.Position.y });

  return (
    <Rnd
      size={curSize}
      position={curPosition}
      bounds=".deck" // this allows the item to move only inside the deck className
      onDragStop={(e, d) => {
        // setPos({ x: d.x, y: d.y });
        // e.preventDefault();
        const posi = { x: d.x, y: d.y };
        setCurPosition(posi);
        onChangePosition(ID, posi);
      }}
      //   onResizeStop={(e, direction, ref, delta, otherPosition) => {
      //     e.preventDefault();
      //     const siz = {
      //       width: ref.style.width,
      //       height: ref.style.height,
      //     };
      //     setCurSize(siz);
      //     onChangeSize(ID, siz);
      //   }}
    >
      <MyItem itemObj={item} />
    </Rnd>
  );
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
