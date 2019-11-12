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
import createTheme from 'spectacle/lib/themes/default';
import { selectDeckOfSlides, selectCurrentSlide } from './selectors';
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

export function Presentation({
  DeckOfSlides,
  onAddSlide,
  onRemoveSlide,
  onAddText,
  onRemoveText,
  // onChangeSlide,
  // currentSlide,
}) {
  const addingSlide = () => {
    onAddSlide();
    // onChangeSlide('+1');
    // history.push('/#/'.concat(currentSlide + 1));
  };

  const theme = createTheme({
    primary: '#1C4587',
    secondary: '#1C4587',
  });
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
              addSlide={addingSlide}
              removeSlide={onRemoveSlide}
              addText={onAddText}
              removeText={onRemoveText}
            />
          </Grid.Column>
          <Grid.Column width={15}>
            <Deck
              transition={['zoom', 'slide']}
              transitionDuration={500}
              // progress="number"
              theme={theme}
            >
              {DeckOfSlides.map((item, id) => (
                <MySlide key={item} id={id} />
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
  // onChangeSlide: PropTypes.func,
  // currentSlide: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAddSlide: id => dispatch(addSlide(id)),
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
  }),
  mapDispatchToProps,
)(Presentation);
