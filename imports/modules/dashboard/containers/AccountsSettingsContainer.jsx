import React, { Component, PropTypes } from "react";
//import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as oauthServicesActions from "../actions/oauthServices";
import Settings from "../components/accounts/Settings.jsx";
import { ReactionServiceHelper } from "../../../client/helpers/utilities";

class AccountsSettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * handleClose
   * @summary setting bar close button click handler
   */
  handleClose() {
    this.props.routeActions.push("/dashboard");
  }

  render() {
    const { oauthServicesActions, routeActions, services } = this.props;
    return (
      <Settings
        handleClose={this.handleClose}
        oauthServicesActions={oauthServicesActions}
        routeActions={routeActions}
        services={services}
      />
    );
  }
};

AccountsSettingsContainer.propTypes = {
  oauthServicesActions: PropTypes.shape({
    toggleOauthService: PropTypes.func,
    submitForm: PropTypes.func
  }).isRequired,
  routeActions: PropTypes.object.isRequired,
  services: PropTypes.array.isRequired
};

function composer(props, onData) {
  const handle = Meteor.subscribe("ServiceConfiguration", Meteor.userId());
  if (handle.ready()) {
    const serviceHelper = new ReactionServiceHelper();
    const services = serviceHelper.services();
    onData(null, {
      services: services
    });
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    oauthServicesActions: bindActionCreators(oauthServicesActions, dispatch)
  };
}

const AccountsSettingsContainerWithData = composeWithTracker(
  composer
)(AccountsSettingsContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsSettingsContainerWithData);
