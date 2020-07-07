import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import StandardSlide from '../../../theming/StandardSlide';
import {getTheme} from '../../redux-store/PresentationReducer/selectors';
import {getItems} from '../../redux-store/DeckReducer/selectors';
import MoveResize from '../components/resize_move';

function MySlide({theme, itemsArray}) {
  const StandardSlideTemplate = StandardSlide(theme);

  return (
    <StandardSlideTemplate>
      {itemsArray.map(itm => (
        <MoveResize key={itm.ID} ID={itm.ID} />
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
  null
)(MySlide);
