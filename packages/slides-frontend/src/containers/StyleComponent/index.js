// it will be listening for styleRequest and will open a modal to select a background color
import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {SketchPicker} from 'react-color';
import {Modal, Button, Icon} from 'semantic-ui-react';
import {setStyleRequest, setBackgroundColor} from '../redux-store/PresentationReducer/actions';
import {getStyleRequest, getBackgroundColor} from '../redux-store/PresentationReducer/selectors';

const allColors = [
  {color: '#0053A1', title: 'CERN'}, // added CERN's default official color
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];

function StyleComponent({styleRequest, onStyleRequest, onColorChange, style}) {
  const [backgroundColor, _setBackgroundColor] = useState(style);
  const handleChangeColor = color => {
    _setBackgroundColor(color.hex);
  };

  const sendStyleRequest = () => {
    onColorChange(backgroundColor);
    onStyleRequest();
  };
  const onCancelHandler = () => {
    onStyleRequest();
  };
  // ask if this with the colored letters is good or not
  return (
    <Modal dimmer="blurring" open={styleRequest} size="mini">
      <Modal.Header>
        <font color={backgroundColor}>Choose a background Colour</font>
      </Modal.Header>
      <Modal.Content>
        <SketchPicker
          width={300}
          color={backgroundColor}
          presetColors={allColors}
          onChangeComplete={handleChangeColor}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onCancelHandler}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={sendStyleRequest}>
          <Icon name="checkmark" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

StyleComponent.propTypes = {
  styleRequest: PropTypes.bool,
  onStyleRequest: PropTypes.func,
  onColorChange: PropTypes.func,
  style: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onStyleRequest: () => dispatch(setStyleRequest(false)),
    onColorChange: color => dispatch(setBackgroundColor(color)),
  };
}

export default connect(
  state => ({
    styleRequest: getStyleRequest(state),
    style: getBackgroundColor(state),
  }),
  mapDispatchToProps
)(StyleComponent);
