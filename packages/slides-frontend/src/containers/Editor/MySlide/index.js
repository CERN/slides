import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import StandardSlide from '../../../theming/StandardSlide';
import {getTheme} from '../../redux-store/PresentationReducer/selectors';
import {getItems} from '../../redux-store/DeckReducer/selectors';
import MoveResize from '../components/resize_move';
import {Slide, Text} from 'spectacle';

function MySlide({theme, itemsArray}) {
  // const StandardSlideTemplate = StandardSlide(theme);
  console.log('itemsArray', itemsArray);
  return (
    // <Slide>
    // <Text>blabla</Text>
    // {/* </Slide> */}
    // <Slide>
    itemsArray.map(itm => <MoveResize key={itm.ID} ID={itm.ID} />)
    // </Slide>
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
