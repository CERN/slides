import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Deck } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import { config } from '../../../../server/constants';

import {
  selectTheme,
  selectTitle,
  selectDescription,
  selectDeckOfSlides,
  selectAssetsPath,
} from '../redux-store/selectors';
import { setAssetsPath } from '../redux-store/actions';

import MySlide from '../MySlide';
import './index.css';
import getTheme from '../../../theming/theme';

function Canvas({
  title,
  theme,
  description,
  DeckOfSlides,
  onSetAssetsPath,
  assetsPath,
}) {
  const deck = useRef();
  const themeObj = getTheme(theme);
  const myTheme = createTheme(themeObj.themeConfig, themeObj.fontConfig);
  // set the assetsFolder, where images will be, in the redux store
  if (assetsPath === '') onSetAssetsPath(config.assetsPath);
  // // now make the check if it is cern 3,4,5 then add intro and end slide
  // // use this hook to be able to move to next previous slide in adding removing slides
  useEffect(() => {
    window.slideCount = deck.current.props.children.length;
  });

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
            <MySlide key={item} />
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
    theme: selectTheme(state),
    title: selectTitle(state),
    description: selectDescription(state),
    DeckOfSlides: selectDeckOfSlides(state),
    assetsPath: selectAssetsPath(state),
  }),
  mapDispatchToProps,
)(Canvas);
