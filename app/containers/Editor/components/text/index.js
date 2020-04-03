import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextEditor from './TextEditor';
import { RenderHtml } from './RenderHtml';
import { getItems } from '../../../redux-store/DeckReducer/selectors';
import {
  editData,
  setEditMode,
} from '../../../redux-store/DeckReducer/actions';
import './index.css';

const Text = ({ onEditData, ID, itemsArray, onSetEditMode }) => {
  const ref = useRef(null);
  const item = itemsArray.find(itm => itm.ID === ID);
  const { Edit, Data } = item;
  const [txt, setTxt] = useState(Data);
  // i need the useeffect here cause i need the clicks of all of the document
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const onChangeFunc = input => {
    setTxt(input);
  };

  const handleClick = e => {
    if (ref.current.contains(e.target)) {
      // inside click
      // e.preventDefault();
      console.log('text click inside');
      return;
    }
    // e.preventDefault();
    // outside click
    console.log('text click outside');
    onEditData(ID, txt);
    onSetEditMode(ID, false);
  };
// find another way to handle double click
  const doubleClick = e => {
    // e.preventDefault();
    console.log('DOUBLE KLIKI ', Edit);
    if (Edit === false) {
      onSetEditMode(ID, true);
    }
  };

  return (
    <div ref={ref} className="fit-text">
      {Edit ? (
        <TextEditor
          className="editor"
          onChange={onChangeFunc}
          initialData={txt}
        />
      ) : (
        <div onDoubleClick={doubleClick}>
          <RenderHtml text={txt} />
        </div>
      )}
    </div>
  );
};

Text.propTypes = {
  ID: PropTypes.string,
  onEditData: PropTypes.func,
  itemsArray: PropTypes.array,
  onSetEditMode: PropTypes.func,
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
)(Text);
