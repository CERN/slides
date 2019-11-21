import React, { useState } from 'react';
import PropTypes from 'prop-types';
import createTheme from 'spectacle/lib/themes/default';

function makeTheme({ selectedTheme }) {
  const result = createTheme(
    {
      primary: 'red',
      secondary: 'blue',
    },
    {
      primary: 'Helvetica',
      secondary: {
        name: 'Droid Serif',
        googleFont: true,
        styles: ['400', '700i'],
      },
    },
  );
}

export default makeTheme;

makeTheme.propTypes = {
  selectedTheme: PropTypes.string.isRequired,
};
