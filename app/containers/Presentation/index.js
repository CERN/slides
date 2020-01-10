/*
 * Presentation
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';

import { Grid, GridColumn } from 'semantic-ui-react';
import { Deck } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import {
  selectDeckOfSlides,
  selectCurrentSlide,
  selectTheme,
} from './selectors';
import {
  addSlide,
  removeSlide,
  addText,
  removeText,
  changeSlide,
} from './actions';
import SideBar from '../../components/SideBar';
import MySlide from './MySlide';
import './styles.css';
import getTheme from '../../theming/theme';

export function Presentation({
  DeckOfSlides,
  onAddSlide,
  onRemoveSlide,
  onAddText,
  onRemoveText,
  // onChangeSlide,
  currentSlide,
  title,
  theme,
  description,
}) {
  const deck = useRef();
  // check if it works the same with history
  const addingSlide = () => {
    onAddSlide();
    window.location = `#/${currentSlide + 1}`; // because slides here are starting from 1
  };

  const removingSlide = () => {
    onRemoveSlide();
    if (currentSlide === 0) {
      // window.location = `#/${1}`;
      window.location = `#/${0}`;
    } else window.location = `#/${currentSlide - 1}`;
  };
  const themeObj = getTheme(theme);
  const myTheme = createTheme(themeObj.themeConfig, themeObj.fontConfig);
  // now make the check if it is cern 3,4,5 then add intro and end slide
  // use this hook to be able to move to next previous slide in adding removing slides
  useEffect(() => {
    window.slideCount = deck.current.props.children.length;
  });

  return (
    <div className="grid">
      <Helmet>
        <title>Edi: {title}</title>
        <meta name="Presentation" content={description} />
      </Helmet>
      <Grid>
        <GridColumn className="sidebar">
          <SideBar
            addSlide={addingSlide}
            removeSlide={removingSlide}
            addText={onAddText}
            removeText={onRemoveText}
          />
        </GridColumn>
        <GridColumn className="deck">
          <Deck
            ref={deck}
            transition={['zoom', 'slide']}
            transitionDuration={500}
            theme={myTheme}
            progress="number"
            showFullscreenControl={false}
          // controls={false} // show or hide the move buttons
          >
            {DeckOfSlides.map((item, id) => (
              <MySlide key={item} id={id} />
            ))}
          </Deck>
        </GridColumn>
      </Grid>
    </div>
  );
}

Presentation.propTypes = {
  DeckOfSlides: PropTypes.array,
  onAddSlide: PropTypes.func,
  onRemoveSlide: PropTypes.func,
  onAddText: PropTypes.func,
  onRemoveText: PropTypes.func,
  // onChangeSlide: PropTypes.func,
  currentSlide: PropTypes.number,
  title: PropTypes.string,
  theme: PropTypes.string,
  description: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAddSlide: () => dispatch(addSlide()),
    onRemoveSlide: () => dispatch(removeSlide()),
    onAddText: () => dispatch(addText()),
    onRemoveText: () => dispatch(removeText()),
    onChangeSlide: direction => dispatch(changeSlide(direction)),
  };
}

export default connect(
  state => ({
    DeckOfSlides: selectDeckOfSlides(state),
    currentSlide: selectCurrentSlide(state),
    theme: selectTheme(state),
  }),
  mapDispatchToProps,
)(Presentation);
