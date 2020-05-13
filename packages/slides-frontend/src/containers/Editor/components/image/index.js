import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAssetsPath,
  getTitle,
} from '../../../redux-store/PresentationReducer/selectors';
import { Loader } from 'semantic-ui-react';
import { getItems } from '../../../redux-store/DeckReducer/selectors';
import './index.css';

const Image = ({ ID, itemsArray, assetsPath, username, title }) => {
  const item = itemsArray.find(itm => itm.ID === ID);
  // this base will be the server's address base for every image , localhost:3000/static/username/title/hash_imagename
  // src only has hash_name, i have to add username and title infront
  return (
    <div>
      {item ?
        (
          <div className="img-style">
            <img src={`${assetsPath}/static/${username}/${title}/assets/${item.Src}`} alt="" />
          </div>
        ) :
        <Loader active/>
      }
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
