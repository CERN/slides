import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getItems} from '../../redux-store/DeckReducer/selectors';
import MoveResize from '../components/resize_move';

function MySlide({itemsArray}) {
  return (
    <section>
      {itemsArray.map(itm => <MoveResize key={itm.ID} ID={itm.ID} />)}
    </section>
  );
}

MySlide.propTypes = {
  itemsArray: PropTypes.array,
};

export default connect(
  state => ({
    itemsArray: getItems(state),
  }),
  null
)(MySlide);
