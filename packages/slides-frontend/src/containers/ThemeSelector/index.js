import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Card, Image } from 'semantic-ui-react';
import { themeRequest, setTheme, setBackgroundColor } from '../redux-store/PresentationReducer/actions';
import { getThemeRequest } from '../redux-store/PresentationReducer/selectors';
import config from '../../config';

const baseUrl = `${config.assetsPath}/public/themes`;

const items = [
    {
        name: 'CERN 1',
        src: `${baseUrl}/cern1.png`,
    },
    {
        name: 'CERN 2',
        src: `${baseUrl}/cern2.png`,
    },
    {
        name: 'CERN 3',
        src: `${baseUrl}/cern3.png`,
    },
    {
        name: 'CERN 4',
        src: `${baseUrl}/cern4.png`,
    },
    {
        name: 'CERN 5',
        src: `${baseUrl}/cern5.png`,
    },
    {
        name: 'CERN 6',
        src: `${baseUrl}/cern6.png`,
    },
];

function ThemeSelector({ themeRequest, onThemeRequest, onSetTheme, onSetBackgroundColor }) {
    const handleClickTheme = name => {
        onSetTheme(name);
        if (name === 'CERN 5' || name === 'CERN 6') {
            onSetBackgroundColor('#FFFFFF'); // make background white in theme 5 and 6
        }
        else {
            onSetBackgroundColor('#0053A1');
        }
        onThemeRequest();
    };

    const Item = (name, src) => (
        <Card raised onClick={() => handleClickTheme(name)} >
            <Card.Header content={name} textAlign="center"/>
            <Image src={src} size="huge"/>
        </Card>
    );

    return (
        <Modal dimmer="blurring" open={themeRequest}>
            <Modal.Header>
                Select a Theme
            </Modal.Header>
            <Modal.Content>
                <Card.Group itemsPerRow={3}>
                    {items.map(i => Item(i.name, i.src))}
                </Card.Group>
            </Modal.Content>
        </Modal>
    )
};

ThemeSelector.propTypes = {
    themeRequest: PropTypes.bool,
    onThemeRequest: PropTypes.func,
    onSetTheme: PropTypes.func,
    onSetBackgroundColor: PropTypes.func,
};
  
export function mapDispatchToProps(dispatch) {
    return {
        onThemeRequest: () => dispatch(themeRequest(false)),
        onSetTheme: theme => dispatch(setTheme(theme)),
        onSetBackgroundColor: color => dispatch(setBackgroundColor(color)),
    };
}
  
export default connect(
    state => ({
      themeRequest: getThemeRequest(state),
    }),
    mapDispatchToProps,
  )(ThemeSelector);
  