import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as alertActions from "../../layout/actions/alert";
import { routeActions } from "react-router-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import Management from "../components/accounts/Management.jsx";

/**
 * @class AccountsManagementContainer
 * @classdesc
 */
class AccountsManagementContainer extends Component {
  componentDidMount() {
    // we already have this check within router, but this is sensitive place,
    // so we check again
    if (!ReactionCore.hasPermission("accounts")) {
      // redirect if no permission
      this.props.routeActions.push({
        pathname: "/unauthorized",
        state: { prevPath: this.props.location.pathname }
      });
    }
  }

  render() {
    const { guests, members } = this.props;
    return (
      <Management
        guests={guests}
        members={members}
      />
    );
  }
}

AccountsManagementContainer.propTypes = {
  guests: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func
  }).isRequired,
  routeActions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch),
    routeActions: bindActionCreators(routeActions, dispatch)
  };
}

const getUsers = () => {
  const guests = [];
  const members = [];
  const shopId = ReactionCore.getShopId();
  const shopUsers = Accounts.users.find();
  shopUsers.forEach(user => {
    let member = {};
    member.userId = user._id;

    if (user.emails && user.emails.length) {
      // it is easily to duplicate emails here for further work with it
      member.emails = user.emails;
      member.email = user.emails[0].address;
    }
    // member.user = user;
    member.username = user.username;
    member.isAdmin = Roles.userIsInRole(user._id, "admin", shopId);
    member.roles = user.roles;
    member.services = user.services;

    if (Roles.userIsInRole(member.userId, "dashboard", shopId)) {
      member.role = "dashboard";
    }

    if (Roles.userIsInRole(member.userId, "admin", shopId)) {
      member.role = "admin";
    }

    if (Roles.userIsInRole(member.userId, "owner", shopId)) {
      member.role = "owner";
    } else if (Roles.userIsInRole(member.userId, "guest", shopId)) {
      member.role = "guest";
    }

    if (member.role === "guest") {
      guests.push(member);
    } else if (["dashboard", "admin", "owner"].
      some(elem => elem === member.role)) {
      members.push(member);
    }
  });

  return { guests: guests, members: members };
};

function composer(props, onData) {
  const handler = Meteor.subscribe("ShopMembers");
  if (handler.ready()) {
    const users = getUsers();
    onData(null, {
      members: users.members,
      guests: users.guests
    });
  }
}

const AccountsManagementContainerWithData = composeWithTracker(
  composer
)(AccountsManagementContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsManagementContainerWithData);
