import React, { useState } from 'react';
import './Container.css';
import Settings from './Settings';
import Presentation from '../containers/Presentation/index';
import ThemeSelector from './ThemeSelector';
import history from '../utils/history';

function Container() {
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState('New Presentation');
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');

  const readyFunc = (selectedTitle, selectedTheme, selectedDescription) => {
    setReady(true);
    setTitle(selectedTitle);
    setTheme(selectedTheme);
    setDescription(selectedDescription);
    // set the url
    // username will be the one I get after his authentication
    history.push(`/username/${selectedTitle}/edit/`);
  };
  return (
    <div>
      {ready ? (
        <div className="Container">
          <div className="settings">
            <Settings />
          </div>
          <div className="presentation">
            <Presentation
              title={title}
              theme={theme}
              description={description}
            />
          </div>
        </div>
      ) : (
        <div className="ThemeSelector">
          <ThemeSelector readyFunc={readyFunc} />
        </div>
      )}
    </div>
  );
}

export default Container;
