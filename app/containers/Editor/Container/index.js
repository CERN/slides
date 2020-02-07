import React, { useState } from 'react';
import './index.css';
import { Grid, GridColumn } from 'semantic-ui-react';
import Settings from '../Settings';
import Canvas from '../Canvas';
import SideBar from '../SideBar';
import ThemeSelector from '../ThemeSelector';
import SavePresentation from '../../SavePresentation';

export default function Container() {
  const [ready, setReady] = useState(false);
  const readyFunc = () => {
    setReady(true);
  };

  return (
    <div>
      {ready ? (
        <div className="container">
          <Grid>
            <GridColumn className="settings">
              <Settings />
            </GridColumn>
            <GridColumn className="sidebar">
              <SideBar />
            </GridColumn>
            <GridColumn className="canvas">
              <Canvas />
            </GridColumn>
          </Grid>
          <SavePresentation />
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
