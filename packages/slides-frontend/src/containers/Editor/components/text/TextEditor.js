import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Button, Popup } from 'semantic-ui-react';
import {
  editData,
  setEditMode,
  toggleFocus,
} from '../../../redux-store/DeckReducer/actions';
import { editorConfig } from './editorConfig';
import './TextEditor.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function SaveButton({ saveHandler }) {
  // add Custom Save button in the toolbar of draft.js
  return (
    <Popup
      trigger={
        <Button compact basic size="small" icon="save" color="black" onClick={saveHandler} />
      }
      mouseEnterDelay={300} // ?! not very important just an effect to delay the showing of the popup
      content="Save Text!"
      basic
    />
  );
}
SaveButton.propTypes = {
  saveHandler: PropTypes.func,
};

const TextEditor = ({
  initialData,
  ID,
  onEditData,
  onSetEditMode,
  onToggleFocus,
}) => {
  const saveHandler = () => {
    const myhtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // save in redux state
    onEditData(ID, myhtml);
    // turn edit mode off
    onSetEditMode(ID, false);
    // focus off
    // onToggleFocus(ID, false);
  };

  const handleEditorChange = newState => {
    setEditorState(newState);
    // const myhtml = draftToHtml(convertToRaw(newState.getCurrentContent()));
    // onChange(myhtml);
  };
  const contentBlock = htmlToDraft(initialData);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(contentBlock.contentBlocks),
    ),
  );

  // add support for Ctrl+s or Cmd+s for saving the text
  // docs: https://stackoverflow.com/questions/42311815/how-to-create-custom-key-bindings-in-draft-js
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbar={editorConfig}
        placeholder="start typing - don’t forget to save"
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        toolbarCustomButtons={[<SaveButton saveHandler={saveHandler} />]}
        onEditorStateChange={handleEditorChange}
      />
    </div>
  );
};

TextEditor.propTypes = {
  initialData: PropTypes.string,
  ID: PropTypes.string,
  onEditData: PropTypes.func,
  onSetEditMode: PropTypes.func,
  onToggleFocus: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onEditData: (id, data) => dispatch(editData(id, data)),
    onSetEditMode: (id, edit) => dispatch(setEditMode(id, edit)),
    onToggleFocus: (id, focus) => dispatch(toggleFocus(id, focus)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(TextEditor);
