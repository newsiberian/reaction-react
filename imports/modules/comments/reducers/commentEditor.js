import * as types from "../constants";
import { EditorState } from "draft-js";

export default function CommentEditor(state = EditorState.createEmpty(), action) {
  switch (action.type) {
  // case types.HANDLE_KEY_COMMAND:
  // case types.TOGGLE_BLOCK_TYPE:
  // case types.TOGGLE_INLINE_STYLE:
  case types.UPDATE_COMMENT:
    return action.EditorState;
  default:
    return state;
  }
}
