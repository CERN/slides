import React from 'react';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  getIsReady,
  getTitle,
  getTheme,
  getBackgroundColor,
} from '../../redux-store/PresentationReducer/selectors';
import {getDeck} from '../../redux-store/DeckReducer/selectors';
import {Helmet} from 'react-helmet';
import MySlide from '../MySlide';
import './index.css';
// import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';

function Presentation({isReady, DeckOfSlides, title, theme, backgroundColor}) {
  const slides = () => {
    return (
      <>
        {DeckOfSlides.map(item => (
          <MySlide key={item.ID} />
        ))}
      </>
    );
  };

  return (
    <div>
      {isReady ? (
        <div>
          <Helmet>
            <title>Present: {title}</title>
          </Helmet>
          <div className="presentation-deck">
            <div className="reveal">
              <div className="slides">{slides()}</div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

Presentation.propTypes = {
  isReady: PropTypes.bool,
  DeckOfSlides: PropTypes.array,
  title: PropTypes.string,
  theme: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default connect(
  state => ({
    isReady: getIsReady(state),
    DeckOfSlides: getDeck(state),
    title: getTitle(state),
    theme: getTheme(state),
    backgroundColor: getBackgroundColor(state),
  }),
  null
)(Presentation);
