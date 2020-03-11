import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image as SemanticImage } from 'semantic-ui-react';
import { getAssetsPath } from '../../../redux-store/PresentationReducer/selectors';

function Image({ obj, assetsPath }) {
  // this base will be the server's address base for every image , localhost:3000/public/static/images
  const myPath = `${assetsPath}/static/${obj.Src}`;
  return <SemanticImage src={myPath} alt="" size="medium" />;
}

Image.propTypes = {
  obj: PropTypes.object,
  assetsPath: PropTypes.string,
};

export default connect(
  state => ({
    assetsPath: getAssetsPath(state),
  }),
  null,
)(Image);
