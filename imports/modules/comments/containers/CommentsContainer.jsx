import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTopComments } from "../../../client/helpers/comments";
// import { ReactionCore } from "meteor/reactioncommerce:core";
// import { Comments } from "meteor/sunlark:reaction-comments-core";
import CommentsComponent from "../components/Comments.jsx";
import * as commentsActions from "../actions/comments";

const CommentsContainer = props => <CommentsComponent {...props} />;

CommentsContainer.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  commentsActions: PropTypes.shape({
    addComment: PropTypes.func,
    approveComment: PropTypes.func,
    removeComment: PropTypes.func,
    toggleCommentWindow: PropTypes.func,
    updateComment: PropTypes.func
  }).isRequired,
  commentEditor: PropTypes.shape({
    expanded: PropTypes.bool
  }).isRequired,
  sourceId: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    sourceId: ownProps.sourceId,
    commentEditor: state.comments.commentEditor
  };
}

function mapDispatchToProps(dispatch) {
  return {
    commentsActions: bindActionCreators(commentsActions, dispatch)
  };
}

function composer(props, onData) {
  const handle = Meteor.subscribe("Comments", props.sourceId);
  if (handle.ready()) {
    const comments = getTopComments(props.sourceId);

    onData(null, { comments });
  }
}

const CommentsContainerWithData = composeWithTracker(
  composer
)(CommentsContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainerWithData);
