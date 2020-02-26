import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import MyText from './components/text';
// import MyImage from './components/image';
import MyItem from './components/Item';
import StandardSlide from '../../theming/StandardSlide';
import { getTheme } from '../redux-store/PresentationReducer/selectors';
import { getItems } from '../redux-store/DeckReducer/selectors';
function MySlide({ theme, itemsArray }) {
  const StandardSlideTemplate = StandardSlide(theme);
  return (
    <StandardSlideTemplate>
      {itemsArray.map(itm => (
        <MyItem key={itm.ID} itemObj={itm} />
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
