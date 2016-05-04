import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { replace } from "react-router-redux";
import Profile from "../components/profile/Profile";
import Loading from "../../layout/components/Loading.jsx";
import * as profileActions from "../actions/profile";

// const ProfileContainer = props => <Profile {...props} />;
class ProfileContainer extends Component {
  componentWillMount() {
    // Check that the user is logged in before the component mounts
    if (!ReactionCore.hasPermission("account/profile", Meteor.userId())) {
      this.props.replace({
        pathname: "/unauthorized",
        state: { prevPath: this.props.location.pathname }
      });
    }
  }

  componentDidUpdate(prevProps) {
    // Navigate to a sign in page if the user isn't authenticated when data changes
    if (!ReactionCore.hasPermission("account/profile", Meteor.userId())) {
      this.props.replace({
        pathname: "/unauthorized",
        state: { prevPath: prevProps.location.pathname }
      });
    }
  }

  render() {
    return <Profile {...this.props} />;
  }
}

ProfileContainer.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  location: PropTypes.object.isRequired, // for permission check
  orders: PropTypes.arrayOf(PropTypes.object),
  profileActions: PropTypes.shape({
    changePassword: PropTypes.func,
    changeProfileFields: PropTypes.func
  }).isRequired,
  replace: PropTypes.func // for permission check
};

function mapStateToProps(state) {
  return {
    locale: state.layout.locale
  };
}

function mapDispatchToProps(dispatch) {
  return {
    profileActions: bindActionCreators(profileActions, dispatch),
    replace: bindActionCreators(replace, dispatch)
  };
}

function composer(props, onData) {
  const handle = Meteor.subscribe("AccountOrders", Meteor.userId());
  if (handle.ready()) {
    const orders = ReactionCore.Collections.Orders.find({
      userId: Meteor.userId()
    }, {
      sort: {
        createdAt: -1
      }// ,
      // limit: 25 // TODO why limited?
    }).fetch();

    onData(null, { orders });
  }
}

const ProfileContainerWithData = composeWithTracker(
  composer,
  Loading
)(ProfileContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainerWithData);
