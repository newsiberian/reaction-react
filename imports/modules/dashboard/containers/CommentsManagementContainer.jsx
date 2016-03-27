import React, { PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CommentsManagement from "../components/comments/CommentsManagement.jsx";
import Loading from "../../layout/components/Loading.jsx";


const CommentsManagementContainer = props => <CommentsManagement {...props} />;

CommentsManagementContainer.propTypes = {

};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    permActions: bindActionCreators(permActions, dispatch)
  };
}

function composer(props, onData) {
  const handler = Meteor.subscribe("AllComments");
  if (handler.ready()) {
    const comments = getUser(props.userId);

    onData(null, { selectedUser });
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
