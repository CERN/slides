import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyItem from '../components/item';
import StandardSlide from '../../../theming/StandardSlide';
import { getTheme } from '../../redux-store/PresentationReducer/selectors';
import { getItems } from '../../redux-store/DeckReducer/selectors';
import './index.css';

function MySlide({ theme, itemsArray }) {
  const StandardSlideTemplate = StandardSlide(theme);
  const lines = () => (
    <svg height="210" width="500">
      <line
        x1="0"
        y1="50%"
        x2="400"
        y2="50%"
        style={{ stroke: 'rgb(255,255,255)', 'stroke-width': 1 }}
      />
      Sorry, your browser does not support inline SVG.
    </svg>
  );

  return (
    <StandardSlideTemplate>
      <div id="this-slide" className="slide-style">
        {lines}
        {itemsArray.map(itm => (
          <MyItem key={itm.ID} itemObj={itm} />
        ))}
      </div>
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
