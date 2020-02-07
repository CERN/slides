import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Icon, Popup } from 'semantic-ui-react';
import { selectTitle } from '../redux-store/selectors';
import './index.css';

// when i load the state how can i put it in my state?
// DONT STORE IN THE CLIENT SIDE, STORE IN THE SERVER SIDE IN EOS USING FS
const Save = (stateStringified, currentTitle) => {
  // const zip = new JSZip();
  // // make a new folder using the given presentation title
  // // JSON stringify the current state,
  // // const { global: myState } = stateStringified;
  // // maybe I need to make some changes to the state that i have now
  // zip.file('presentation.JSON', `${stateStringified}`);
  // // take the assets from presentation folder,
  // const assetsFolder = zip.folder('assets');
  // // make blobs of images
  // assetsFolder.file('happy.jpg', '', { base64: true }); // base64 is not good too big text
  // // put all in the new folder
  // // zip the folder
  // // and instead of .zip --> .slides
  // // send it to the user to download
  // zip.generateAsync({ type: 'blob' }).then(blob => {
  //   saveAs(blob, `${currentTitle}.slides`);
  // });
};

function Settings({ stateStringified, currentTitle }) {
  const onClickHandler = item => {
    if (item === 'save') Save(stateStringified, currentTitle);
  };
  const Item = (item, description) => (
    <Menu.Item onClick={() => onClickHandler(item)}>
      <Popup
        inverted
        trigger={<Icon name={item} />}
        content={description}
        position="right center"
      />
    </Menu.Item>
  );
  return (
    <Menu inverted vertical fluid icon="labeled" className="settings">
      {Item('eye', 'Preview (^F)')}
      {Item('undo', 'Undo (Ctrl+Z)')}
      {Item('save', 'Save')}
      {Item('play', 'Present (Ctrl+E)')}
      {Item('setting', 'Presentation Settings')}
      {Item('paint brush', 'Style')}
      {Item('ordered list', 'Arrange Slides')}
      {Item('time', 'Revision history')}
      {Item('cloud upload', 'Import')}
      {Item('cloud download', 'Export')}
      {Item('image', 'Media')}
      {Item('share alternate', 'Share')}
      {Item('ellipsis vertical')}
      {/* have to make a popup specially for this one, https://react.semantic-ui.com/modules/popup/#usage-nested */}
      <Menu.Item className="lastitem">
        {/* same for this one */}
        <Icon name="content" />
      </Menu.Item>
    </Menu>
  );
}

Settings.propTypes = {
  stateStringified: PropTypes.string,
  currentTitle: PropTypes.string,
};

// export function mapDispatchToProps(dispatch) {
//   return {
//     onSetTheme: theme => dispatch(setTheme(theme)),
//     onSetTitle: title => dispatch(setTitle(title)),
//     onSetDescription: description => dispatch(setDescription(description)),
//   };
// }

// export default connect(
//   state => ({
//     currentTheme: selectTheme(state),
//     currentTitle: selectTitle(state),
//     currentDescription: selectDescription(state),
//   }),
//   mapDispatchToProps,
// )(Settings);
export default connect(
  state => ({
    stateStringified: JSON.stringify(state),
    currentTitle: selectTitle(state),
  }),
  null,
)(Settings);
