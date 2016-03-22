import * as types from "../constants";
import { RichUtils } from "draft-js";

export const addComment = () => {
  return { type: types.ADD_COMMENT };
};

export const updateComment = EditorState => {
  return { type: types.UPDATE_COMMENT, EditorState };
};

export const removeComment = () => {
  return { type: types.REMOVE_COMMENT };
};

export const approveComment = () => {
  return { type: types.APPROVE_COMMENT };
};

export const handleKeyCommand = (EditorState, command) => {
  return dispatch => {
    const modifiedEditorState = RichUtils.toggleBlockType(EditorState, command);
    if (modifiedEditorState) {
      dispatch({ type: types.HANDLE_KEY_COMMAND, EditorState: modifiedEditorState });
      return true;
    }
    return false;
  };
};

export const toggleBlockType = (EditorState, block) => {
  return dispatch => {
    const modifiedEditorState = RichUtils.toggleBlockType(EditorState, block);
    dispatch({ type: types.TOGGLE_BLOCK_TYPE, EditorState: modifiedEditorState });
  };
};

export const toggleInlineStyle = (EditorState, style) => {
  return dispatch => {
    const modifiedEditorState = RichUtils.toggleInlineStyle(EditorState, style);
    dispatch({ type: types.TOGGLE_INLINE_STYLE, EditorState: modifiedEditorState });
  };
};
