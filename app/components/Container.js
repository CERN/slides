import React, { useState } from 'react';
import './Container.css';
import Settings from './Settings';
import Presentation from '../containers/Presentation/index';
import ThemeSelector from './ThemeSelector';

function Container() {
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState('New Presentation');
  const [url, setURL] = useState(title);
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');

  const readyFunc = (
    selectedTitle,
    selectedUrl,
    selectedTheme,
    selectedDescription,
  ) => {
    setReady(true);
    setTitle(selectedTitle);
    setURL(selectedUrl);
    setTheme(selectedTheme);
    setDescription(selectedDescription);
  };
  // do actual job with the data, pass them to Presentation to do things
  return (
    <div>
      {ready ? (
        <div className="Container">
          <div className="settings">
            <Settings />
          </div>
          <div className="presentation">
            <Presentation />
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
