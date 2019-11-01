import React from 'react';
import './Container.css';
import { Grid } from 'semantic-ui-react';
import Settings from './Settings';
import Presentation from '../containers/Presentation/index';

function Container() {
  return (
    <div className="Container">
      <Grid className="grid">
        <Grid.Column width={1}>
          <Settings />
        </Grid.Column>
        <Grid.Column width={15}>
          <Presentation />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Container;
