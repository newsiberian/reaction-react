import * as types from "../constants";
import { EditorState } from "draft-js";

export default function CommentEditor(state = EditorState.createEmpty(), action) {
  switch (action.type) {
  case types.TOGGLE_BOLD:
  case types.UPDATE_COMMENT:
    return action.EditorState;
  default:
    return state;
  }
}
