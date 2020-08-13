import React, {useState} from 'react';
import PropTypes from 'prop-types';
import reactable from 'reactablejs';
import interact from 'interactjs';

import {connect} from 'react-redux';

import MyItem from '../item';
import {getItems} from '../../../redux-store/DeckReducer/selectors';
import {getPresentationMode} from '../../../redux-store/PresentationReducer/selectors';

import {
  changeItemPosition,
  changeItemSize,
  setEditMode,
} from '../../../redux-store/DeckReducer/actions';

// instead of x, y I should have % percentages

// min height, min width
const restrictSizeParameters = type =>
  type === 'TEXT'
    ? {
        min: {width: 500, height: 80},
        // max: { width: 800, height: 400 },
      }
    : {
        min: {width: 100, height: 80},
        // max: { width: 1000, height: 800 },
      };

// : x,y: 350, 330 for middle
const Core = ({x, y, width, height, getRef, item}) => (
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
      // 'vertical-align': 'middle',
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

// utils to transform between percentages and pixels
const getPercentage = (px, screenAttribute) => px / screenAttribute;
const getPixels = (percentage, screenAttribute) => percentage * screenAttribute;

function MoveResize({ID, item, onChangePosition, onChangeSize, onSetEditMode, presentationMode}) {
  console.log('the item in move resize is: ', item);
  const [coordinate, setCoordinate] = useState({
    x: getPixels(item.Position.x, window.innerWidth),
    y: getPixels(item.Position.y, window.innerHeight),
    width: getPixels(item.Size.width, window.innerWidth),
    height: getPixels(item.Size.height, window.innerHeight),
  });

  const editMode = (type, edit) => type === 'TEXT' && edit;

  const onDragStop = e => {
    console.log('coordinate::::::::', coordinate);
    const x = e.client.x - e.clientX0 + coordinate.x;
    const y = e.client.y - e.clientY0 + coordinate.y;
    console.log('Drag Stopped', x, y);
    onChangePosition(ID, {
      x: getPercentage(x, window.innerWidth),
      y: getPercentage(y, window.innerHeight),
    });
  };

  const onResizeStop = e => {
    const {width, height} = e.rect;
    console.log('Resize Stopped', width, height);
    onDragStop(e);
    onChangeSize(ID, {
      width: getPercentage(width, window.innerWidth),
      height: getPercentage(height, window.innerHeight),
    });
  };

  const handler = () => {
    // if in presentation Mode you can't change the editing of an item
    if (presentationMode) return;
    if (item.type === 'TEXT' && !item.Edit) {
      onSetEditMode(ID, true);
    }
  };

  const movableItemRender = () => (
    <Reactable
      draggable={{
        // if I am in presentation Mode don't let user mode items around
        enabled: !presentationMode,
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
            endOnly: true,
            // hold: 1000
          }),
        ],
      }}
      resizable={{
        // if I am in presentation Mode don't let user mode items around
        enabled: !presentationMode,
        edges: {left: true, right: true, bottom: true, top: true},
        // preserveAspectRatio: true,
        onmove: e => {
          const {width, height} = e.rect;
          const {left, top} = e.deltaRect;
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
            endOnly: true,
            // hold: 1000
          }),
          interact.modifiers.restrictSize(restrictSizeParameters(item.type)),
        ],
      }}
      {...coordinate}
      item={item}
    />
  );

  const textEditModeRender = () => <Reactable {...coordinate} item={item} />;

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
  presentationMode: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePosition: (id, position) => dispatch(changeItemPosition(id, position)),
    onChangeSize: (id, position) => dispatch(changeItemSize(id, position)),
    onSetEditMode: (id, edit) => dispatch(setEditMode(id, edit)),
  };
}

export default connect(
  (state, ownProps) => ({
    item: getItems(state).find(itm => itm.ID === ownProps.ID),
    presentationMode: getPresentationMode(state),
  }),
  mapDispatchToProps
)(MoveResize);
