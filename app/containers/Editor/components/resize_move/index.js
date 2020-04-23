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
  setEditMode,
} from '../../../redux-store/DeckReducer/actions';

// min height, min width
const Core = ({ x, y, width, height, getRef, item }) => (
  <div
    style={{
      // amazing how much this helps in consistent position of elements (absolute)
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      // border: '1px solid black',
      boxSizing: 'border-box',
      display: 'inline-block',
      // padding: 0,
      // display: 'block',
      // overflow: 'hidden',
    }}
    ref={getRef}
  >
    <MyItem itemObj={item} />
  </div>
);

const Reactable = reactable(Core);

function MoveResize({
  ID,
  item,
  onChangePosition,
  onChangeSize,
  onSetEditMode,
}) {
  const [coordinate, setCoordinate] = useState({
    x: item.Position.x,
    y: item.Position.y,
    width: item.Size.width,
    height: item.Size.height,
  });

  const editMode = (type, edit) => type === 'TEXT' && edit;

  const onDragStop = e => {
    e.preventDefault();
    const x = e.client.x - e.clientX0 + coordinate.x;
    const y = e.client.y - e.clientY0 + coordinate.y;
    console.log('Drag Stopped', x, y);
    onChangePosition(ID, {
      x,
      y,
    });
  };

  const onResizeStop = e => {
    e.preventDefault();
    const { width, height } = e.rect;
    console.log('Resize Stopped', width, height);
    onDragStop(e);
    onChangeSize(ID, {
      width,
      height,
    });
  };

  const handler = () => {
    if (item.type === 'TEXT' && !item.Edit) {
      onSetEditMode(ID, true);
    }
  };

  const movableItemRender = () => (
    <Reactable
      draggable={{
        onmove: e => {
          setCoordinate(prev => ({
            ...prev,
            x: prev.x + e.dx,
            y: prev.y + e.dy,
          }));
        },
        onend: e => {
          onDragStop(e);
        },
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: '.deck',
            endOnly: false,
          }),
        ],
      }}
      resizable={{
        edges: { left: true, right: true, bottom: true, top: true },
        // preserveAspectRatio: true,
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
        onend: e => {
          onResizeStop(e);
        },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: '.deck',
            endOnly: false,
          }),
        ],
      }}
      {...coordinate}
      item={item}
    />
  );

  const textEditModeRender = () => {
    // const specialCoordinates = {
    //   ...coordinate,
    //   width: 800,
    //   height: 400,
    // };
    return <Reactable {...coordinate} item={item} />;
  };

  console.log("my coordinates are:", coordinate)
  return (
    <div>
      {editMode(item.type, item.Edit) ? (
        <div>{textEditModeRender()}</div>
      ) : (
        <div id={item.ID} onDoubleClick={handler}>
          {movableItemRender()}
        </div>
      )}
    </div>
  );
}

Core.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  getRef: PropTypes.any,
  item: PropTypes.object,
};

MoveResize.propTypes = {
  ID: PropTypes.string,
  item: PropTypes.object,
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
  (state, ownProps) => ({
    item: getItems(state).find(itm => itm.ID === ownProps.ID),
  }),
  mapDispatchToProps,
)(MoveResize);
