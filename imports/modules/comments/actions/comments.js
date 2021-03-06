import * as types from "../constants";
import { methods } from "meteor/sunlark:reaction-comments-core";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

export const addComment = (content, formValues, sourceId, parentId) => {
  return dispatch => {
    const values = Object.assign({}, formValues, {
      content,
      sourceId,
      parentId
    });

    methods.addComment.call({ values }, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: err.message }));
      }
      if (res) {
        // if comment was approval, then we receive result within `res.res`. If
        // it is not - we should display a message that comment should be reviewed
        // soon
        const message = (typeof res.res === "number" || Array.isArray(res.res)) ?
          i18next.t("comments.yourCommentIsAdded", { ns: "reaction-react" }) :
          `${i18next.t("comments.yourCommentIsAdded", { ns: "reaction-react" })
            }${i18next.t("comments.itIsWaitingForApproval", { ns: "reaction-react" })}`;
        dispatch(displayAlert({ message: message }));
        dispatch({ type: types.ADD_COMMENT, values });
        // closing window with comment to clean Editor and form state only if
        // this is not reply
        !parentId && dispatch({ type: types.TOGGLE_COMMENT_WINDOW });
      }
    });
  };
};

export const updateComment = (commentId, content) => {
  return dispatch => {
    methods.updateComment.call({ _id: commentId, content }, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: err.message }));
      }
      if (res) {
        dispatch(displayAlert({ message:
          i18next.t("comments.commentUpdatedSuccessfully", { ns: "reaction-react" }) }));
        dispatch({ type: types.UPDATE_COMMENT, commentId });
      }
    });
  };
};

export const approveComment = _id => {
  return dispatch => {
    methods.approveComments.call({ ids: [_id] }, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: err.message }));
      }
      if (res) {
        dispatch(displayAlert({ message:
          i18next.t("comments.commentApprovedSuccessfully", { ns: "reaction-react" }) }));
        dispatch({ type: types.APPROVE_COMMENT, commentId: _id });
      }
    });
  };
};

export const removeComment = _id => {
  return dispatch => {
    if (confirm(i18next.t("comments.deleteThisComment", { ns: "reaction-react" }))) {
      methods.removeComments.call({ ids: [_id] }, (err, res) => {
        if (err) {
          dispatch(displayAlert({ message: err.message }));
        }
        if (res) {
          dispatch(displayAlert({
            message: i18next.t("comments.commentDeletedSuccessfully", { ns: "reaction-react" })
          }));
          dispatch({ type: types.REMOVE_COMMENT, commentId: _id });
        }
      });
    }
  };
};

export const toggleCommentWindow = () => {
  return { type: types.TOGGLE_COMMENT_WINDOW };
};
