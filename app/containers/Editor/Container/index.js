import React, { useState } from 'react';
import './index.css';
import Settings from '../Settings';
import Canvas from '../Canvas';
import SideBar from '../SideBar';
import ThemeSelector from '../ThemeSelector';

export default function Container() {
  const [ready, setReady] = useState(false);
  const readyFunc = () => {
    setReady(true);
  };

  return (
    <div>
      {ready ? (
        <div className="container">
          <div className="settings">
            <Settings />
          </div>
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="canvas">
            <Canvas />
          </div>
        </div>
      ) : (
        <div className="themeSelector">
          <div className="inside">
            <ThemeSelector readyFunc={readyFunc} />
          </div>
        </div>
      )}
    </div>
  );
}
