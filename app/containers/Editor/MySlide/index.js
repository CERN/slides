import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StandardSlide from '../../../theming/StandardSlide';
import { getTheme } from '../../redux-store/PresentationReducer/selectors';
import { getItems } from '../../redux-store/DeckReducer/selectors';
import MoveResize from '../components/resize_move';
import MyItem from '../components/item';

function MySlide({ theme, itemsArray }) {
  const StandardSlideTemplate = StandardSlide(theme);
  const editMode = (type, edit) => type === 'TEXT' && edit;
  return (
    <StandardSlideTemplate>
      {itemsArray.map(itm => (
        <div>
          {editMode(itm.type, itm.Edit) ? (
            <MyItem key={itm.ID} itemObj={itm} />
          ) : (
            <MoveResize key={itm.ID} ID={itm.ID} />
          )}
        </div>
      ))}
    </StandardSlideTemplate>
  );
}

MySlide.propTypes = {
  theme: PropTypes.string.isRequired,
  itemsArray: PropTypes.array,
};

export default connect(
  state => ({
    theme: getTheme(state),
    itemsArray: getItems(state),
  }),
  null,
)(MySlide);
