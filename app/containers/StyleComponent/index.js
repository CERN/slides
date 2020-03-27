// it will be listening for stylerequest and will open a modal to select a background color
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { setStyleRequest } from '../redux-store/PresentationReducer/actions';
import { getStyleRequest } from '../redux-store/PresentationReducer/selectors';
import './index.css';

function StyleComponent({ styleRequest, onStyleRequest }) {
  const [backgroundColor, setBackgroundSolor] = useState('#0053A1');
  const handleChangeColor = color => {
    setBackgroundSolor(color.hex);
  };

  const sendStyleRequest = () => {
    console.log('do things', backgroundColor);
    onStyleRequest();
  };
  const onCancelHandler = () => {
    console.log('cancelled');
    onStyleRequest();
  };

  return (
    <Modal dimmer="blurring" open={styleRequest} size="mini">
      <Modal.Header>Choose a background Colour</Modal.Header>
      <Modal.Content>
        <SketchPicker
          width={300}
          color={backgroundColor}
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
};

export function mapDispatchToProps(dispatch) {
  return {
    onStyleRequest: () => dispatch(setStyleRequest(false)),
  };
}

export default connect(
  state => ({
    styleRequest: getStyleRequest(state),
  }),
  mapDispatchToProps,
)(StyleComponent);
