import * as types from "../constants";
// import { RichUtils } from "draft-js";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { methods } from "meteor/sunlark:reaction-comments-core";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

export const addComment = (content, formValues, sourceId) => {
  return dispatch => {
    debugger;
    const values = Object.assign({}, formValues, {
      content,
      sourceId
    });
    // we used `settings` here only to know what message to display on `success`,
    // so, I suppose, it totally safe.
    let settings;
    if (ReactionCore.Subscriptions.Packages.ready()) {
      settings = ReactionCore.Collections.Packages.findOne({
        name: "reaction-comments-core",
        shopId: ReactionCore.getShopId()
      });
    }
    methods.addComment.call({ values }, (err, res) => {
      debugger;
      if (err) {
        dispatch(displayAlert({ message: err.reason }));
      }
      if (res) {
        let moderation = true;
        if (settings) {
          moderation = settings.settings.moderation.enabled;
        }
        const message = moderation ?
          i18next.t("comments.yourCommentIsAdded", { ns: "reaction-react" }) :
          `${i18next.t("comments.yourCommentIsAdded", { ns: "reaction-react" })
            }${i18next.t("comments.yourCommentIsAdded", { ns: "reaction-react" })}`;
        dispatch(displayAlert({ message: message }));
      }
      dispatch({ type: types.ADD_COMMENT, values });
    });

  };
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

// export const handleKeyCommand = (EditorState, command) => {
//   return dispatch => {
//     const modifiedEditorState = RichUtils.toggleBlockType(EditorState, command);
//     if (modifiedEditorState) {
//       dispatch({ type: types.HANDLE_KEY_COMMAND, EditorState: modifiedEditorState });
//       return true;
//     }
//     return false;
//   };
// };

// export const toggleBlockType = (EditorState, block) => {
//   return dispatch => {
//     const modifiedEditorState = RichUtils.toggleBlockType(EditorState, block);
//     dispatch({ type: types.TOGGLE_BLOCK_TYPE, EditorState: modifiedEditorState });
//   };
// };
//
// export const toggleInlineStyle = (EditorState, style) => {
//   return dispatch => {
//     const modifiedEditorState = RichUtils.toggleInlineStyle(EditorState, style);
//     dispatch({ type: types.TOGGLE_INLINE_STYLE, EditorState: modifiedEditorState });
//   };
// };
