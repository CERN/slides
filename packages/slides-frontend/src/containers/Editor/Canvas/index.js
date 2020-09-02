import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import history from '../../../utils/history';
import {deletePresentationFolder} from '../../../utils/requests';
import {
  getTheme,
  getTitle,
  getAssetsPath,
  getBackgroundColor,
} from '../../redux-store/PresentationReducer/selectors';
import {getDeck} from '../../redux-store/DeckReducer/selectors';
import MySlide from '../MySlide';
import Reveal from 'reveal.js';
import './index.css';
import 'reveal.js/dist/reveal.css';
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
      // numbering starts from 1 in the hash to match the slide number in buttom right
      hashOneBasedIndex: true,
      respondToHashChanges: true,
      history: true,
      keyboard: true,
      embedded: true,
      disableLayout: true,
      slideNumber: true,
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

  const slides = () => {
    return (
      <>
        {DeckOfSlides.map(item => (
          <MySlide key={item.ID} />
        ))}
      </>
    );
  };
  // "reveal cern3"
  const revealTheme = `reveal ${theme}`;
  return (
    <div>
      <Helmet>
        <title>Edit: {title}</title>
      </Helmet>
      <div className="deck">
        <div className={revealTheme}>
          <div className="slides">{slides()}</div>
        </div>
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
};

export default connect(
  state => ({
    theme: getTheme(state),
    title: getTitle(state),
    DeckOfSlides: getDeck(state),
    assetsPath: getAssetsPath(state),
    backgroundColor: getBackgroundColor(state),
    username: state.keycloak.userToken.cern_upn,
    token: state.keycloak.instance.token,
  }),
  null
)(Canvas);
