import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextEditor from './TextEditor';
import { getItems } from '../../../redux-store/DeckReducer/selectors';
import {
  editData,
  setEditMode,
} from '../../../redux-store/DeckReducer/actions';
import './index.css';

const Text = React.forwardRef(
  ({ onEditData, ID, itemsArray, onSetEditMode }, ref) => {
    const item = itemsArray.find(itm => itm.ID === ID);
    const { Edit, Data } = item;
    console.log('IN text is=====', ref);
    const [txt, setTxt] = useState(Data);
    const onChangeFunc = input => {
      console.log('....bbbbbbbbbbbbbbla', txt, input, Edit);
      setTxt(input);
      // onEditData(ID, input);
    };
    // const handleClick = e => {
    //   if (item.Edit) onSetEditMode(ID, false);
    // };

    // useEffect(() => {
    //   document.addEventListener('mousedown', handleClick);

    //   return () => {
    //     document.removeEventListener('mousedown', handleClick);
    //   };
    // });
    const onDoubleClick = evt => {
      evt.preventDefault();
      if (ref.current.contains(evt.target)) {
        // inside click
        // then edit
        // console.log('double click');
        // onChangePosition(itemObj.ID, curPosition);
        // onChangeSize(itemObj.ID, curSize);

        // only for text the double click
        // will be set to true if it's not already
        if (!item.Edit) onSetEditMode(ID, true);
      }
    };
    return (
      <div onDoubleClick={onDoubleClick}>
        {Edit ? (
          <TextEditor onChange={onChangeFunc} initialData={Data} />
        ) : (
          Data
        )}
      </div>
    );
  },
);

Text.propTypes = {
  ID: PropTypes.string,
  onEditData: PropTypes.func,
  itemsArray: PropTypes.array,
  onSetEditMode: PropTypes.func,
  // ref: PropTypes.oneOfType([
  //   // Either a function
  //   PropTypes.func,
  //   // Or the instance of a DOM native element (see the note about SSR)
  //   PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  // ]),
};

function mapDispatchToProps(dispatch) {
  return {
    onEditData: (id, data) => dispatch(editData(id, data)),
    onSetEditMode: (id, edit) => dispatch(setEditMode(id, edit)),
  };
}

export default connect(
  state => ({
    itemsArray: getItems(state),
  }),
  mapDispatchToProps,
  null,
  { forwardRef: true },
)(Text);
