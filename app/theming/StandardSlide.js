import React, { Component } from 'react';
import { Slide } from 'spectacle';
import PropTypes from 'prop-types';
import getTheme from './theme';

const theme = getTheme('');

export default () =>
  class extends Component {
    static propTypes = {
      children: PropTypes.object.isRequired,
    };

    render() {
      return (
        <Slide
          {...theme.slideDefaults}
          {...theme.logoSettings}
          {...this.props}
          textColor="tertiary"
        >
          {React.Children.map(this.props.children, child => {
            switch (child.type.displayName) {
              case 'Heading':
                return React.cloneElement(child, {
                  textColor: 'tertiary',
                });
              case 'Text':
                return React.cloneElement(child, {
                  textColor: 'tertiary',
                });
              default:
                return child;
            }
          })}
        </Slide>
      );
    }
  };
