import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Deck } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import { config } from '../../../../server/constants';

import {
  getTheme,
  getTitle,
  getDescription,
  getAssetsPath,
} from '../../redux-store/PresentationReducer/selectors';

import { getDeck } from '../../redux-store/DeckReducer/selectors';
import { setAssetsPath } from '../../redux-store/PresentationReducer/actions';

import MySlide from '../MySlide';
import './index.css';
import getterTheme from '../../../theming/theme';

function Canvas({
  title,
  theme,
  description,
  DeckOfSlides,
  onSetAssetsPath,
  assetsPath,
}) {
  const deck = useRef();
  const themeObj = getterTheme(theme);
  const myTheme = createTheme(themeObj.themeConfig, themeObj.fontConfig);
  // set the assetsFolder, where images will be, in the redux store
  if (assetsPath === '') onSetAssetsPath(config.assetsPath);
  // // now make the check if it is cern 3,4,5 then add intro and end slide
  // // use this hook to be able to move to next previous slide in adding removing slides
  useEffect(() => {
    window.slideCount = deck.current.props.children.length;
  });
  console.log('....DeckOfSlides', DeckOfSlides);
  return (
    <div>
      <Helmet>
        <title>Edit: {title}</title>
        <meta name="Canvas" content={description} />
      </Helmet>
      <div>
        <Deck
          ref={deck}
          transition={['zoom', 'slide']}
          transitionDuration={500}
          theme={myTheme}
          progress="number"
          showFullscreenControl={false}
          // controls={false} // show or hide the move buttons
        >
          {DeckOfSlides.map(item => (
            <MySlide key={item.ID} />
          ))}
        </Deck>
      </div>
    </div>
  );
}

Canvas.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.string,
  description: PropTypes.string,
  DeckOfSlides: PropTypes.array,
  onSetAssetsPath: PropTypes.func,
  assetsPath: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    onSetAssetsPath: path => dispatch(setAssetsPath(path)),
  };
}

export default connect(
  state => ({
    theme: getTheme(state),
    title: getTitle(state),
    description: getDescription(state),
    DeckOfSlides: getDeck(state),
    assetsPath: getAssetsPath(state),
  }),
  mapDispatchToProps,
)(Canvas);
