import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAssetsPath,
  getTitle,
} from '../../../redux-store/PresentationReducer/selectors';

import { getItems } from '../../../redux-store/DeckReducer/selectors';
import './index.css';

// FIX positioning of image
const Image = ({ ID, itemsArray, assetsPath, username, title }) => {
  const [ loader, setLoader ] = useState(true);
  const item = itemsArray.find(itm => itm.ID === ID);
  // this base will be the server's address base for every image , localhost:3000/static/username/title/hash_imagename
  // src only has hash_name, i have to add username and title infront
  const myPath = `${assetsPath}/static/${username}/${title}/assets/${item.Src}`;
  useEffect(() => {
    setTimeout(() => setLoader(false), 1000) // ?? add loader
  }, []);
  return (
    !loader &&
    <div className="img-style">
      <img src={myPath} alt="" />
    </div>
  );
};

Image.propTypes = {
  ID: PropTypes.string,
  itemsArray: PropTypes.array,
  assetsPath: PropTypes.string,
  username: PropTypes.string,
  title: PropTypes.string,
};

export default connect(state => ({
  assetsPath: getAssetsPath(state),
  username: state.keycloak.userToken.cern_upn,
  title: getTitle(state),
  itemsArray: getItems(state),
}))(Image);
