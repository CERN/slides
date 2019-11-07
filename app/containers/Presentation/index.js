/*
 * Presentation
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';
import { Deck } from 'spectacle';
import { selectDeckOfSlides } from './selectors';

import { addSlide, removeSlide, addText, removeText } from './actions';
import SideBar from '../../components/SideBar';
import MySlide from './MySlide';
import './styles.css';

export function Presentation({
  DeckOfSlides,
  onAddSlide,
  onRemoveSlide,
  onAddText,
  onRemoveText,
}) {
  return (
    <div>
      <Helmet>
        <title>Slides</title>
        <meta name="Presentation" content="Slides" />
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
                <MySlide id={id} />
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
  }),
  mapDispatchToProps,
)(Presentation);
