import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Permissions from "../components/accounts/Permissions.jsx";
import Loading from "../../layout/components/Loading.jsx";
import * as layoutSettingsActions from "../../layout/actions/settings";
import * as permActions from "../actions/permissions";


const AccountsPermissionsContainer = props => <Permissions {...props} />;

AccountsPermissionsContainer.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  permActions: PropTypes.shape({
    togglePermission: PropTypes.func,
    togglePermissionSettings: PropTypes.func
  }).isRequired,
  selectedUser: PropTypes.shape({
    emails: PropTypes.array,
    email: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
    //role: PropTypes.string
  }).isRequired
};

function mapStateToProps(state) {
  return {
    userId: state.layout.settings.payload.userId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
    permActions: bindActionCreators(permActions, dispatch)
  };
}

const getUser = userId => {
  const user = Accounts.users.findOne({ _id: userId });
  let member = {};
  member.userId = user._id;

  if (user.emails && user.emails.length) {
    // it is easily to duplicate emails here for further work with it
    member.emails = user.emails;
    member.email = user.emails[0].address;
  }
  member.username = user.username;

  return member;
};

function composer(props, onData) {
  const handler = Meteor.subscribe("ShopMembers");
  if (handler.ready()) {
    const selectedUser = getUser(props.userId);

    onData(null, { selectedUser });
  }
}

const AccountsPermissionsContainerWithData = composeWithTracker(
  composer,
  Loading
)(AccountsPermissionsContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsPermissionsContainerWithData);

