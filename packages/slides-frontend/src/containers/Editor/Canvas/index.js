import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {FlexBox, Box, FullScreen, Progress, Deck, Slide} from 'spectacle';
// import createTheme from 'spectacle/lib/themes/default/index';
import history from '../../../utils/history';
import {deletePresentationFolder} from '../../../utils/requests';

import {
  getTheme,
  getTitle,
  getAssetsPath,
  getBackgroundColor,
} from '../../redux-store/PresentationReducer/selectors';

import {getDeck, getCurrentSlide} from '../../redux-store/DeckReducer/selectors';
import MoveResize from '../components/resize_move';

import MySlide from '../MySlide';
import './index.css';
// import getterTheme from '../../../theming/theme';

function Canvas({title, theme, DeckOfSlides, assetsPath, backgroundColor, username, token, currentSlide}) {
  const deck = useRef();
  // const myTheme = getterTheme(theme);
  // change fontconfig from here
  // const newTheme = {
  //   ...themeObj,
  //   themeConfig: {
  //     ...themeObj.themeConfig,
  //     secondary: backgroundColor,
  //   },
  // };

  // const myTheme = createTheme(newTheme.themeConfig, newTheme.fontConfig);
  const myTheme = {
    colors: {
      primary: '#f00',
      secondary: '#00f'
    },
    fontSizes: {
      header: '64px',
      paragraph: '28px'
    }
  }
  // // now make the check if it is cern 3,4,5 then add intro and end slide
  // // use this hook to be able to move to next previous slide in adding removing slides
  // useEffect(() => {
  //   window.slideCount = deck.current.props.children.length;
  // });
 // somehow try to sync in the new version what is seen with the URL
 // the location change is not triggered always but only when adding a new slide
 // thus leading to not changing the currentSlide when user uses the arrow keys
  const slidesArray = () =>
    DeckOfSlides.map(item => (
      <Slide>
        <MySlide key={item.ID}/>
      </Slide>
    ))

  // catch reload event
  useEffect(() => {
    window.onbeforeunload = e => {
      e.preventDefault();
      deletePresentationFolder(assetsPath, username, title, token).then(res => {
        // and navigate to home page
        if (res.status === 200) {
          console.log('Successful deletion in Server');
          history.push(`/`);
        }
      });
      return 'Are you sure you want to reload?';
    };
  });

  const template = () => (
      <FlexBox
      justifyContent="space-between"
      position="absolute"
      bottom={0}
      width={1}
    >
      <Box margin={0, 2}>
      {currentSlide + 1} / {DeckOfSlides.length}
    </Box>
    </FlexBox>
  );

  return (
    <div>
      <Helmet>
        <title>Edit: {title}</title>
      </Helmet>
      <div className="deck">
        <Deck
          ref={deck}
          // transition={['zoom', 'slide']}
          // transitionDuration={500}
          theme={myTheme}
          // progress="number"
          animationsWhenGoingBack
          keyboardControls="arrows"
          // template={template}
          template={template}
          // showFullscreenControl={false}
        >
        {slidesArray()}
        </Deck>
      </div>
    </div>
  );
}

Canvas.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.string,
  DeckOfSlides: PropTypes.array,
  assetsPath: PropTypes.string,
  backgroundColor: PropTypes.string,
  username: PropTypes.string,
  token: PropTypes.string,
  currentSlide: PropTypes.number,
};

export default connect(
  state => ({
    theme: getTheme(state),
    title: getTitle(state),
    DeckOfSlides: getDeck(state),
    assetsPath: getAssetsPath(state),
    backgroundColor: getBackgroundColor(state),
    currentSlide: getCurrentSlide(state),
    username: state.keycloak.userToken.cern_upn,
    token: state.keycloak.instance.token,
  }),
  null
)(Canvas);
