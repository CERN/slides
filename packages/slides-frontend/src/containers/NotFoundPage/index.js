import React from 'react';
import {Link} from 'react-router-dom';
import PageNotFound from '../../images/PageNotFound.jpg';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <img src={PageNotFound} alt="404-page-not-found" />
        <p style={{textAlign: 'center'}}>
          <Link to="/">Go to Home </Link>
        </p>
      </div>
    );
  }
}

export default NotFoundPage;
