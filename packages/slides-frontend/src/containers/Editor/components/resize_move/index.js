import React, {useState} from 'react';
import PropTypes from 'prop-types';
import reactable from 'reactablejs';
import interact from 'interactjs';
import {connect} from 'react-redux';
import { Label }  from 'semantic-ui-react'
import {getItems} from '../../../redux-store/DeckReducer/selectors';
import Text from '../text';
import Image from '../image';
import {deleteImage} from '../../../../utils/requests';
import {removeItem} from '../../../redux-store/DeckReducer/actions';
import {
  changeItemPosition,
  changeItemSize,
  setEditMode,
} from '../../../redux-store/DeckReducer/actions';
import {
  getAssetsPath,
  getTitle,
  getPresentationMode,
} from '../../../redux-store/PresentationReducer/selectors';
import './index.css';

// instead of x, y I should have % percentages
const editMode = (type, edit) => type === 'TEXT' && edit;
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
const Core = ({
  x,
  y,
  width,
  height,
  getRef,
  item,
  assetsPath,
  onRemoveItem,
  username,
  title,
  token,
  presentationMode,
  slidesStringified
}) => {
  const ItemComponent = item.type === 'TEXT' ? Text : Image;
  const [closeIconShown, setCloseIconShown] = useState(false);
  const deleter = e => {
    // send a delete in Redux
    if (presentationMode) return;
    if (item.type === 'TEXT' && item.Edit) {
      // text in edit mode so don't delete it
      return;
    }
    // send a delete in Server if it is an Image
    if (item.type === 'IMAGE') {
      deleteImage(assetsPath, username, title, item.Src, token, slidesStringified);
    }
    onRemoveItem(item.ID);
  };

  return (
    <div
      style={{
        // amazing how much this helps in consistent position of elements (absolute)
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        boxSizing: 'border-box',
        display: 'inline-block',
      }}
      className="item-style"
      ref={getRef}
      onMouseEnter={() => setCloseIconShown(true)}
      onMouseLeave={() => setCloseIconShown(false)}
    >
      {/* presentation mode and edit mode no close icon */}
      {/* deleter of icon */}
      {closeIconShown && !editMode(item.type, item.Edit) && !presentationMode && (
        <Label as='a' corner='right' icon='close' onClick={deleter} />
      )}
      <ItemComponent ID={item.ID}/>
    </div>
)};

const Reactable = reactable(Core);

// utils to transform between percentages and pixels
const getPercentage = (px, screenAttribute) => px / screenAttribute;
const getPixels = (percentage, screenAttribute) => percentage * screenAttribute;

function MoveResize({
  ID,
  item,
  onChangePosition,
  onChangeSize,
  onSetEditMode,
  presentationMode,
  assetsPath,
  onRemoveItem,
  username,
  title,
  token,
  slidesStringified
}) {
  const [coordinate, setCoordinate] = useState({
    x: getPixels(item.Position.x, window.innerWidth),
    y: getPixels(item.Position.y, window.innerHeight),
    width: getPixels(item.Size.width, window.innerWidth),
    height: getPixels(item.Size.height, window.innerHeight),
  });

  // const editMode = (type, edit) => type === 'TEXT' && edit;

  const onDragStop = e => {
    console.log('coordinate:', coordinate);
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
      assetsPath={assetsPath}
      onRemoveItem={onRemoveItem}
      username={username}
      title={title}
      token={token}
      presentationMode={presentationMode}
      slidesStringified={slidesStringified}
    />
  );

  const textEditModeRender = () =>
  <Reactable
    {...coordinate}
    item={item}
    assetsPath={assetsPath}
    onRemoveItem={onRemoveItem}
    username={username}
    title={title}
    token={token}
    presentationMode={presentationMode}
    slidesStringified={slidesStringified}
  />;

  return (
    <div>
      {editMode(item.type, item.Edit) ? (
        <div>{textEditModeRender()}</div>
      ) : (
        <div id={ID} onDoubleClick={handler}>
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
  assetsPath: PropTypes.string,
  onRemoveItem: PropTypes.func,
  username: PropTypes.string,
  title: PropTypes.string,
  token: PropTypes.string,
  presentationMode: PropTypes.bool,
  slidesStringified: PropTypes.string,
};

MoveResize.propTypes = {
  ID: PropTypes.string,
  item: PropTypes.object,
  onChangePosition: PropTypes.func,
  onChangeSize: PropTypes.func,
  onSetEditMode: PropTypes.func,
  presentationMode: PropTypes.bool,
  assetsPath: PropTypes.string,
  onRemoveItem: PropTypes.func,
  username: PropTypes.string,
  title: PropTypes.string,
  token: PropTypes.string,
  slidesStringified: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onRemoveItem: id => dispatch(removeItem(id)),
    onChangePosition: (id, position) => dispatch(changeItemPosition(id, position)),
    onChangeSize: (id, position) => dispatch(changeItemSize(id, position)),
    onSetEditMode: (id, edit) => dispatch(setEditMode(id, edit)),
  };
}

export default connect(
  (state, ownProps) => ({
    item: getItems(state).find(itm => itm.ID === ownProps.ID),
    presentationMode: getPresentationMode(state),
    assetsPath: getAssetsPath(state),
    title: getTitle(state),
    username: state.keycloak.userToken.cern_upn,
    token: state.keycloak.instance.token,
    slidesStringified: JSON.stringify(state.deck.slides),
    // this makes the string way smaller and so way faster to search for the image name in the deleter
  }),
  mapDispatchToProps
)(MoveResize);
