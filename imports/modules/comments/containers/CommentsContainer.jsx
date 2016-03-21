import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import { Comments } from "meteor/sunlark:reaction-comments-core";
import CommentsComponent from "../components/Comments.jsx";
import * as commentsActions from "../actions/comments";

const CommentsContainer = props => <CommentsComponent {...props} />;

CommentsContainer.propTypes = {
  commentsActions: PropTypes.shape({
    addComment: PropTypes.func,
    updateComment: PropTypes.func
  })
};

function mapStateToProps(/* state */) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    commentsActions: bindActionCreators(commentsActions, dispatch)
  };
}

function composer(props, onData) {
  const handle = Meteor.subscribe("Comments", props.sourceId);
  if (handle.ready()) {
    const comments = Comments.find({ sourceId: props.sourceId }).fetch();

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
