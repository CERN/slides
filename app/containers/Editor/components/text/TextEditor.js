import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Button } from 'semantic-ui-react';
import {
  editData,
  setEditMode,
  toggleFocus,
} from '../../../redux-store/DeckReducer/actions';
import { editorConfig } from './editorConfig';
import './TextEditor.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

  return (
    <div className="text-editor">
      <Editor
        editorState={editorState}
        toolbar={editorConfig}
        placeholder="start typing..."
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleEditorChange}
      />
      <Button positive floated="right" onClick={saveHandler}>
        Save
      </Button>
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
