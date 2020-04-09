import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextEditor from './TextEditor';
import RenderHtml from './RenderHtml';
import { getItems } from '../../../redux-store/DeckReducer/selectors';
import { setEditMode } from '../../../redux-store/DeckReducer/actions';
import './index.css';

const Text = ({ ID, itemsArray, onSetEditMode }) => {
  const item = itemsArray.find(itm => itm.ID === ID);
  const { Edit, Data } = item;
  const doubleClick = e => {
    if (Edit === false) {
      onSetEditMode(ID, true);
    }
  };

  return (
    <div className="fit-text">
      {Edit ? (
        <TextEditor className="editor" initialData={Data} ID={ID} />
      ) : (
        <div onDoubleClick={doubleClick}>
          <RenderHtml text={Data} />
        </div>
      )}
    </div>
  );
};

Text.propTypes = {
  ID: PropTypes.string,
  itemsArray: PropTypes.array,
  onSetEditMode: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onSetEditMode: (id, edit) => dispatch(setEditMode(id, edit)),
  };
}

export default connect(
  state => ({
    itemsArray: getItems(state),
  }),
  mapDispatchToProps,
)(Text);
