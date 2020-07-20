import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import StandardSlide from '../../../theming/StandardSlide';
import {getTheme} from '../../redux-store/PresentationReducer/selectors';
import {getDeck} from '../../redux-store/DeckReducer/selectors';
import MoveResize from '../components/resize_move';
import { forceChangeSlide } from '../../redux-store/DeckReducer/actions';
import { Slide, Text } from 'spectacle';

function MyExportedSlides({theme, DeckOfSlides, onForceChangeSlide}) {
  const StandardSlideTemplate = StandardSlide(theme);
    return (
      <>
        {DeckOfSlides.map(slide => (
          <>
            {/* <StandardSlideTemplate key={slide.ID}>
                {slide.itemsArray.map(itm =>
                    <MoveResize key={itm.ID} ID={itm.ID} />   
                )}
            </StandardSlideTemplate> */}
            <StandardSlideTemplate key={slide.ID}>
              <Text>{slide.ID}</Text> 
              {/* the issue is with the move resize that needs to get the current items and uses the currentSlide */}
              {/* I have to think of a clever workaround */}
              {/* the current approach works and gives all slides correctly with their correct slide ID */}
            </StandardSlideTemplate>
          </>
        ))}
      </>
    );
}

MyExportedSlides.propTypes = {
  theme: PropTypes.string.isRequired,
  DeckOfSlides: PropTypes.array,
  onForceChangeSlide: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onForceChangeSlide: () => dispatch(forceChangeSlide("UP")),
  };
}

export default connect(
  state => ({
    theme: getTheme(state),
    DeckOfSlides: getDeck(state),
  }),
  mapDispatchToProps,
)(MyExportedSlides);
