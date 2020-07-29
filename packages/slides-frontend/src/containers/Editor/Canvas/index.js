import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {FlexBox, Box, FullScreen, Progress, Deck, Slide} from 'spectacle';
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
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
// import 'reveal.js/dist/theme/beige.css';
import '../../../theming/cern.css';
// cern themes work perfectly like in codimd

function Canvas({
  title,
  theme,
  DeckOfSlides,
  assetsPath,
  backgroundColor,
  username,
  token,
  currentSlide,
}) {
  useEffect(() => {
    Reveal.initialize({
      showSlideNumber: 'all',
      hash: true,
      respondToHashChanges: true,
      history: true,
      keyboard: true,
      embedded: true,
      // Transition style
      transition: 'slide', // none/fade/slide/convex/concave/zoom
      // Transition speed
      transitionSpeed: 'default', // default/fast/slow
      // Transition style for full page slide backgrounds
      backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
    }).then(() => {
      console.log('Reveal.js is initialized');
    });
  }, []);

  // useEffect(() => {
  //   //   //   window.slideCount = deck.current.props.children.length;
  //   // get the hash from reveal API to know how many sections are in the deck
  //   console.log("======", Reveal.getTotalSlides())

  //   });

  const slides = () =>
    DeckOfSlides.map(item => (
      <section>
        {/* <MySlide key={item.ID}/>
        {item} */}
        hello!
      </section>
    ));

  return (
    <div>
      <Helmet>
        <title>Edit: {title}</title>
      </Helmet>
      <div className="deck">
        <div className="reveal">
          <div className="slides">
            {/* <section>
              <h2>First Horizontal Slide 🐟</h2>
            </section>
            <section>
              <section>Second slide</section>
              <section>The only vertical slide!</section>
            </section>
            <section>Third slide!!!!!!!!!!!!!!!</section>
            <section>Fourth slide!!!!!!!!!!!!!!!</section>
            <section>Fifth slide!!!!!!!!!!!!!!!</section> */}
            {slides()}
          </div>
        </div>
      </div>
    </div>
  );
}

//   // // use this hook to be able to move to next previous slide in adding removing slides
//   // useEffect(() => {
//   //   window.slideCount = deck.current.props.children.length;
//   // });
//  // somehow try to sync in the new version what is seen with the URL
//  // the location change is not triggered always but only when adding a new slide
//  // thus leading to not changing the currentSlide when user uses the arrow keys
//   const slidesArray = () =>
//     DeckOfSlides.map(item => (
//       <Slide>
//         <MySlide key={item.ID}/>
//       </Slide>
//     ))

//   // catch reload event
//   useEffect(() => {
//     window.onbeforeunload = e => {
//       e.preventDefault();
//       deletePresentationFolder(assetsPath, username, title, token).then(res => {
//         // and navigate to home page
//         if (res.status === 200) {
//           console.log('Successful deletion in Server');
//           history.push(`/`);
//         }
//       });
//       return 'Are you sure you want to reload?';
//     };
//   });

//   const template = () => (
//       <FlexBox
//       justifyContent="space-between"
//       position="absolute"
//       bottom={0}
//       width={1}
//     >
//       <Box margin={0, 2}>
//       {currentSlide + 1} / {DeckOfSlides.length}
//     </Box>
//     </FlexBox>
//   );

//   return (
//     <div>
//       <Helmet>
//         <title>Edit: {title}</title>
//       </Helmet>
//       <div className="deck">
//         <Deck
//           ref={deck}
//           // transition={['zoom', 'slide']}
//           // transitionDuration={500}
//           theme={myTheme}
//           animationsWhenGoingBack
//           keyboardControls="arrows"
//           template={template}
//         >
//         {slidesArray()}
//         </Deck>
//       </div>
//     </div>
//   );
// }

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
