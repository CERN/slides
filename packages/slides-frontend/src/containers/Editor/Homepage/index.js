import React from 'react';

import LandingPage from '../LandingPage';
import LoadPresentation from '../../LoadPresentation';
import './index.css';

function Homepage() {
  return (
    <div className="themeSelector">
        <div className="inside">
            <LandingPage />
            <LoadPresentation />
        </div>
    </div>
  );
}

export default Homepage;