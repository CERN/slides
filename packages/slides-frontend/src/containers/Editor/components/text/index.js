import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextEditor from './TextEditor';
import RenderHtml from './RenderHtml';
import { getItems } from '../../../redux-store/DeckReducer/selectors';
import { getPresentationMode } from '../../../redux-store/PresentationReducer/selectors';
import './index.css';

const Text = ({ ID, itemsArray, presentationMode }) => {
  const item = itemsArray.find(itm => itm.ID === ID);
  const { Edit, Data } = item;
  console.log("My edit isssssssss", Edit)
  // in Presentation Mode the text shouldn't be editable any more
  return (
    <div>
      {presentationMode ? (
        <RenderHtml ID={ID} text={Data} />
      ) : (
        <div>
          {Edit ? (
            <TextEditor initialData={Data} ID={ID} />
          ) : (
            <RenderHtml ID={ID} text={Data} />
          )}
        </div>
      )}
    </div>
  );
};

Text.propTypes = {
  ID: PropTypes.string,
  itemsArray: PropTypes.array,
  presentationMode: PropTypes.bool,
};

export default connect(
  state => ({
    itemsArray: getItems(state),
    presentationMode: getPresentationMode(state),
  }),
  null,
)(Text);
