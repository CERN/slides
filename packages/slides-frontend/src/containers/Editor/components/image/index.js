import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAssetsPath,
  getTitle,
} from '../../../redux-store/PresentationReducer/selectors';
import { Loader } from 'semantic-ui-react';
import { getItems } from '../../../redux-store/DeckReducer/selectors';
import './index.css';

const useCheckImage = (imageSrc, success, fail) => {
  const img = new Image();
  img.onload = success; 
  img.onerror = fail;
  img.src = imageSrc;
}

const MyImage = ({ ID, itemsArray, assetsPath, username, title }) => {
  const [loading, setLoading] = useState(true);
  const item = itemsArray.find(itm => itm.ID === ID);
  const imageSrc = `${assetsPath}/static/${username}/${title}/assets/${item.Src}`;
  
  useCheckImage(imageSrc, () => { setLoading(false) }, () => { setLoading(true) });

  return (
    <div>
      {!loading ?
        (
          <div className="img-style">
            <img src={imageSrc} alt="" />
          </div>
        ) :
        <Loader active/>
      }
    </div>
  );
};

MyImage.propTypes = {
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
}))(MyImage);
