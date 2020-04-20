import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import reactable from 'reactablejs';
import interact from 'interactjs';

import { connect } from 'react-redux';

import MyItem from '../item';
import { getItems } from '../../../redux-store/DeckReducer/selectors';
import {
  changeItemPosition,
  changeItemSize,
  setEditMode,
} from '../../../redux-store/DeckReducer/actions';

// min height, min width
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
        // display: 'inline-block',
      }}
      ref={getRef}
    >
      <MyItem itemObj={item} />
    </div>
  );
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

function MoveResize({
  ID,
  itemsArray,
  onChangePosition,
  onChangeSize,
  onSetEditMode,
}) {
  const item = itemsArray.find(itm => itm.ID === ID);
  const handler = () => {
    if (item.type === 'TEXT' && item.Edit === false) {
      console.log('handler double click');
      onSetEditMode(ID, true);
    }
  };
  const [coordinate, setCoordinate] = useState({
    x: item.Position.x,
    y: item.Position.y,
    width: item.Size.width,
    height: item.Size.height,
  });
  const onDragStop = (x, y) => {
    console.log('Drag Stopped');
    onChangePosition(ID, {
      x,
      y,
    });
  };
  const onResizeStop = (x, y, width, height) => {
    console.log('Resize Stopped');
    onChangePosition(ID, {
      x,
      y,
    });
    onChangeSize(ID, {
      width,
      height,
    });
  };

  useEffect(() => {
    console.log('heloooooooo', coordinate);
    onDragStop(coordinate.x, coordinate.y)
  }, [coordinate]);
  // if (document.getElementById(item.ID)) {
  //   console.log(
  //     'and bounding',
  //     document.getElementById(item.ID).getBoundingClientRect(),
  //     'and coords',
  //     getCoords(document.getElementById(item.ID)),
  //   );
  // }
  // get document coordinates of the element
  // function getCoords(elem) {
  //   const box = elem.getBoundingClientRect();

  //   return {
  //     top: box.top + window.pageYOffset,
  //     left: box.left + window.pageXOffset,
  //   };
  // }
  return (
    <div>
      {item.type === 'TEXT' && item.Edit ? (
        <div>
          <MyItem itemObj={item} />
        </div>
      ) : (
        <div id={item.ID} onDoubleClick={handler}>
          <Reactable
            draggable={{
              onmove: e => {
                setCoordinate(prev => ({
                  ...prev,
                  x: prev.x + e.dx,
                  y: prev.y + e.dy,
                }));
              },
              modifiers: [
                interact.modifiers.restrictRect({
                  restriction: '.deck',
                  endOnly: true,
                }),
              ],
            }}
            // resizable={{
            //   edges: { left: true, right: true }, // bottom: true, top: true
            //   onmove: e => {
            //     const { width, height } = e.rect;
            //     const { left, top } = e.deltaRect;
            //     setCoordinate(prev => ({
            //       x: prev.x + left,
            //       y: prev.y + top,
            //       width,
            //       height,
            //     }));
            //   },
            //   modifiers: [
            //     interact.modifiers.restrictEdges({
            //       outer: '.deck',
            //       endOnly: true,
            //     }),
            //   ],
            // }}
            {...coordinate}
            ID={ID}
            itemsArray={itemsArray}
          />
        </div>
      )}
    </div>
  );
}

MoveResize.propTypes = {
  ID: PropTypes.string,
  itemsArray: PropTypes.array,
  onChangePosition: PropTypes.func,
  onChangeSize: PropTypes.func,
  onSetEditMode: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePosition: (id, position) =>
      dispatch(changeItemPosition(id, position)),
    onChangeSize: (id, position) => dispatch(changeItemSize(id, position)),
    onSetEditMode: (id, edit) => dispatch(setEditMode(id, edit)),
  };
}

export default connect(
  state => ({
    itemsArray: getItems(state),
  }),
  mapDispatchToProps,
)(MoveResize);
