import * as types from "../constants";
// import { RichUtils } from "draft-js";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { methods } from "meteor/sunlark:reaction-comments-core";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

export const addComment = (content, formValues, sourceId) => {
  return dispatch => {
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
            }${i18next.t("comments.itIsWaitingForApproval", { ns: "reaction-react" })}`;
        dispatch(displayAlert({ message: message }));
        dispatch({ type: types.ADD_COMMENT, values });
        // closing window with comment to clean Editor and form state
        dispatch({ type: types.TOGGLE_COMMENT_WINDOW });
      }
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

export const toggleCommentWindow = () => {
  return { type: types.TOGGLE_COMMENT_WINDOW };
};
