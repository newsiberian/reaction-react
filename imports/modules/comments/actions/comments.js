import * as types from "../constants";
import { RichUtils } from "draft-js";

export const addComment = () => {
  return { type: types.ADD_COMMENT };
};

export const updateComment = EditorState => {
  return { type: types.UPDATE_COMMENT, EditorState };
};

export const toggleBold = EditorState => {
  return dispatch => {
    const modifiedEditorState = RichUtils.toggleInlineStyle(EditorState, "BOLD");
    dispatch({ type: types.TOGGLE_BOLD, EditorState: modifiedEditorState });
  };
};

export const removeComment = () => {
  return { type: types.REMOVE_COMMENT };
};

export const approveComment = () => {
  return { type: types.APPROVE_COMMENT };
};
