// this is a very important file
// it is a generic component
// can be text or image
// and knows its position and size
// it has keyboard listeners for delete
// it can be resized and move
// it is the div inside which we will render the text or image
// it has a ref
// every itemObj from the store has it's own id
// its parent component is an array of them
// i have only one array of elements in the redux but has a type  text/image
// depending on that the obj is different and will be rendered differently
import React, {useRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import {deleteImage} from '../../../../utils/requests';
// import {removeItem} from '../../../redux-store/DeckReducer/actions';
import {
  getAssetsPath,
  getTitle,
  getPresentationMode,
} from '../../../redux-store/PresentationReducer/selectors';
// import Text from '../text';
// import Image from '../image';

function Item({
  itemObj,
  onRemoveItem,
  assetsPath,
  title,
  username,
  token,
  presentationMode,
}) {
  const itemRef = useRef(null);

  const {type, ID} = itemObj;
  const ItemComponent = type === 'TEXT' ? Text : Image;

  // const deleter = e => {
  //   // send a delete in Redux
  //   if (presentationMode) return;
  //   if (type === 'TEXT' && itemObj.Edit) {
  //     // text in edit mode so don't delete it
  //     return;
  //   }
  //   onRemoveItem(ID);
  //   // send a delete in Server if it is an Image
  //   if (type === 'IMAGE') {
  //     deleteImage(assetsPath, username, title, itemObj.Src, token);
  //   }
  // };

  // in case of Presentation Mode I want to disable deleting and blue border
  return (
      <ItemComponent ID={ID} />
  );
}

Item.propTypes = {
  itemObj: PropTypes.object,
  assetsPath: PropTypes.string,
  onRemoveItem: PropTypes.func,
  username: PropTypes.string,
  title: PropTypes.string,
  token: PropTypes.string,
  presentationMode: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onRemoveItem: id => dispatch(removeItem(id)),
  };
}

export default connect(
  state => ({
    assetsPath: getAssetsPath(state),
    title: getTitle(state),
    username: state.keycloak.userToken.cern_upn,
    token: state.keycloak.instance.token,
    presentationMode: getPresentationMode(state),
  }),
  mapDispatchToProps
)(Item);
