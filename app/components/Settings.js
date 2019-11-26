import React from 'react';
import { Menu, Icon, Popup } from 'semantic-ui-react';
import './Settings.css';

const Item = (item, description) => (
  <Menu.Item>
    <Popup
      inverted
      trigger={<Icon name={item} />}
      content={description}
      position="right center"
    />
  </Menu.Item>
);

function Settings() {
  return (
    <Menu inverted vertical fluid icon="labeled" className="settings">
      {Item('eye', 'Preview (^F)')}
      {Item('undo', 'Undo (Ctrl+Z)')}
      {Item('check', 'Latest Changes Are Saved')}
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

export default Settings;
