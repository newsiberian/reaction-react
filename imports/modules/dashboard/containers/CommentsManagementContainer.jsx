import React, { PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { getAllComments } from "../../../client/helpers/comments";
import { connect } from "react-redux";
import * as commentsActions from "../../comments/actions/comments";
import Management from "../components/comments/Management.jsx";
import Loading from "../../layout/components/Loading.jsx";


const CommentsManagementContainer = props => <Management {...props} />;

CommentsManagementContainer.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  commentsActions: PropTypes.shape({
    approveComment: PropTypes.func,
    removeComment: PropTypes.func,
    toggleCommentWindow: PropTypes.func,
    updateComment: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    commentsActions: bindActionCreators(commentsActions, dispatch)
  };
}

function composer(props, onData) {
  const handler = Meteor.subscribe("AllComments");
  if (handler.ready()) {
    const comments = getAllComments();

    onData(null, { comments });
  }
}

const CommentsManagementContainerWithData = composeWithTracker(
  composer,
  Loading
)(CommentsManagementContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsManagementContainerWithData);
