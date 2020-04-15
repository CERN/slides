import React, { useState } from 'react';
import PropTypes from 'prop-types';
import reactable from 'reactablejs';
import interact from 'interactjs';

import { connect } from 'react-redux';

import MyItem from '../item';
import { getItems } from '../../../redux-store/DeckReducer/selectors';
import {
  changeItemPosition,
  changeItemSize,
} from '../../../redux-store/DeckReducer/actions';

// im only getting the itm ID

const Core = ({ x, y, width, height, angle, getRef, ID, itemsArray }) => {
  const item = itemsArray.find(itm => itm.ID === ID);
  return (
    <div
      style={{
        position: 'relative',
        left: x,
        top: y,
        width,
        height,
        transform: `rotate(${angle}deg)`,
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
      ref={getRef}
    >
      <MyItem itemObj={item} />
    </div>
  );
};

Core.defaultProps = {
  x: 0,
  y: 0,
  width: 1000,
  height: 80,
  angle: 0,
};

Core.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  angle: PropTypes.number,
  getRef: PropTypes.any,

  ID: PropTypes.string,
  itemsArray: PropTypes.array,
};

const Reactable = reactable(Core);

function MoveResize({ ID, itemsArray, onChangePosition, onChangeSize }) {
  const [coordinate, setCoordinate] = useState({
    x: 0,
    y: 0,
    width: 300,
    height: 200,
  });
  console.log('new position is:', coordinate);
  return (
    <Reactable
      draggable={{
        onmove: event => {
          setCoordinate(prev => ({
            ...prev,
            x: prev.x + event.dx,
            y: prev.y + event.dy,
          }));
        },
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: '.deck',
            endOnly: true,
          }),
        ],
      }}
      resizable={{
        edges: { left: true, right: true, bottom: true, top: true },
        onmove: e => {
          const { width, height } = e.rect;
          const { left, top } = e.deltaRect;
          setCoordinate(prev => ({
            x: prev.x + left,
            y: prev.y + top,
            width,
            height,
          }));
        },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: '.deck',
            endOnly: true,
          }),
        ],
      }}
      {...coordinate}
      ID={ID}
      itemsArray={itemsArray}
    />
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
