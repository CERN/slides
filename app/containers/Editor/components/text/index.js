import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextEditor from './TextEditor';
import { getItems } from '../../../redux-store/DeckReducer/selectors';
import { editData } from '../../../redux-store/DeckReducer/actions';
import './index.css';
function Text({ onEditData, ID, itemsArray }) {
  // const { ID, Data, Edit } = obj;
  const onChangeFunc = input => {
    // i send it directly to redux
    onEditData(ID, input);
  };

  const item = itemsArray.find(itm => itm.ID === ID);
  const { Edit, Data } = item;
  console.log('IN text is=====', item);
  return (
    <div>
      {Edit ? <TextEditor onChange={onChangeFunc} initialData={Data} /> : Data}
    </div>
  );
}

Text.propTypes = {
  ID: PropTypes.string,
  onEditData: PropTypes.func,
  itemsArray: PropTypes.array,
};

function mapDispatchToProps(dispatch) {
  return {
    onEditData: (id, data) => dispatch(editData(id, data)),
  };
}

export default connect(
  state => ({
    itemsArray: getItems(state),
  }),
  mapDispatchToProps,
)(Text);
