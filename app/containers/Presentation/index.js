/*
 * Presentation
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// import { useInjectReducer } from 'utils/injectReducer';

import { Grid } from 'semantic-ui-react';
import { Deck, Slide, Image, Text, GoToAction } from 'spectacle';
import { selectCurrentSlide, selectDeckOfSlides } from './selectors';

import {
  addSlide,
  removeSlide,
  addText,
  removeText,
  changeSlide,
} from './actions';
import SideBar from '../../components/SideBar';
import MySlide from './MySlide';
import reducer from './reducer';
import './styles.css';

export function Presentation({
  DeckOfSlides,
  currentSlide,
  onAddSlide,
  onRemoveSlide,
  onAddText,
  onRemoveText,
}) {
  // useInjectReducer({ key, reducer });

  return (
    <div>
      <Helmet>
        <title>iPresent</title>
        <meta name="Presentation" content="iPresent" />
      </Helmet>
      <div className="presentation">
        <Grid className="grid">
          <Grid.Column width={1}>
            <SideBar
              addSlide={onAddSlide}
              removeSlide={onRemoveSlide}
              addText={onAddText}
              removeText={onRemoveText}
            />
          </Grid.Column>
          <Grid.Column width={15}>
            <Deck
              transition={['zoom', 'slide']}
              transitionDuration={500}
              progress="number"
            >
              {DeckOfSlides.map((item, id) => (
                <MySlide content={item} id={id} />
              ))}
            </Deck>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}

Presentation.propTypes = {
  DeckOfSlides: PropTypes.array,
  currentSlide: PropTypes.number,
  onAddSlide: PropTypes.func,
  onRemoveSlide: PropTypes.func,
  onAddText: PropTypes.func,
  onRemoveText: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAddSlide: id => dispatch(addSlide(id)),
    onRemoveSlide: () => dispatch(removeSlide()),
    onAddText: () => dispatch(addText()),
    onRemoveText: () => dispatch(removeText()),
  };
}

export default connect(
  state => ({
    DeckOfSlides: selectDeckOfSlides(state),
    currentSlide: selectCurrentSlide(state),
  }),
  mapDispatchToProps,
)(Presentation);
